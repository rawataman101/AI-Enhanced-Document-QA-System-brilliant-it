const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const homeRouter = require("./routes/home.route");
const uploadRouter = require("./routes/upload.route");
const questionRouter = require("./routes/question.route");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "…/.env") });
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/", homeRouter);
app.use("/", uploadRouter);
app.use("/", questionRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
