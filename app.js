const express = require("express");
const sensorRoutes = require("./src/routes/sensorRoutes");

const app = express();

app.use(express.json());
app.use("/api/sensor", sensorRoutes);

module.exports = app;
