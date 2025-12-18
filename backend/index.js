import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import courseRouter from "./routes/courseRouter.js";
import { clerkMiddleware } from "@clerk/express";
import bookingRouter from "./routes/bookingRouter.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk middleware — this adds Clerk data to requests
app.use(clerkMiddleware());

// Serve uploads
app.use("/uploads", express.static("uploads"));

// Database
connectDB();

// Routes
app.use("/api/course", courseRouter);
app.use("/api/booking", bookingRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
