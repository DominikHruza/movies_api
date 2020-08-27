const mongoose = require("mongoose");
const url = process.env.MONGO_URI || "mongodb://localhost:27017/movies";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://movies:movies@cluster0.8ieie.mongodb.net/movies_db?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
