const express = require('express');
const fs = require('fs');
const userRouter = require('./routes/user');
const { connectMongoDb } = require('./connection');

const app = express();
const PORT = 8000;

connectMongoDb('mongodb+srv://desai:desai1234@cluster1.mkc6h5a.mongodb.net/mern-practice').then(() => console.log("MongoDB Connected...")).catch((err) => console.log("Mongo Error: ", err))

app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));