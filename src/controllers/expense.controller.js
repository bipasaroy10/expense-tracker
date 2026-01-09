import { Expense } from "../models/expense.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";



export const createExpense = asyncHandler(async (req, res) => {
    const { amount,  date, category } = req.body;
    const userId = req.user.id; 
    if (!amount || !date || !category) {
        throw new ApiError(400, "All fields are required");
    }
    const expense = await Expense.create({
        user: userId,
        amount,
        date,
        category
    });
    res.status(201).json(new ApiResponse(201, expense, "Expense created successfully"));
});





export const getExpenses = asyncHandler(async (req, res) => {
    const userId = req.user.id; 
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(new ApiResponse(200, expenses, "Expenses retrieved successfully"));
}); 





export const updateExpense = asyncHandler(async (req, res) => {
    const expenseId = req.params.id;
    const userId = req.user.id; 
    const { amount, date, category } = req.body;
    //console.log(expenseId, userId);
       
    const expense = await Expense.findOneAndUpdate(
        { _id: expenseId, user: userId },
        { amount, date, category },    
        { new: true }
    );  
    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }
    res.status(200).json(new ApiResponse(200, expense, "Expense updated successfully"));
});





export const deleteExpense = asyncHandler(async (req, res) => {
    const expenseId = req.params.id;
    const userId = req.user.id; 
    const expense = await Expense.findOneAndDelete({ _id: expenseId, user: userId });
    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }
    res.status(200).json(new ApiResponse(200, null, "Expense deleted successfully"));
});
