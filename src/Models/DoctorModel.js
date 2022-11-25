import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  image: { type:String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true},
  phoneNo: { type:String, required: true},
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  fee: { type: String, required: true},
  timing_for_appointment:{ type: String, required: true},
  awards: { type: String, required: true },
  clinic_location: { type: String, required: true},
  description: { type: String, required: true}


});

const Data = mongoose.model("Data", employeeSchema, "DoctorData");

export default Data;
