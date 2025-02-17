const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
       type: String,
       required: [true, "First name is required"],
       minlength: [5, "First name shouldn'be less than 5 character"],
       lowercase: true,
       trim: true,
       maxlength: [20, "First name shouldn't be exceed by 20 character"]
    },

    lastName:{
        type: String,
        minlength: [5, "First name shouldn'be less than 5 character"],
        lowercase: true,
        trim: true,
        maxlength: [20, "First name shouldn't be exceed by 20 character"]
     },

    mobileNumber:{
        type: String,
        trim: true,
        require: [true, "Mobile number can't be empty"],
        unique: [true, "Mobile number already exist"],
        minlength: [10, "Please enter a valid phone number"],
        maxlength: [13, "Please enter a valid phone number"]
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        unique: [true, "Email already exist"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        required: [true, "Email address can not be empty"], 
    },
    password:{
        type: String,
        require: [true, "Password can't be empty"],
        minlength: [8, "Password should be more than 8 character"]
    },
    role:{
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    address:{
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Please Enter complete address"]
    } 
},{timestamps: true, versionKey: false})

userSchema.pre('save', async function (){
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    
})

const user = mongoose.model("User", userSchema);


module.exports = user;