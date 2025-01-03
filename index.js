const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const contentRoutes = require("./routes/contentRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const settingRoutes = require("./routes/settingRoutes.js");
const featureBlogimageRoutes = require("./routes/imageRoutes.js");
const clientRoutes = require("./routes/clientRoute.js");
const zohoRoutes = require("./routes/zohoRoutes");

// Initialize Express
const app = express();
dotenv.config();

// Middleware

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "https://aisthtml.netlify.app",
  ], // Allow your local development frontend
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/featureimages", featureBlogimageRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/zoho", zohoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
