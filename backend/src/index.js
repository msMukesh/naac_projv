require('dotenv').config({path: './env'})
import mongoose from "mongoose";
import { DB_NAME } from "./constant";
import connectDB from "../db";

connectDB()
