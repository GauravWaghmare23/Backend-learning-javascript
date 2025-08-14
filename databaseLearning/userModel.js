import mongoose from 'mongoose';


mongoose.connect("mongodb://localhost:27017/userdb")
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
});

const userModel = mongoose.model('user', userSchema);
export default userModel;