import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import livereload from "livereload";
import chokidar from "chokidar";
import connectLivereload from "connect-livereload";
import bodyParser from "body-parser";
import { MORGAN_FORMAT } from "./libs/config";
import contactRouter from "./routes/contact-router";

// CREATE A SESSION:

// EXPRESS HAS FOUR MAIN STRUCTURES:
// 1) ENTERANCE:
const app = express();

// Middleware pattern:
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));

app.use(connectLivereload());

app.get("/store/process/signup", (req, res) => {
	const signupUrl = `${process.env.FRONTEND_URL}/store/process/signup`;
	res.redirect(signupUrl);
});

const watcher = chokidar.watch([
	path.join(__dirname, "views"),
	path.join(__dirname, "public"),
]);

watcher.on("change", (filePath) => {
	liveReloadServer.refresh("/");
});

// 3) VIEWS:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// 4) ROUTERS:
app.use("/", contactRouter);

export default app;
