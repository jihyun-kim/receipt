const router = require('express').Router();
const Opdrpt = require('../models/opdrpt');
const Opdord = require('../models/opdord');
const Condition = require('../models/condition');
const moment = require('moment');
var userInfo = new Object();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { // 현재 session이 유효한 세션인가?
      // 유효 하므로 다음으로
      //console.log('-----user---',  req.user.user);
      userInfo = req.user.user;
      return next();
  }
  // 유효하지 않은 경우
  res.status(401);
  res.json({});
}

// OPDORD는 기능상 처방을 opdrpt collection UPDATE
router.get('/insert2', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  res.render('./opdords/insert2', {indate:Today});    
});

// Update by Idmstid
router.post('/insert2/', (req, res) => {
  console.log("--post--", req.body);
  Opdord.updateByOrder(req.body)
    .then(opdord => {
      //console.log('-----', opdord)
      res.send(idno);
    })
    .catch(err => res.status(500).send(err));
  res.redirect('/opdords/insert2');
});

///////////////// version 3
// OPDORD는 기능상 처방을 opdrpt collection UPDATE
router.get('/insert3', ensureAuthenticated, (req, res) => {
  //console.log('Uid', userInfo.uid);
  const Today =  moment().format('YYYY-MM-DD')
  Condition.findOneByCond('AA001',userInfo.uid).then( ObjCond => {
    //console.log('ObjCond---', ObjCond);
    // 환경설정에 indate를 ''인 경우, 오늘 일자로 기본 설정
    if (ObjCond.rules.indate == '') { ObjCond.rules.indate = Today; }
    Opdord.opdrptList(ObjCond.rules).then( opdord => {
      //console.log('-----', opdord)
      res.render('./opdords/insert3', {data:opdord, today:Today, uid:userInfo.uid});    
    }).catch(err => res.status(500).send(err));
  });
});

// Update by Idmstid
router.post('/insert3/', (req, res) => {
  //console.log("--post--", req.body);
  Opdord.updateByOrder(req.body)
  //  .then(opdord => {
  //    console.log('-----', opdord)
  //    res.send(idno);
  //  })
    .catch(err => res.status(500).send(err));
  res.redirect('/opdords/insert3');
});

//// idno & indate opdords   
router.get('/api/opdord/:idno&:indate', (req, res) => {
  //console.log('idono&indate',req.params.idno, req.params.indate);
  Opdrpt.findOneByopdrpt(req.params.idno, req.params.indate)
    .then((opdrpt) => {
      //console.log('---1---', opdrpt);
      res.send(opdrpt);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
