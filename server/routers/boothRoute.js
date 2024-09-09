const express = require("express");
const { createBooth, getBooth, deleteBooth, updateBooth } = require("../controller/boothController");
const router = express.Router();

router.route("/").post(createBooth).get(getBooth);

router.route("/:id").delete(deleteBooth).put(updateBooth)

module.exports = router