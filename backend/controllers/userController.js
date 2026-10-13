const User = require("../models/user");


// CREATE USER
const createUser = async (req, res) => {
    try {
        const { name, email, age, phone } = req.body;

        
    // 1. CHECK REQUIRED FIELDS
        if (!name || !email || age === undefined || !phone) {
            return res.status(400).json({
                message: "Name, email, age and phone are required"
            });
        }


        
    // 2. NAME VALIDATION
        const cleanName = name.trim();

        if (cleanName.length < 2) {
            return res.status(400).json({
                message: "Name must be at least 2 characters"
            });
        }

        if (cleanName.length > 50) {
            return res.status(400).json({
                message: "Name cannot exceed 50 characters"
            });
        }

        // Only letters and spaces
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(cleanName)) {
            return res.status(400).json({
                message: "Name can only contain letters and spaces"
            });
        }


        
        // 3. EMAIL VALIDATION
        const cleanEmail = email.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }


        
    // 4. CHECK DUPLICATE EMAIL
        const existingUser = await User.findOne({
            email: cleanEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

       
    // 6. CREATE USER
       const user = await User.create({
            name: cleanName,
            email: cleanEmail,
            age: age,
            phone: phone
        });


        
    // 7. SUCCESS RESPONSE
        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {

        
    // 8. SERVER ERROR
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// GET ALL USERS
const getUsers = async (req, res) => {
    try {

        const users = await User.find();

        res.status(200).json({
            message: "Users retrieved successfully",
            users
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GET ONE USER
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE USER
const updateUser = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email, age, phone } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = name;
        user.email = email;
        user.age = age;
        user.phone = phone;

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// DELETE USER
const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};