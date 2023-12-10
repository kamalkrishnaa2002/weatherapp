import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/weather', async (req, res) => {
    try {
        const apiKey = 'a5c40d4b1b7828660e2e6f5a1038f428';
        const cities = req.query.cities.split(',');

        const weatherData = [];
        for (const city of cities) {
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city.trim()}`);
            const data = await response.json();
            weatherData.push({ city, data });
        }

        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the weather data.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
