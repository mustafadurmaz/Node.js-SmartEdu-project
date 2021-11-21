const mongoose = require("mongoose");
const slugify=require("slugify");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    trim: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  slug:{
    type:String,
    unique:String,
  }
});

CourseSchema.pre('validate',function(next){
  this.slug=slugify(this.name,{
    lower:true,
    strict:true,
  });
  next();
})

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;