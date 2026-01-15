import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

});

attendanceSchema.index({ user: 1 });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;