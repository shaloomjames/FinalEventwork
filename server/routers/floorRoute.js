const express = require("express");
// const { getFloor, createFloor, updateFloor, deleteFloor } = require("../controller/floorController");
const { createFloor, getFloor, deleteFloor, updateFloor } = require("../controller/floorController");
const router = express.Router();

router.route("/").post(createFloor).get(getFloor);

router.route("/:id").put(updateFloor).delete(deleteFloor);


module.exports = router;