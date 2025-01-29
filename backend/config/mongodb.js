const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "aptify", // Specify the database name here
    });

    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
module.exports=connectDB;
