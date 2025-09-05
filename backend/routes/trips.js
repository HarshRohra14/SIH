
const express = require("express");
const {
  startTrip,
  updateTrip,
  endTrip,
  getTrips,
  getTripById,
} = require("../controllers/tripsController");

const router = express.Router();

router.post("/start", startTrip);
router.post("/update", updateTrip);
router.post("/end", endTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);

module.exports = router;
