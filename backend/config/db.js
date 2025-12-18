import mongoose from "mongoose";
export const connectDB=async()=>{
  await mongoose.connect('mongodb+srv://nahakaditya344_db_user:IJSbOQ05RfYs2FgQ@cluster0.zmkiizu.mongodb.net/L-M-S')
  .then(()=>{console.log('DB connected')});
  
}

// export const connectDB = async () => {
//   let uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lms";

//   // If an env var is set but clearly not a MongoDB URI (e.g., pasted something else), warn and fall back
//   const isLikelyMongo = typeof uri === "string" && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"));
//   if (!isLikelyMongo) {
//     if (process.env.MONGODB_URI || process.env.MONGO_URI) {
//       console.warn(
//         "Warning: MONGODB_URI/MONGO_URI appears malformed. Falling back to local MongoDB default (mongodb://127.0.0.1:27017/lms)."
//       );
//     }
//     uri = "mongodb://127.0.0.1:27017/lms";
//   }

//   // Diagnostic: show resolved URI (mask credentials if present) to help identify bad env values
//   try {
//     const masked = String(uri).replace(/(mongodb(?:\+srv)?:\/\/)([^@\/]+@)?/, (m, p1, p2) => {
//       if (!p2) return p1;
//       // mask user:pass@ to user:****@
//       const maskedCred = p2.replace(/:(.*?)@/, ':****@');
//       return p1 + maskedCred;
//     });
//     console.log("Using MongoDB URI:", masked.slice(0, 180));
//   } catch (e) {
//     console.log("Using MongoDB URI (unable to mask):", String(uri).slice(0, 180));
//   }

//   try {
//     await mongoose.connect(uri, {
//       // useUnifiedTopology/useNewUrlParser not required with modern mongoose but safe to include
//       autoIndex: true,
//     });
//     console.log("DB connected");
//   } catch (err) {
//     console.error("Failed to connect to MongoDB:", err.message || err);
//     throw err;
//   }
// };

// ✨ Step-by-step Instructions (Follow Step 1, then Step 2, then Step 3, …)

// Step 1 — Decide where the DB will live
// Choose Atlas (cloud) or local and pick a database name you’ll use for development.

// Step 2 — Create the database deployment
// If Atlas: create a cluster. If local: start your MongoDB service (mongod) so the DB is up and reachable.

// Step 3 — Create a DB user
// Add a dedicated database user with a strong password and only the roles it needs (least privilege).

// Step 4 — Allow network access
// Whitelist your machine’s IP (or a limited set of IPs). For quick dev you may use 0.0.0.0/0 temporarily — don’t do that in production.

// Step 5 — Get the connection (driver) link
// From Atlas (or your admin), copy the connection/driver URI — this is the link you will paste into your Node code.

// Step 6 — Store the URI securely
// Put that URI into an environment variable or secrets manager (do not hard-code it into source control).

// Step 7 — Prepare your Node project
// Ensure your Node runtime and module style are set (CommonJS vs ESM) and that your MongoDB client library (e.g., mongoose) is installed.

// Step 8 — Paste the driver link into your connection code
// COPY THE DRIVE'S LINK AND PASTE IT HERE — into the mongoose.connect("") call below:

// import mongoose from "mongoose";

// export const connectDB = async ()=> {
//   await mongoose.connect("")
//   .then(() => {console.log("DB connected")})
// }


// (Replace the empty quotes "" with the connection URI you copied in Step 5.)

// Step 9 — Ensure connection runs before serving traffic
// Call your connect function during app startup and only start accepting requests after a successful connection (or handle failure gracefully).

// Step 10 — Test read & write
// From your app, perform a simple read and write to verify connectivity and permissions.

// Step 11 — Add basic error & reconnection handling
// Log failures, retry if appropriate, and handle disconnect/reconnect events so the app stays resilient.

// Step 12 — Harden for production
// Use TLS, restrict network access to known IPs/VPCs, rotate credentials regularly, and use a secrets manager in production.

// Step 13 — Monitor & alert
// Enable monitoring/alerts (latency, connection errors, auth failures) so you get notified of issues early.

// Step 14 — Document the setup
// Write a short README that lists the env variable name, where to find the URI, and any network rules so teammates can reproduce the setup.

// If you have any questions or need help, call us at 8299431275 or email hexagonsservices@gmail.com