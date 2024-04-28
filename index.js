const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

mongoose
    .connect('mongodb://127.0.0.1:27017/mern-practice')
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error: ", err))

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }))

//Routes
app.get('/api/users', async (req, res) => {
    const allUsers = await User.find({});
    return res.json(allUsers);
})

app.route('/api/user/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        return res.json(user);
    })
    .put(async (req, res) => {
        const body = req.body;
        if (!body || !body.first_name || !body.gender || !body.email) {
            return res.status(400).json({ message: "First Name, Gender and Email are mandatory fields..." })
        }
        await User.findByIdAndUpdate(req.params.id, body, { new: true });
        return res.status(201).json({ message: "User Details Updated Successfull..." });
    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "User Deleted Successfull..." });
    })

app.post('/api/user', async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.gender || !body.email) {
        return res.status(400).json({ message: "First Name, Gender and Email are mandatory fields..." })
    }
    users.push({ ...body, id: users.length + 1 })

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })

    console.log("Result: ", result)

    return res.status(201).json({ message: 'User Created Successfull' });
    /*  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
         return res.status(201).json({ status: 'Success', id: users.length })
     }) */
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));