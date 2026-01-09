import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from "../utils/nodemailer.js";


export const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    // check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      throw new ApiError(400, "User with this email already exists");
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ name, email, password: hashedPassword });


    //send welcome email

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Welcome to Expense Tracker',
      text: `Hello ${user.name},\n\nWelcome to Expense Tracker! We're excited to have you on board.\n\nBest regards,\nExpense Tracker Team`
    };

    await transporter.sendMail(mailOptions);



    return res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", user));

  } catch (error) {
    console.error("Create user error:", error.message);

    // send actual error message
    res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong"
    });
  }
});



export const signinUser = asyncHandler(async (req, res) => {
   try {
     const { email, password } = req.body;   
     if ( !email || !password ) {
          throw new ApiError(400, "Email and password are required");    
     }
 
     const user = await User.findOne({ email });
     if (!user)    {
          throw new ApiError(401, "Invalid email");
     }   


      const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


    // Generate JWT token
      const token = jwt.sign(
  {
    id: user._id,
    email: user.email
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRES_IN
  }
);


       res.status(200).json(
      new ApiResponse(200, "user signin successfully", {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      })
    );
 } catch (error) {
     console.error(`Error: ${error.message}`);
     res.status(500).json({ message: error.message });
   }
});

export const signoutUser = asyncHandler(async (req, res) => {
   try {
       // For stateless JWT, signout can be handled on client side by deleting the token        
         return res.status(200).json(new ApiResponse(200, "User signed out successfully"));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});