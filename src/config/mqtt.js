const mqtt = require("mqtt");
const SensorReading = require("../models/sensorReading");

const client = mqtt.connect(process.env.MQTT_BROKER);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("iot/sensor/+/temperature");
});

client.on("message", async (topic, message) => {
  try {
    const deviceId = topic.split("/")[2];
    const temperature = parseFloat(message.toString());

    if (isNaN(temperature)) return;

    await SensorReading.create({
      deviceId,
      temperature,
      timestamp: Date.now()
    });

    console.log(`MQTT saved: ${deviceId} → ${temperature}`);
  } catch (err) {
    console.error("MQTT error", err);
  }
});
