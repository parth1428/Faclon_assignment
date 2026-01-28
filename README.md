	IoT Sensor Backend
	==================

	Overview
	--------

	Simple Express + MongoDB backend storing sensor readings and ingesting MQTT messages.

	Prerequisites
	-------------

	- Node.js >= 18
	- A running MongoDB instance (connection string in `MONGO_URI`)
	- (Optional) An MQTT broker (URL in `MQTT_BROKER`) if you want MQTT ingestion

	Setup
	-----

	1. Clone the repo and install dependencies:

	```bash
	npm install
	```

	2. Create a `.env` file in the project root with the following variables:

	```
	MONGO_URI=mongodb://username:password@host:port/dbname
	MQTT_BROKER=mqtt://broker-host:1883
	PORT=5000
	```

	Running
	-------

	- Development (auto-restarts with nodemon):

	```bash
	npm run dev
	```

	- Production:

	```bash
	npm start
	```

	API Endpoints (Postman / cURL examples)
	--------------------------------------

	Base URL: `http://localhost:5000/api/sensor`

	1) Ingest a sensor reading (POST)

	- URL: `/ingest`
	- Method: `POST`
	- Body (JSON):

	```json
	{
		"deviceId": "device-123",
		"temperature": 23.4,
		"timestamp": 1670000000000
	}
	```

	Postman example: create a POST request to `http://localhost:5000/api/sensor/ingest` with `Content-Type: application/json` and the JSON body above.

	cURL example:

	```bash
	curl -X POST http://localhost:5000/api/sensor/ingest \
		-H "Content-Type: application/json" \
		-d '{"deviceId":"device-123","temperature":23.4}'
	```

	2) Get latest reading for a device (GET)

	- URL: `/:deviceId/latest`
	- Method: `GET`

	Example (Postman): `GET http://localhost:5000/api/sensor/device-123/latest`

	cURL example:

	```bash
	curl http://localhost:5000/api/sensor/device-123/latest
	```

	MQTT Ingestion
	--------------

	The server subscribes to `iot/sensor/+/temperature`. Example topic for device `device-123`:

	```
	iot/sensor/device-123/temperature
	```

	Payload should be the numeric temperature as plain text (e.g., `23.4`). When received, the server saves a document in MongoDB with `deviceId`, `temperature`, and `timestamp`.

	Notes & Troubleshooting
	-----------------------

	- If you see "Cannot find module ... src/server.js" errors, ensure `package.json` scripts point to the correct entry (`server.js` at project root) or run `node server.js` directly.
	- Ensure `MONGO_URI` is reachable and properly formatted. The server will exit on DB connection failure.

	Contact
	-------

	For questions, open an issue or contact the maintainer.
