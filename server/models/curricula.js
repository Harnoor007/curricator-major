const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
  u_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const organizationSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  vision: { type: String },
  mission: { type: String }
});

const departmentSchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  vision: { type: String },
  mission: { type: String }, 
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  head: { type: String }
});
  
const programSchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  owner: { type: String },
  description: { type: String }, 
  department: { type: String },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
});

const curriculumSchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },//referenced from _id of department
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },//referenced from _id of program
  from: { type: Date },
  to: { type: Date }
});

const poSchema = new mongoose.Schema({
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
  Program_Outcomes: { type: String },
  PO_type: { type: String }
});

const courseSchema = new mongoose.Schema({
  code: { type: String },
  title: { type: String },
  coreElective: { type: String },
  credits: { type: Number },
  totalMarks: { type: Number },
  courseOwner: { type: String },
  type: { type: String },
  departmentId: { type: mongoose.Schema.Types.ObjectId,ref: 'Department' },
  hours: { type: Number },
  curriculumId: { type: mongoose.Schema.Types.ObjectId,ref: 'Curriculum' }
});

const teacherSchema = new mongoose.Schema({
  name: { type: String },
  departmentId: { type: mongoose.Schema.Types.ObjectId },
  qualification: { type: String },
  experience: { type: Number },
  email: { type: String },
  password: { type: String }
});

const coSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  content: { type: String },
  bloomsLevel: { type: String }
});

const copomappingSchema = new mongoose.Schema({
  coId: { type: String },
  poId: { type: String  }
});

const SignUp = mongoose.model('Signup', SignupSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const Department = mongoose.model('Department', departmentSchema);
const Program = mongoose.model('Program', programSchema);
const Curriculum = mongoose.model('Curriculum', curriculumSchema);
const PO = mongoose.model('PO', poSchema);
const Course = mongoose.model('Course', courseSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const CO = mongoose.model('CO', coSchema);
const COPOMapping = mongoose.model('COPOMapping', copomappingSchema);

module.exports = {
  Organization,
  Department,
  Program,
  Curriculum,
  PO,
  Course,
  Teacher,
  CO,
  COPOMapping,
  SignUp
};
