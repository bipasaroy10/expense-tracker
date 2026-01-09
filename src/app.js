import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());    
app.use(express.urlencoded({ extended: true, limit: '16kb' }));



import userRoutes from "./routes/user.route.js";
import expenseRoutes from "./routes/expense.route.js";

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);


export default app;