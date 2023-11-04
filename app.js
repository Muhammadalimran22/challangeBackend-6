require("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use("/api/v1", require("./routes/postImage.routes"));

app.get("/", (req, res) => {
  return res.json({
    status: true,
    message: "welcome to deployment with railway.app",
    err: null,
    data: null,
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
    data: null,
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    data: err.message,
  });
});

app.listen(PORT, () => console.log("server hidup", PORT));
