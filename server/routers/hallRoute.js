const express = require("express");
const { createHall, getHall, deleteHall, updateHall } = require("../controller/hallController");
const router = express.Router();


router.route("/").get(getHall).post(createHall);

router.route("/:id").put(updateHall).delete(deleteHall);


module.exports = router