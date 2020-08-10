const mongoose = require('mongoose');

// Define Schemes
const trdshdSchema = new mongoose.Schema({
  indate: { type: String, required: true },
  depts: [{ type: String, required: true }]
},
{
  timestamps: true
});

trdshdSchema.index({
    indate: 1, }, 
    {
    unique: true,
});

// Create new trdshd document
trdshdSchema.statics.create = function (payload) {
  // this === Model
  const trdshd = new this(payload);
  // return Promise
  return trdshd.save();
};

// Find All
trdshdSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({}).sort([['indate', -1]]);
};

// Find One by trdshdid
trdshdSchema.statics.findOneBytrdshd = function (indate) {
  return this.findOne({ indate });
};

// Find between limit , skip
trdshdSchema.statics.findBetweentrdshd = function (limit,skip) {
  return this.find({}).limit(parseInt(limit)).skip(parseInt(skip)).sort({indate:-1});
};

// Update by trdshdid
trdshdSchema.statics.updateBytrdshd = function (indate, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ indate }, payload, { new: true });
};

// Delete by trdshdid
trdshdSchema.statics.deleteBytrdshd = function (indate) {
  return this.deleteOne({ indate });
};

// Create Model & Export
module.exports = mongoose.model('TrdShd', trdshdSchema);
