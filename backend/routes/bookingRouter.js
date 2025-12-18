import express from "express";
import {
  getBookings,
  createBooking,
  confirmPayment,
  getUserBookings,
  getStats,
  checkBooking,

} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

/* ---------------- Public Routes ---------------- */
// Public – list all bookings (search, filter)
bookingRouter.get("/", getBookings);
// Public – dashboard stats
bookingRouter.get("/stats", getStats);

/* ---------------- Authenticated Inside Controller ---------------- */
// Create booking (Clerk session required inside controller)
bookingRouter.post("/create", createBooking);
bookingRouter.get("/check", checkBooking);

bookingRouter.get("/confirm", confirmPayment);

bookingRouter.get("/my", getUserBookings);

export default bookingRouter;