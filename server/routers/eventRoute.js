const express = require("express");
const { getEvents, deleteEvent } = require("../controller/eventController");
const router = express.Router();

router.route("/").get(getEvents).post();

router.route("/:id").put().delete(deleteEvent);

module.exports = router