import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(_dirname));

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;
    const units = req.query.units;
    const apiKey = process.env.API_KEY;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "City not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
