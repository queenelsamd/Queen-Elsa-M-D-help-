const express = require("express");
const app = express();
const __path = process.cwd(); // use const for consistency
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const code = require("./pair"); // cleaner import

// Increase max listeners only if necessary
// require("events").EventEmitter.defaultMaxListeners = 500; // Uncomment if needed

app.use(bodyParser.json()); // Should come before any routes
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/code", code); // This serves the 'pair' module at /code route

// Serve the HTML file only at the root URL
app.use("/", (req, res, next) => {
  res.sendFile(__path + "/pair.html");
});

app.listen(PORT, () => {
  console.log(`⏩ Server running on http://localhost:${PORT}`);
});

module.exports = app;
