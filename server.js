const express = require("express");
const expressSanitizer = require("express-sanitizer");
const path = require("path");

// const { task } = require("./workers/workers");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Mount express-sanitizer middleware here
app.use(expressSanitizer());

app.post("/", function (req, res, next) {
  // replace an HTTP posted body property with the sanitized string
  const sanitizedString = req.sanitize(req.body.propertyToSanitize);
  // send the response -- res.body.sanitized = " world"
  res.send({ sanitized: sanitizedString });
});

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/timeline", require("./routes/api/timeline"));
app.use("/api/metrics", require("./routes/api/metrics"));
app.use("/api/notes", require("./routes/api/notes"));
app.use("/api/settings", require("./routes/api/settings"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


