require("dotenv").config();
const express = require("express");
const Sentry = require("@sentry/node");
const morgan = require("morgan");
const app = express();
const { PORT = 3000, SENTRY_DSN, ENV } = process.env;

app.use(morgan("dev"));
app.use(express.json());

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  environment: ENV,
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.get("/", (req, res) => {
  console.log(name);
  return res.json({
    status: true,
    message: "welcome to deployment with railway.app",
    err: null,
    data: null,
  });
});

app.use("/api/v1", require("./routes/postImage.routes"));

app.use(Sentry.Handlers.errorHandler());
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
