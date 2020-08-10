const mongoose = require('mongoose');

// Define Schemes
const deptSchema = new mongoose.Schema({
  deptcd: { type: String, required: true, unique: true },
  kname: { type: String, required: true },
  ename: { type: String, default: false },
  sqlno: { type: Number, default: false }
},
{
  timestamps: true
});

// Create new dept document
deptSchema.statics.create = function (payload) {
  // this === Model
  const dept = new this(payload);
  // return Promise
  return dept.save();
};

// Find All
deptSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({}).sort([['sqlno', 1],['kname', 1]]);
};

// Find One by deptcd
deptSchema.statics.findOneBydeptcd = function (deptcd) {
  return this.findOne({ deptcd });
};

// Find Array by deptcd
deptSchema.statics.findByArray = function (deptcdArray) {
  return this.find({deptcd: {$in: deptcdArray}});
};

// Update by deptid
deptSchema.statics.updateBydeptcd = function (deptcd, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ deptcd }, payload, { new: true });
};

// Delete by deptid
deptSchema.statics.deleteBydeptcd = function (deptcd) {
  return this.deleteOne({ deptcd });
};

// Create Model & Export
module.exports = mongoose.model('Dept', deptSchema);
