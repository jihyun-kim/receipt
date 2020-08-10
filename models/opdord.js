const mongoose = require('mongoose');
const opdrpt = require('./opdrpt.js');
const idmst = require('./idmst.js');

const opdordSchema = new mongoose.Schema();

///////// Find  by indate
opdordSchema.statics.findByindate = function (indate) {
  return opdrpt.aggregate([
    {
      $match:{ indate:indate }
    },
    {
      $lookup:{ from : "idmsts", localField:"idno", foreignField:"idno", as : "test" }
    },
    { 
      $project: { _id:0, idno:1, indate:1, depts:1, kname: { $arrayElemAt: [ "$test.kname", 0 ] } } 
    }
  ])
};

// Update by opdrpt
opdordSchema.statics.updateByOrder = function (payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  var result = {};
  //console.log('--model--', payload, payload.idno, Object.keys(payload).length);
  var ObjOrds = Object.keys(payload).slice(9).map(key => ({[key]:payload[key]}));
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
  //return opdrpt.findOneAndUpdate({ idno, indate }, payload, { new: true });

  //var queryStr = "{ \"idno\": '" + payload.idno +"', \"indate\": '" + payload.indate + "'}," + " { $set : { \"ords." + payload.depts + "\": " + JSON.stringify(result) +  "}}";
  var query = { idno: payload.idno , indate: payload.indate };
  //console.log('query', query);
  var objOrds = JSON.parse('{"ords.' + payload.depts + '":' + JSON.stringify(result) + '}');
  //console.log('objOrds', objOrds);
  var objStatus = JSON.parse('{"status.' + payload.depts + '": 1}');
  //console.log('objStatus', objStatus);
  var objStr = Object.assign(objStatus, objOrds);
  //console.log('objStr', objStr);
  var objSet = { $set : objStr };
  console.log(query, objSet);

  //return opdrpt.updateOne({ idno:idno, indate:indate }, { $set : { qstr : payload, { new: true });
  //return opdrpt.updateOne(queryStr);
  // OK return opdrpt.updateOne({idno:'90001', indate:'2019-03-20'}, { $set : { "ords.1": {"drug":["order","pastille"],"nurse":"treatment"} } });  
  //var query = {idno:'90001', indate:'2019-03-20'};
  //var setStr = { $set : { "ords.0": { "drug": [ "order","pastille"],"nurse":"treatment"} } };
  return opdrpt.updateOne(query , objSet, {new:true} );  
};

/// insert3 대상자 리스트
opdordSchema.statics.opdrptList = function (ObjCond) {
  //console.log('opdorSchema -> ObjCond', ObjCond);

  var indateP = ObjCond.indate;
  var dispKey = ObjCond.dispKey;
  var sortKey = ObjCond.sortKey;

  const base = [
    { $match:{ indate:indateP }  },
    { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'}  },
    { $unwind:{path: '$status', includeArrayIndex:'status_Index'}  },
    { $unwind:{path: '$ords', includeArrayIndex:'ords_Index'}  },
    { $project:{_id:0, idno:1, indate:1, depts:1, status:1, ords:1, createdAt:1, depts_Index:1, status_Index:1, ords_Index:1,  compare: { $cmp:['$depts_Index', '$status_Index']}}  },
    { $match : { compare: 0} },
    { $project:{_id:0, idno:1, indate:1, depts:1, status:1, ords:1, createdAt:1, depts_Index:1, status_Index:1, ords_Index:1, compare: { $cmp:['$depts_Index', '$ords_Index']}}  },
    { $match : { compare: 0} },
    { $lookup:{ from: 'idmsts', localField:'idno', foreignField:'idno', as:'re_idmst'}  },
    { $lookup:{ from: 'depts', localField:'depts', foreignField:'deptcd', as:'re_dept'}  },
    { $project:{_id:0, check:{ $ne:['$status', dispKey] }, idno:1, indate:1, depts:1, ords:1, status:1, createdAt:{$toString:"$createdAt"}, depts_Index:{$toString:"$depts_Index"}, name: { $arrayElemAt: [ "$re_idmst.name", 0 ]}, deptnm: { $arrayElemAt: [ "$re_dept.kname", 0 ]}}  },
    { $match: { check : true }  }
    ];

  // DISPKEY
  // 위의 check의 값으로 

  // SORTKEY
  if (sortKey == 'idno') {
    sortCnd =  { $sort:{ status:1, idno: 1 } };
  } else if ( sortKey == 'createdAt') {
    sortCnd =  { $sort:{ status:1, createdAt: 1 } };
  }
  base.push(sortCnd);

  //console.log('base', base);
 return opdrpt.aggregate(base)   




  const pIndate = ObjCond.indate;
  return opdrpt.aggregate([
     { $match:{ indate:pIndate }  },
     { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'}  },
     { $unwind:{path: '$status', includeArrayIndex:'status_Index'}  },
     { $unwind:{path: '$ords', includeArrayIndex:'ords_Index'}  },
     { $project:{_id:0, idno:1, indate:1, depts:1, status:1, ords:1, createdAt:1, depts_Index:1, status_Index:1, ords_Index:1,  compare: { $cmp:['$depts_Index', '$status_Index']}}  },
     { $match : { compare: 0} },
     { $project:{_id:0, idno:1, indate:1, depts:1, status:1, ords:1, createdAt:1, depts_Index:1, status_Index:1, ords_Index:1, compare: { $cmp:['$depts_Index', '$ords_Index']}}  },
     { $match : { compare: 0} },
     { $lookup:{ from: 'idmsts', localField:'idno', foreignField:'idno', as:'re_idmst'}  },
     { $lookup:{ from: 'depts', localField:'depts', foreignField:'deptcd', as:'re_dept'}  },
     { $sort:{ status:1, createdAt: 1 } },
     { $project:{_id:0, idno:1, indate:1, depts:1, ords:1, status:1, createdAt:{$toString:"$createdAt"}, depts_Index:{$toString:"$depts_Index"}, name: { $arrayElemAt: [ "$re_idmst.name", 0 ]}, deptnm: { $arrayElemAt: [ "$re_dept.kname", 0 ]}}  }
  ])   
};

// Create Model & Export
module.exports = mongoose.model('OpdOrd', opdordSchema);
