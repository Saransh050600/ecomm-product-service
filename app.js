require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 
const productRoutes = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const app = express();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser()); 

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", 
  credentials: true, 
}));

app.use(express.json()); 


app.use("/api/products", productRoutes);


app.use((err, req, res, next) => {
  console.error(err); 
  res.status(500).json({ message: "Something broke" }); 
});

const PORT = process.env.PORT || 5001;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Product Service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
