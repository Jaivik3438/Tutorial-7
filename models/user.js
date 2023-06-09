const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({ 
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: Number, required: true }
    
});

module.exports = mongoose.model("User", userSchema);