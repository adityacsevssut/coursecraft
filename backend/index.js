import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB, getConnectionStatus } from "./config/db.js";
import courseRouter from "./routes/courseRouter.js";
import { clerkMiddleware } from "@clerk/express";
import bookingRouter from "./routes/bookingRouter.js";
import attendanceRouter from "./routes/attendanceRouter.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
appapp.use(
  cors({
<<<<<<< HEAD
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://coursecraft-fs.onrender.com", "https://coursecraft-admin.onrender.com"],
=======
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://coursecraft-fs.onrender.com",
      "https://coursecraft-admin.onrender.com",
    ],
>>>>>>> f04a91608330538cd6fc31ba077004dcfbf3417b
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk middleware — this adds Clerk data to requests
app.use(clerkMiddleware());

// Serve uploads
app.use("/uploads", express.static("uploads"));

// Database connection with caching
const initializeDatabase = async () => {
  try {
    console.log("🚀 Initializing database connection...");
    await connectDB();
    console.log("✅ Database initialized successfully");
    
    // Log connection status
    const status = getConnectionStatus();
    console.log("📊 Database Status:", {
      connected: status.isConnected,
      status: status.status,
      host: status.host || "localhost",
      name: status.name || "coursecraft_lms"
    });
  } catch (error) {
    console.error("💥 Failed to initialize database:", error.message);
    console.log("⚠️  Server will start but database-dependent features may not work");
  }
};

// Initialize database connection
initializeDatabase();

// Routes
app.use('/api/courses', courseRouter);
app.use('/api/course', courseRouter);  // Add this to support /api/course/public as well
app.use('/api/bookings', bookingRouter);
app.use('/api/attendance', attendanceRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});