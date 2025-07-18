const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;

// База данных "датчиков"
const sensors = {
    '1': { location: 'Living Room', minTemp: 18, maxTemp: 25 },
    '2': { location: 'Bedroom', minTemp: 16, maxTemp: 22 },
    '3': { location: 'Kitchen', minTemp: 15, maxTemp: 28 },
    '0': { location: 'Unknown', minTemp: 10, maxTemp: 30 }
};

// Генерация случайной температуры в заданном диапазоне
function getRandomTemp(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}

// Определение location по sensorID
function getLocationBySensorId(sensorId) {
    switch (sensorId) {
        case '1': return 'Living Room';
        case '2': return 'Bedroom';
        case '3': return 'Kitchen';
        default: return 'Unknown';
    }
}

// Определение sensorID по location
function getSensorIdByLocation(location) {
    switch (location) {
        case 'Living Room': return '1';
        case 'Bedroom': return '2';
        case 'Kitchen': return '3';
        default: return '0';
    }
}

// Эндпоинт для получения температуры
app.get('/temperature', (req, res) => {
    let { location, sensorId } = req.query;

    // Если location не указан, определяем по sensorId
    if (!location && sensorId) {
        location = getLocationBySensorId(sensorId);
    }

    // Если sensorId не указан, определяем по location
    if (!sensorId && location) {
        sensorId = getSensorIdByLocation(location);
    }

    // Если оба параметра отсутствуют - используем дефолтные значения
    if (!location && !sensorId) {
        sensorId = '0';
        location = 'Unknown';
    }

    // Получаем настройки датчика или используем дефолтные
    const sensor = sensors[sensorId] || sensors['0'];

    // Генерируем случайную температуру
    const temperature = getRandomTemp(sensor.minTemp, sensor.maxTemp);

    res.json({
        sensorId,
        location: sensor.location,
        temperature: `${temperature}°C`,
        timestamp: new Date().toISOString()
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Temperature API running on port ${PORT}`);
});