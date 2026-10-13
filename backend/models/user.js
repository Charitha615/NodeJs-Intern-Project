const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true
    },

    age: {
    type: Number,
    required: [true, "Age is required"],
    min: [13, "Age must be at least 13"],
    max: [120, "Age cannot exceed 120"]
}
    
});

module.exports = mongoose.model("User", userSchema);