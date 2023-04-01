const express = require('express');
const mongoose = require("mongoose");
const User = require("./models/user");
//const cors = require('cors')
const port = 4001; // Change this to the desired port number

const app = express();
app.use(express.json());
//app.use(cors())

//Connection to database
const URL = `mongodb+srv://root:root@tutorial7.kixswho.mongodb.net/?retryWrites=true&w=majority`;
    try {
    mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
       console.log("Database connected successfully")
    } catch (error) {
        console.log("Error connecting the database. Error : " + error)
    }

//get all user
app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add one user in database
app.post('/add', async (req, res) => {
  const user = new User({
    email: req.body.email,
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    phone: req.body.phone
  });

  try {
    const newUser = await user.save();
    res.send({ code: 201, message: "User Added" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update specific user by ID
app.put('/:id', getUser, async (req, res) => {
  if (req.body.firstname != null) {
    res.user.first_name = req.body.firstname;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.lastname != null) {
    res.user.last_name = req.body.lastname;
  }
  if (req.body.phone != null) {
    res.user.phone = req.body.phone;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get one user based on id
app.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

//Delete user by id
app.delete('/delete/:id', getUser, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});