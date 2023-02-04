const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
require("dotenv").config();

const isAuthenticated = require("./middlewares/auth");
const userRoute = require("./routes/userRoute");
const isVerifyRoute = require("./routes/isVerify");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const commentRoute = require("./routes/commentRoute");
const searchRoute = require("./routes/serachRoute");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/verifyUser", isAuthenticated, isVerifyRoute);
app.use("/api/v1/question", isAuthenticated, questionRoute);
app.use("/api/v1/answer", isAuthenticated, answerRoute);
app.use("/api/v1/comment", isAuthenticated, commentRoute);
app.use("/api/v1/search", isAuthenticated, searchRoute);

app.use("/", (req, res) => {
  return res.send("welcome to the application");
});

connectDb();
app.listen(PORT, () => {
  console.log("server is running port 4000");
});
