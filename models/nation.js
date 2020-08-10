const mongoose = require('mongoose');

// Define Schemes
const nationSchema = new mongoose.Schema({
  nationcd: { type: String, required: true, unique: true },
  kname : { type: String, required: true },
  ename : { type: String, required: true },
  sqlno : { type: Number, default: false }
},
{
  timestamps: true
});

// Create new todo document
nationSchema.statics.create = function (payload) {
  // this === Model
  const nation = new this(payload);
  // return Promise
  return nation.save();
};

// Find All
nationSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  //return this.find({}).sort([['sqlno', 1]]);
  return this.find({}).sort([['sqlno', 1],['kname', 1]]);
};

// Find One by todoid
nationSchema.statics.findOneByNationcd = function (nationcd) {
  return this.findOne({ nationcd });
};

// Update by todoid
nationSchema.statics.updateByNationcd = function (nationcd, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ nationcd }, payload, { new: true });
};

// Delete by todoid
nationSchema.statics.deleteByNationcd = function (nationcd) {
  return this.remove({ nationcd });
};

// Create Model & Export
module.exports = mongoose.model('Nation', nationSchema);
