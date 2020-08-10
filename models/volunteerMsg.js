const mongoose = require('mongoose');

// Define Schemes
const VolunteerMsgSchema = new mongoose.Schema({
  indate: { type: String, required: true, unique: true },
  ords: { type: Object, required: false }
},
{
  timestamps: true
});

// Create new todo document
VolunteerMsgSchema.statics.create = function (payload) {
  // this === Model
  const volunteerMsg = new this(payload);
  // return Promise
  return volunteerMsg.save();
};

VolunteerMsgSchema.statics.insertByOrder = function (payload) {
  var result = {};
  //console.log('--model--', payload,  Object.keys(payload).length);
  var ObjOrds = Object.keys(payload).slice(1).map(key => ({[key]:payload[key]}));
  //console.log('ObjOrds', ObjOrds);
  ObjOrds.forEach(function(entry) {
    //console.log('entry-', entry);
    // 수량 zero 저장 않함
    if ( entry[Object.keys(entry)] != "0" ) {
      //console.log('entry+', entry);
      result = Object.assign(result, entry);
    }
  });
  //console.log("result", JSON.stringify(result));
  var objIndate = JSON.parse('{"indate":"' + payload.indate + '"}');
  //console.log('objIndate', objIndate);
  var objOrds = JSON.parse('{"ords":' + JSON.stringify(result) + '}');
  //console.log('objOrds', objOrds);
  var objStr = Object.assign(objIndate, objOrds);
  console.log('objStr', objStr);
  
  const volunteerMsg = new this(objStr);
  // return Promise
  return volunteerMsg.save();
};

// Find All
VolunteerMsgSchema.statics.findAll = function () {
  // return promise
  return this.find({}).sort([['indate', -1]]);
};

// Find One by todoid
VolunteerMsgSchema.statics.findOneByIndate = function (indate) {
  return this.findOne({ indate });
};

// Update by todoid
VolunteerMsgSchema.statics.updateByIndate = function (indate, payload) {
  //console.log(payload, payload.ords,JSON.stringify(payload.ords), JSON.parse(payload.ords));
  payload.ords = JSON.parse(payload.ords);
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ indate }, payload, { new: true });
};

// Delete by todoid
VolunteerMsgSchema.statics.deleteByIndate = function (indate) {
  return this.deleteOne({ indate });
};

// Create Model & Export
module.exports = mongoose.model('VolunteerMsg', VolunteerMsgSchema);
