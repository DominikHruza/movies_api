const mongoose = require("mongoose");
const url =
  "mongodb+srv://movies:movies@cluster0.8ieie.mongodb.net/movies_db?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
