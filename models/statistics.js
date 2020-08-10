const mongoose = require('mongoose');
//const idmst = require('./idmst.js');
const opdrpt = require('./opdrpt.js');
const volunteermsg = require('./volunteerMsg.js');

const statisticsSchema = new mongoose.Schema();

// 과별 통계
statisticsSchema.statics.statisticsDepts = function (yearP, monthP) {
  console.log('--Depts year,month---', yearP, monthP);
  return opdrpt.aggregate([ 
    { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'} }, 
    { $project : {depts:1, date : { $dateFromString: { dateString : "$indate" }}} }, 
    { $project : {depts:1, year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } }, 
    { $match: { $and: [ {year: parseInt(yearP)}, {month: parseInt(monthP)} ] } }, 
    { $group : {_id: {year: '$year', month: '$month', day: '$day', dept:"$depts" }, count: { $sum: 1 } } }, 
    { $project: { _id:0, year: "$_id.year", month: "$_id.month", dept: "$_id.dept", day: "$_id.day", cnt:"$count"} }, 
    { $group: {_id:{year: {$toString:'$year'}, month: {$toString:'$month'}, dept: '$dept'}, dayCnts:{$push:{day:'$day', cnt: '$cnt'}} } }, 
    { $project: { _id:0, year:'$_id.year', month:'$_id.month', dept:'$_id.dept', yearMonth:{$concat:['$_id.year','-','$_id.month']}, dayCnts:1 } }, 
    { $lookup:{ from: 'depts', localField:'dept', foreignField:'deptcd', as:'re_dept'} }, 
    { $lookup:{ from: 'daysInMonth', localField:'yearMonth', foreignField:'yearMonth', as:'re_daysinmonth'} }, 
    { $project: {year:1,month:1,dept:1, dayCnts:1, daysInMonth:{ $arrayElemAt: [ "$re_daysinmonth.daysinmonth", 0 ]}, deptnm: { $arrayElemAt: [ "$re_dept.kname", 0 ]}, sqlno: { $arrayElemAt: [ "$re_dept.sqlno", 0 ]} } }, 
    { $sort: {sqlno:1}} 
 ]) 
}
// 국가별 통계
statisticsSchema.statics.statisticsNations = function (yearP, monthP) {
  console.log('--Nations year,month---', yearP, monthP);
  return opdrpt.aggregate([ 
    { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'} }, 
    { $project : {idno:1, depts:1, date : { $dateFromString: { dateString : "$indate" }}} }, 
    { $project : {idno:1, depts:1, year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } }, 
    { $match: { $and: [ {year: parseInt(yearP)}, {month: parseInt(monthP)} ] } }, 
    { $lookup:{ from: 'idmsts', localField:'idno', foreignField:'idno', as:'re_idmsts'} }, 
    { $project: {idno:1, depts:1, year:1, month:1, day:1, nationcd:{ $arrayElemAt: [ "$re_idmsts.nationcd", 0 ]} } }, 
    { $group : {_id: {year: '$year', month: '$month', day: '$day', nation:"$nationcd" }, count: { $sum: 1 } } }, 
    { $project: { _id:0, year: "$_id.year", month: "$_id.month", nation: "$_id.nation", day: "$_id.day", cnt:"$count"} }, 
    { $group: {_id:{year: {$toString:'$year'}, month: {$toString:'$month'}, nation: '$nation'}, dayCnts:{$push:{day:'$day', cnt: '$cnt'}} } }, 
    { $project: { _id:0, year:'$_id.year', month:'$_id.month', nation:'$_id.nation', yearMonth:{$concat:['$_id.year','-','$_id.month']}, dayCnts:1 } }, 
    { $lookup:{ from: 'nations', localField:'nation', foreignField:'nationcd', as:'re_nations'} }, 
    { $lookup:{ from: 'daysInMonth', localField:'yearMonth', foreignField:'yearMonth', as:'re_daysinmonth'} }, 
    { $project: {year:1,month:1,dept:1, dayCnts:1, daysInMonth:{ $arrayElemAt: [ "$re_daysinmonth.daysinmonth", 0 ]}, nationnm: { $arrayElemAt: [ "$re_nations.kname", 0 ]}, sqlno: { $arrayElemAt: [ "$re_nations.sqlno", 0 ]} } }, 
    { $sort: {sqlno:1}} 
]) 
};
// 종합통계 - 1) 진료건수  통계
statisticsSchema.statics.statisticsOrds1 = function (yearP, monthP) {
  console.log('--1) year,month---', yearP, monthP);
  return opdrpt.aggregate([ 
    { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'} }, 
    { $project : {date : { $dateFromString: { dateString : "$indate" }}} }, 
    { $project : { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } }, 
    { $match: { $and: [ {year: parseInt(yearP)}, {month: parseInt(monthP)} ] } }, 
    { $group : {_id: {year: '$year', month: '$month', day: '$day' }, count: { $sum: 1 } } }, 
    { $project: { _id:0, year: "$_id.year", month: "$_id.month", day: "$_id.day", cnt:"$count"} }, 
    
    { $group: {_id:{year: {$toString:'$year'}, month: {$toString:'$month'}}, dayCnts:{$push:{day:'$day', cnt: '$cnt'}} } }, 
    { $project: { _id:0, year:'$_id.year', month:'$_id.month',  yearMonth:{$concat:['$_id.year','-','$_id.month']}, dayCnts:1 } }, 
    { $lookup:{ from: 'daysInMonth', localField:'yearMonth', foreignField:'yearMonth', as:'re_daysinmonth'} }, 
    { $project: {year:1,month:1, dayCnts:1, daysInMonth:{ $arrayElemAt: [ "$re_daysinmonth.daysinmonth", 0 ]}, codenm: "진료건수"  } }
])
};

// 종합통계 - 2) 환자남여  통계
statisticsSchema.statics.statisticsOrds2 = function (yearP, monthP) {
  console.log('--2) year,month---', yearP, monthP);
  return opdrpt.aggregate([ 
    { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'} }, 
    { $project : {idno:1, date : { $dateFromString: { dateString : "$indate" }}} }, 
    { $project : {idno:1, year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } }, 
    { $match: { $and: [ {year: parseInt(yearP)}, {month: parseInt(monthP)} ] } }, 
    { $lookup:{ from: 'idmsts', localField:'idno', foreignField:'idno', as:'re_idmsts'} }, 
    { $project: {idno:1, year:1, month:1, day:1, juminB:{ $arrayElemAt: [ "$re_idmsts.juminB", 0 ]} } }, 
    { $project: {idno:1, year:1, month:1, day:1, jumin: {$substr:["$juminB", 0, 1]} } }, 
    { $project: {idno:1, year:1, month:1, day:1, gender: { $cond: [{$or:[{$eq:["$jumin","1"]},{$eq:["$jumin","3"]},{$eq:["$jumin","5"]},{$eq:["$jumin","7"]}]}, '남','여']  } } }, 
    { $group : {_id: {year: '$year', month: '$month', day: '$day', gender:"$gender" }, count: { $sum: 1 } } }, 
    { $project: { _id:0, year: "$_id.year", month: "$_id.month", gender: "$_id.gender", day: "$_id.day", cnt:"$count"} }, 
    { $group: {_id:{year: {$toString:'$year'}, month: {$toString:'$month'}, gender: '$gender'}, dayCnts:{$push:{day:'$day', cnt: '$cnt'}} } }, 
    { $project: { _id:0, year:'$_id.year', month:'$_id.month', gender:'$_id.gender', yearMonth:{$concat:['$_id.year','-','$_id.month']}, dayCnts:1 } }, 
    { $lookup:{ from: 'daysInMonth', localField:'yearMonth', foreignField:'yearMonth', as:'re_daysinmonth'} }, 
    { $project: {year:1,month:1,dept:1, dayCnts:1, daysInMonth:{ $arrayElemAt: [ "$re_daysinmonth.daysinmonth", 0 ]}, codenm:'$gender' } }, 
    { $sort: {gender:1}} 
])
};
// 종합통계 - 3) 초재진  통계
statisticsSchema.statics.statisticsOrds3 = function (yearP, monthP) {
  console.log('--3) year,month---', yearP, monthP);
  return opdrpt.aggregate([ 
    { $unwind:{path: '$depts', includeArrayIndex:'depts_Index'} }, 
    { $project : {idno:1, indate:1, date : { $dateFromString: { dateString : "$indate" }}} }, 
    { $project : {idno:1, indate:1, year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } }, 
    { $match: { $and: [ {year: parseInt(yearP)}, {month: parseInt(monthP)} ] } }, 
    { $lookup:{ from: 'opdrpts', localField:'idno', foreignField:'idno', as:'re_opdrpts'} }, 
    { $unwind:{path: '$re_opdrpts', includeArrayIndex:'re_opdrpts_Index'} }, 
    { $project: {year:1, month:1, day:1, re_gubun:"$re_opdrpts.gubun", dateCmp : {$cmp:['$re_opdrpts.indate', "$indate"]}  } }, 
    { $match: {dateCmp: 0 } },
    { $project: {idno:1, year:1, month:1, day:1, gubun: { $cond: [ {$eq:["$re_gubun","0"] } , '초','재']  } } }, 
    { $group : {_id: {year: '$year', month: '$month', day: '$day', gubun:"$gubun" }, count: { $sum: 1 } } }, 
    { $project: { _id:0, year: "$_id.year", month: "$_id.month", gubun: "$_id.gubun", day: "$_id.day", cnt:"$count"} }, 
    { $group: {_id:{year: {$toString:'$year'}, month: {$toString:'$month'}, gubun: '$gubun'}, dayCnts:{$push:{day:'$day', cnt: '$cnt'}} } }, 
    { $project: { _id:0, year:'$_id.year', month:'$_id.month', gubun:'$_id.gubun', yearMonth:{$concat:['$_id.year','-','$_id.month']}, dayCnts:1 } }, 
    { $lookup:{ from: 'daysInMonth', localField:'yearMonth', foreignField:'yearMonth', as:'re_daysinmonth'} }, 
    { $project: {year:1,month:1,dept:1, dayCnts:1, daysInMonth:{ $arrayElemAt: [ "$re_daysinmonth.daysinmonth", 0 ]}, codenm:'$gubun' } }, 
    { $sort: {gubun:1}} 
])
};
// 종합통계 - 4) 처방건수  통계
statisticsSchema.statics.statisticsOrds4 = function (yearP, monthP) {
  console.log('--4) year,month---', yearP, monthP);
  return opdrpt.aggregate([ 
    { $unwind:{path: '$ords', includeArrayIndex:'ords_Index'} }, 
    { $project : {ords:1, date : { $dateFromString: { dateString : "$indate" }}} }, 
    { $project : {ords:1, year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } }, 
    { $match: { $and: [ {year: parseInt(yearP)}, {month: parseInt(monthP)} ] } }, 
    { $match: { ords:{ "$ne": "" }} }, 
    
    { $project: {  year:1, month:1, day:1, codes: { $objectToArray: "$ords" } } },
    { $unwind: "$codes" },
    { $group : {_id: {year: '$year', month: '$month', day: '$day', codes:"$codes.k" }, total: { $sum: {"$toDouble": "$codes.v" }} } },     

    { $project: { _id:0, year: "$_id.year", month: "$_id.month", codes: "$_id.codes", day: "$_id.day", cnt:"$total"} }, 
    { $group: {_id:{year: {$toString:'$year'}, month: {$toString:'$month'}, codes: '$codes'}, dayCnts:{$push:{day:'$day', cnt: '$cnt'}} } }, 
    { $project: { _id:0, year:'$_id.year', month:'$_id.month', codes:'$_id.codes', yearMonth:{$concat:['$_id.year','-','$_id.month']}, dayCnts:1 } }, 

    { $lookup:{ from: 'ordmsts', localField:'codes', foreignField:'code', as:'re_ordmsts'} }, 
    { $lookup:{ from: 'daysInMonth', localField:'yearMonth', foreignField:'yearMonth', as:'re_daysinmonth'} }, 
    { $project: {year:1,month:1,codes:1, dayCnts:1, daysInMonth:{ $arrayElemAt: [ "$re_daysinmonth.daysinmonth", 0 ]}, codenm: { $arrayElemAt: [ "$re_ordmsts.kname", 0 ]}, sqlno: { $arrayElemAt: [ "$re_ordmsts.sqlno", 0 ]} } }, 
    { $sort: {sqlno:1}} 
])
};

// 종합통계 - 5) 자원봉사  통계
statisticsSchema.statics.statisticsOrds5 = function (yearP, monthP) {
  console.log('--5) year,month---', yearP, monthP);
  return volunteermsg.aggregate([ 
    { $project : {ords:1, date : { $dateFromString: { dateString : "$indate" }}} }, 
    { $project : {ords:1, year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } }, 
    { $match: { $and: [ {year: parseInt(yearP)}, {month: parseInt(monthP)} ] } }, 

    { $project: {  year:1, month:1, day:1, codes: { $objectToArray: "$ords" } } },
    { $unwind: "$codes" },
    { $group : {_id: {year: '$year', month: '$month', day: '$day', codes:"$codes.k" }, total: { $sum: {"$toDouble": "$codes.v" }} } },     

    { $project: { _id:0, year: "$_id.year", month: "$_id.month", codes: "$_id.codes", day: "$_id.day", cnt:"$total"} }, 
    { $group: {_id:{year: {$toString:'$year'}, month: {$toString:'$month'}, codes: '$codes'}, dayCnts:{$push:{day:'$day', cnt: '$cnt'}} } }, 
    { $project: { _id:0, year:'$_id.year', month:'$_id.month', codes:'$_id.codes', yearMonth:{$concat:['$_id.year','-','$_id.month']}, dayCnts:1 } }, 

    { $lookup:{ from: 'volunteers', localField:'codes', foreignField:'vcode', as:'re_volunteers'} }, 
    { $lookup:{ from: 'daysInMonth', localField:'yearMonth', foreignField:'yearMonth', as:'re_daysinmonth'} }, 
    { $project: {year:1,month:1,codes:1, dayCnts:1, daysInMonth:{ $arrayElemAt: [ "$re_daysinmonth.daysinmonth", 0 ]}, codenm: {$concat: [{ $arrayElemAt: [ "$re_volunteers.gubun", 0 ]},"-", { $arrayElemAt: [ "$re_volunteers.detail", 0 ]}] }, sqlno: { $arrayElemAt: [ "$re_volunteers.sqlno", 0 ]} } }, 
    { $sort: {sqlno:1}} 
])
};



 // Create Model & Export
module.exports = mongoose.model('statistics', statisticsSchema);
