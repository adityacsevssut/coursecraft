import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.jsx";

// IMPORTANT: your publishable key
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById("root")).render(
    <ClerkProvider publishableKey={clerkKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
);
