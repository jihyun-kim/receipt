const mongoose = require('mongoose');

// Define Schemes
const idmstSchema = new mongoose.Schema({
  idno: { type: String, required: true, unique: true },
  idnogubun: { type: String, required: true },
  indate: { type: String, required: true },
  name: { type: String, required: true },
  juminA: { type: String, default: true },
  juminB: { type: String, default: true },
  nationcd: { type: String, required: true },
  address: { type: String, default: false },
  telno: { type: String, default: false },
  memo: { type: String, default: false }
},
{
  timestamps: true
});

// Create new idmst document
idmstSchema.statics.create = function (payload) {
  // this === Model
  console.log(payload);
  const idmst = new this(payload);
  // return Promise
  return idmst.save();
};

// Find All
idmstSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({}).sort([['idno', -1]]);
};

// Find One by idmstid
idmstSchema.statics.findOneByidmst = function (idno) {
  return this.findOne({ idno });
};

// Find One by idmstid
idmstSchema.statics.findOneByidno = function (idno) {
  return this.findOne({ idno });
};

// Find between limit , skip
idmstSchema.statics.findBetweenidmst = function (limit,skip) {
  return this.find({}).limit(parseInt(limit)).skip(parseInt(skip)).sort({indate:-1, createdAt:-1});
};

// Update by idmstid
idmstSchema.statics.updateByidmst = function (idno, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ idno }, payload, { new: true });
};

// Delete by idmstid
idmstSchema.statics.deleteByidmst = function (idno) {
  return this.deleteOne({ idno });
};

// Max idmsts  of idno
idmstSchema.statics.Maxidmst = function (idnogubun) {
  return this.aggregate([
    { 
      $match : { 'idnogubun' : idnogubun  }
    },
    { 
      $group : { _id: null, max: { $max : "$idno" } }
    }
  ])
};

// Create Model & Export
module.exports = mongoose.model('Idmst', idmstSchema);
