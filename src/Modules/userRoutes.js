import { Router } from "express";
import express from 'express'
import { deleteUser, getUsers, login, register, updateUser, verifyEmail } from "./userController.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";

export const userRoutes = Router()

userRoutes.use(express.json())

userRoutes.post('/users/register', register)
userRoutes.post('/users/login', login)
userRoutes.get('/users/verify/:email', verifyEmail)
userRoutes.put('/users/:id', updateUser)
//userRoutes.post('/users/logout', logoutUser)   // to do (delete token)
userRoutes.get('/users', verifyAdminToken, getUsers)
userRoutes.delete('/users/:id', verifyAdminToken, deleteUser)
