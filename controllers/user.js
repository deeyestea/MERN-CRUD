const User = require('../models/user');

const handleGetAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    console.log("User")
    return res.json(allUsers);
}

const handleGetUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    return res.json(user);
}

const handleUpdateUserById = async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.gender || !body.email) {
        return res.status(400).json({ message: "First Name, Gender and Email are mandatory fields..." })
    }
    await User.findByIdAndUpdate(req.params.id, body, { new: true });
    return res.status(201).json({ message: "User Details Updated Successfull..." });
}

const handleDeleteById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "User Deleted Successfull..." });
}

const handleCreateNewUser = async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.gender || !body.email) {
        return res.status(400).json({ message: "First Name, Gender and Email are mandatory fields..." })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    return res.status(201).json({ message: 'User Created Successfull', id: result.id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteById,
    handleCreateNewUser
}