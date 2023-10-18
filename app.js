require("dotenv").config();
const dbConnection = require("./config/dbConfig");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const authMiddleware = require("./Middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes middleware file
const userRoutes = require("./routes/userRoutes");
const questionsRoutes = require("./routes/questionRoutes");

// routes middleware
app.use("/api/users",authMiddleware, userRoutes);
app.use("/api/questions", authMiddleware, questionsRoutes);

//answer middleware file
const answerRouter = require("./routes/anserRoutes");

//routes answer midlleware file
app.use("/api/answer", authMiddleware, answerRouter);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connected");
    console.log(`Listenimg at http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
