const express = require("express");

const {
    createAttendance,
    getAttendance,
    getSingleAttendance,
    updateAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");

const router = express.Router();

// CREATE attendance
router.post("/", createAttendance);

// GET all attendance
router.get("/", getAttendance);

// GET single attendance
router.get("/:id", getSingleAttendance);

// UPDATE attendance
router.put("/:id", updateAttendance);

// DELETE attendance
router.delete("/:id", deleteAttendance);

module.exports = router;