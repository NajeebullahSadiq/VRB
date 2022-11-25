import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  Location: { type: String, required: true },
  PhoneNo: { type: Number, required: true },
});

const UserData = mongoose.model("Data2", employeeSchema, "User");

export default UserData;
