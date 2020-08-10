const mongoose = require('mongoose');
const idmst = require('./idmst.js');
const opdrpt = require('./opdrpt.js');

const searchSchema = new mongoose.Schema();

///////// Find  by indate
searchSchema.statics.searchIdmsts = function (sKey, sStr) {
  //console.log(sKey, sStr);
  var str = '{ "$regex" : "' + sStr + '" }';
  var obj = JSON.parse(str);
  if (sKey == "name") {
     var search = { name : obj };
  } else if ( sKey == "juminA" ) {
     var search = { juminA : obj };
  } else if ( sKey == "juminB" ) {
     var search = { juminB : obj };
  } else if ( sKey == "address" ) {
     var search = { address : obj };
  } else if ( sKey == "telno" ) {
     var search = { telno : obj };
  }
  //console.log('searchIdmsts', search);
  return idmst.find(search);
};

searchSchema.statics.searchOpdrpt = function (indateP, ne_statusP) {
   return opdrpt.aggregate([
      { $match:{ indate:indateP } },
      { $sort:{ createdAt: 1 } },
      { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'}  },
      { $unwind:{path: '$status', includeArrayIndex:'status_Index'}  },
      { $project:{_id:0, idno:1, indate:1, depts:1, status:1, createdAt:1, compare: { $cmp:['$depts_Index', '$status_Index']}}  },
      { $match : { compare: 0}  },
      { $lookup:{ from: 'idmsts', localField:'idno', foreignField:'idno', as:'re_idmst'}  },
      { $lookup:{ from: 'depts', localField:'depts', foreignField:'deptcd', as:'re_dept'}  },
      { $project:{_id:0, check:{ $ne:['$status',ne_statusP] }, statusnm:{ $cond:{ if:{$eq:['$status', '0' ]}, then:'접수', else:'진료' } }, idno:1, indate:1, depts:1, status:1, createdAt:1, name: { $arrayElemAt: [ "$re_idmst.name", 0 ]}, deptnm: { $arrayElemAt: [ "$re_dept.kname", 0 ]}}  },
      { $match: { check : true }  }
   ])   
};
 
// Create Model & Export
module.exports = mongoose.model('search', searchSchema);
