
const express = require("express");
const tripsRoute = require("./routes/trips");
require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/trips", tripsRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
