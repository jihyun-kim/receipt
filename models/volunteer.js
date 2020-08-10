const mongoose = require('mongoose');

// Define Schemes
const VolunteerSchema = new mongoose.Schema({
  vcode: { type: String, required: true, unique: true },
  gubun : { type: String, required: true },
  detail : { type: String, required: true },
  status : { type: String, required: true },
  sqlno : { type: Number, default: false }
},
{
  timestamps: true
});

// Create new todo document
VolunteerSchema.statics.create = function (payload) {
  // this === Model
  const volunteer = new this(payload);
  // return Promise
  return volunteer.save();
};

// Find All
VolunteerSchema.statics.findAll = function () {
  // return promise
  return this.find({}).sort({sqlno:1});
};

// Find All for status = 1
VolunteerSchema.statics.findStatus = function () {
  // return promise
  return this.find({status:"1"}).sort({sqlno:1});
};

// Find One by todoid
VolunteerSchema.statics.findOneByVcode = function (vcode) {
  return this.findOne({ vcode });
};

// Update by todoid
VolunteerSchema.statics.updateByVcode = function (vcode, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ vcode }, payload, { new: true });
};

// Delete by todoid
VolunteerSchema.statics.deleteByVcode = function (vcode) {
  return this.deleteOne({ vcode });
};

// Create Model & Export
module.exports = mongoose.model('Volunteer', VolunteerSchema);
