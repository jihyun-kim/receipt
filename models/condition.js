const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
  pid : { type: String, required: true },
  uid : { type: String, required: true },
  rules: { type: Object, required: false }
});
conditionSchema.index({
  pid: 1, uid: 1, }, 
  {
  unique: true,
});

///////// Find  by indate
conditionSchema.statics.findOneByCond= function (pPid, pUid) {
  //console.log('prameters',pPid,pUid);
  //return this.aggregate([
  //  { $match:{ pid:pPid } },
  //  { $project: { _id:0, pid:1, indate:1} } 
  //])
  return this.findOne({pid:pPid,uid:pUid}, {_id:0, rules:1});
};

// Update by deptid
conditionSchema.statics.updateByCond = function (pPid, pUid, pRules) {
  console.log('updateByCond',pPid, pUid, pRules);
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.updateOne({ pid:pPid, uid:pUid }, {$set:{rules: pRules}}, { new: true });
};



// Create Model & Export
module.exports = mongoose.model('condition', conditionSchema);
