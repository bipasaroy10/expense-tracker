import express from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expense.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', authenticate, createExpense);
router.get('/get', authenticate, getExpenses);
router.put('/update/:id', authenticate, updateExpense);
router.delete('/delete/:id', authenticate, deleteExpense); 

export default router;