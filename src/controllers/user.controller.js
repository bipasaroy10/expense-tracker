import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";


export const createUser = asyncHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if ( !name || !email || !password ) {
           throw new ApiError(400, "All fields are required");
        }


        const exists = await User.findOne({ email });
        if (exists) {
           throw new ApiError(400, "User with this email already exists");
        }


        const user = await User.create({ name, email, password });
        return res.status(201).json(new ApiResponse(201, "User created successfully", user));



    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const signinUser = asyncHandler(async (req, res) => {
   try {
     const { email, password } = req.body;   
     if ( !email || !password ) {
          throw new ApiError(400, "Email and password are required");    
     }
 
     const user = await User.findOne({ email });
     if (!user || user.password !== password) {
          throw new ApiError(401, "Invalid email or password");
     }   
     return res.status(200).json(new ApiResponse(200, "User signed in successfully", user));
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