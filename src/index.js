const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const router = require("./routes");

const { DATABASE_CONFIG, SERVER_CONFIG } = require("./config");

DATABASE_CONFIG.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: SERVER_CONFIG.FRONTEND_URL,
  })
);

app.use("/api", router);
app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
});
