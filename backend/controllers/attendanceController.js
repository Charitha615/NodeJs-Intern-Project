const Attendance = require("../models/Attendance");
const User = require("../models/user");

// CREATE ATTENDANCE
const createAttendance = async (req, res) => {
    try {
        const {
            user,
            date,
            checkIn,
            checkOut,
            status,
            note
        } = req.body;

        // Check required fields
        if (!user || !date || !status) {
            return res.status(400).json({
                message: "User, date and status are required"
            });
        }

        // Check if user exists
        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Create attendance
        const attendance = await Attendance.create({
            user,
            date,
            checkIn: checkIn || null,
            checkOut: checkOut || null,
            status,
            note: note || ""
        });

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GET ALL ATTENDANCE
const getAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.find()
            .populate("user", "name email")
            .sort({ date: -1 });

        res.status(200).json({
            message: "Attendance retrieved successfully",
            attendance
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GET SINGLE ATTENDANCE
const getSingleAttendance = async (req, res) => {
    try {

        const { id } = req.params;

        const attendance = await Attendance.findById(id)
            .populate("user", "name email");

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        res.status(200).json({
            message: "Attendance retrieved successfully",
            attendance
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// UPDATE ATTENDANCE
const updateAttendance = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            user,
            date,
            checkIn,
            checkOut,
            status,
            note
        } = req.body;

        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        attendance.user = user;
        attendance.date = date;
        attendance.checkIn = checkIn || null;
        attendance.checkOut = checkOut || null;
        attendance.status = status;
        attendance.note = note || "";

        await attendance.save();

        res.status(200).json({
            message: "Attendance updated successfully",
            attendance
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// DELETE ATTENDANCE
const deleteAttendance = async (req, res) => {
    try {

        const { id } = req.params;

        const attendance =
            await Attendance.findByIdAndDelete(id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        res.status(200).json({
            message: "Attendance deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


module.exports = {
    createAttendance,
    getAttendance,
    getSingleAttendance,
    updateAttendance,
    deleteAttendance
};