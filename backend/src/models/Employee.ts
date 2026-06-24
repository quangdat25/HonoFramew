import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  gender: {
    type: Boolean, // true for Male, false for Female based on typical convention from screenshots
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  depId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
}, {
  timestamps: true, // Will automatically add createdAt and updatedAt
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
