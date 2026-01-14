import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    amount: {
        type: Number,
        required: true
    },
  
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Food",
            "Transport",
            "Utilities",
            "Entertainment",
            "Healthcare",
            "Rent",
            "Shopping",
            "ElectricBill",
            "GasBill",
            "WaterBill",
            "Other"
        ]
    }

}, {timestamps: true});

export const Expense = mongoose.model("Expense", expenseSchema);