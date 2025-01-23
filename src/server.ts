import dotenv from "dotenv";
import MySql from "./models/mySql";
import app from "./app";
import http from "http";

dotenv.config();

const mysqlInstance = new MySql();
const server = http.createServer(app);

const startServer = async () => {
	try {
		await mysqlInstance.connection(); // Establish the MySQL connection
		const PORT = process.env.PORT ?? 5005;

		server.listen(PORT, () => {
			console.info(`Server is running on port => ${PORT}`);
			console.info(`Admin project on http://localhost:${PORT}/ \n`);
		});
	} catch (error) {
		console.log("An error occurred while starting the server =>", error);
	}
};

startServer();
