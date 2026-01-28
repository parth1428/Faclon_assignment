const SensorReading = require("../models/sensorReading");

exports.ingestSensorData = async (req, res) => {
  const { deviceId, temperature, timestamp } = req.body;

  if (!deviceId || temperature === undefined) {
    return res.status(400).json({
      error: "deviceId and temperature are required"
    });
  }

  const reading = await SensorReading.create({
    deviceId,
    temperature,
    timestamp: timestamp || Date.now()
  });

  res.status(201).json(reading);
};

exports.getLatestReading = async (req, res) => {
  const { deviceId } = req.params;

  const latest = await SensorReading
    .findOne({ deviceId })
    .sort({ timestamp: -1 });

  if (!latest) {
    return res.status(404).json({ error: "No data found" });
  }

  res.json(latest);
};
