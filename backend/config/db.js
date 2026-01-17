import mongoose from "mongoose";

// Cache for database connection
let cachedConnection = null;
let connectionPromise = null;

// Connection options for better performance and reliability
const connectionOptions = {
  autoIndex: true,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  heartbeatFrequencyMS: 10000, // Send keepalive every 10 seconds
};

export const connectDB = async () => {
  // Return cached connection if already connected
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("✅ Using cached database connection");
    return cachedConnection;
  }

  // Return existing connection promise if connection is in progress
  if (connectionPromise) {
    console.log("⏳ Waiting for existing connection attempt...");
    return connectionPromise;
  }

  // Create new connection promise
  connectionPromise = (async () => {
    try {
      console.log("🔄 Connecting to database...");
      
      // Use environment variable or fallback to default
      const uri = process.env.MONGODB_URI || 
                  process.env.MONGO_URI || 
                  "mongodb://127.0.0.1:27017/coursecraft_lms";
      
      console.log(`🔗 Connecting to: ${uri.replace(/:[^:@]*@/, ':***@')}`); // Mask password in logs
      
      // Connect with options
      await mongoose.connect(uri, connectionOptions);
      
      // Cache the connection
      cachedConnection = mongoose.connection;
      connectionPromise = null; // Reset promise after successful connection
      
      console.log("✅ Database connected successfully");
      
      // Connection event handlers
      mongoose.connection.on("connected", () => {
        console.log("📡 Mongoose connected to DB");
      });
      
      mongoose.connection.on("error", (err) => {
        console.error("❌ Mongoose connection error:", err);
        cachedConnection = null; // Clear cache on error
      });
      
      mongoose.connection.on("disconnected", () => {
        console.log("🔌 Mongoose disconnected");
        cachedConnection = null; // Clear cache on disconnect
      });
      
      // Handle process termination
      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("🌙 Mongoose connection closed due to app termination");
        process.exit(0);
      });
      
      return cachedConnection;
      
    } catch (error) {
      console.error("💥 Database connection failed:", error.message);
      connectionPromise = null; // Reset promise on failure
      cachedConnection = null; // Clear cache on failure
      
      // Retry logic with exponential backoff
      const retryAttempts = 3;
      const baseDelay = 1000; // 1 second
      
      for (let attempt = 1; attempt <= retryAttempts; attempt++) {
        const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
        console.log(`⏱️  Retrying connection in ${delay/1000} seconds... (Attempt ${attempt}/${retryAttempts})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        try {
          const uri = process.env.MONGODB_URI || 
                      process.env.MONGO_URI || 
                      "mongodb://127.0.0.1:27017/coursecraft_lms";
          
          await mongoose.connect(uri, connectionOptions);
          cachedConnection = mongoose.connection;
          console.log("✅ Database reconnected successfully");
          return cachedConnection;
        } catch (retryError) {
          console.error(`💥 Retry attempt ${attempt} failed:`, retryError.message);
          if (attempt === retryAttempts) {
            throw new Error(`Failed to connect to database after ${retryAttempts} attempts`);
          }
        }
      }
    }
  })();
  
  return connectionPromise;
};

// Function to check if database is connected
export const isDatabaseConnected = () => {
  return cachedConnection && mongoose.connection.readyState === 1;
};

// Function to get connection status
export const getConnectionStatus = () => {
  const statusMap = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
  };
  
  return {
    isConnected: isDatabaseConnected(),
    status: statusMap[mongoose.connection.readyState] || "Unknown",
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name
  };
};

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