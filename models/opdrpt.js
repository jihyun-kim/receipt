const mongoose = require('mongoose');
const idmst = require('./idmst.js');

// Define Schemes
const opdrptSchema = new mongoose.Schema({
  idno: { type: String, required: true },
  indate: { type: String, required: true },
  depts: [{ type: String, required: true }],
  ords: [{ type: Object, required: false }],
  //ords: [{ type: String, required: false }],
  //ords: [mongoose.Schema.Types.ObjectId],
  status: [{ type: String, required: true }],
  gubun: { type: String, required: true }
},
{
  timestamps: true
});

opdrptSchema.index({
    idno: 1,indate: 1, }, 
    {
    unique: true,
});

// Create new opdrpt document
opdrptSchema.statics.create = function (payload) {
  // this === Model
  //console.log('payload',payload);
  const opdrpt = new this(payload);
  // return Promise
  return opdrpt.save();
};

// Find All
opdrptSchema.statics.findAll = function (skey) {
  // return promise
  // V4부터 exec() 필요없음
  if (skey == '0') {
    return this.find({}).sort([['indate', -1]]);
  } else if (skey == '1' ) { 
    return this.find({}).sort([['indate', -1],['idno', 1]]);
  } 
};

// Find One by opdrptid
opdrptSchema.statics.findOneByopdrpt = function (idno, indate) {
  return this.findOne({ 'idno':idno, 'indate':indate });
};

// Find One by opdrpt2 접수인터페이스 
opdrptSchema.statics.findOneByopdrpt2 = function (idno) {
  return idmst.findOne({ 'idno': idno } );
};

// Find One by opdrpt3 접수인터페이스 
opdrptSchema.statics.findOneByOpdrpt3 = function (idno) {
  return this.aggregate([
    { $match:{ idno: idno }  },
    { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'}  },
    { $lookup:{ from: 'depts', localField:'depts', foreignField:'deptcd', as:'re_dept'}  },
    { $project:{_id:0, idno:1, indate:1, depts:1, createdAt:{$toString:"$createdAt"}, depts_Index:{$toString:"$depts_Index"},  deptnm: { $arrayElemAt: [ "$re_dept.kname", 0 ]}}  },
    { $sort:{ indate:1, createdAt: 1 } },
    { $project: { indate:1, depts:1, deptnm:1 } }
  ])    
 };

// Find One by opdrpt3 접수인터페이스 
opdrptSchema.statics.pushOpdrpt = function (payload) {
  console.log('payload push',payload, payload.depts);
  return this.updateOne({idno:payload.idno, indate:payload.indate}, {$push : {depts:payload.depts, ords:'', status:'0'}})
 };

///////// Find  by indate
opdrptSchema.statics.findByindate = function (indate) {
  return this.find({ 'indate':indate });
};

///////// Find  by idno
opdrptSchema.statics.findByidno = function (idno) {
  return this.find({ 'idno':idno }).sort([['indate', -1]]);
};

// Find between limit , skip
opdrptSchema.statics.findBetweenopdrpt = function (limit,skip) {
  return this.find({}).limit(parseInt(limit)).skip(parseInt(skip)).sort({indate:-1, createdAt:-1});
};

// Update by opdrptid
opdrptSchema.statics.updateByopdrpt = function (idno, indate,  payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ idno, indate }, payload, { new: true });
};

// Delete by opdrptid
opdrptSchema.statics.deleteByopdrpt = function (idno, indate) {
  return this.deleteOne({ 'idno':idno, 'indate':indate });
};

// Create Model & Export
module.exports = mongoose.model('OpdRpt', opdrptSchema);
