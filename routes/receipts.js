const router = require('express').Router();
const Idmst = require('../models/idmst');
const Nation = require('../models/nation');
const Dept = require('../models/dept');
const Opdrpt = require('../models/opdrpt');
const Trdshd = require('../models/trdshd');
const Opdord = require('../models/opdord');

// Create new opdrpt document 초기화면
router.get('/insert', (req, res) => {
  res.render('./receipts/insert', {});    
});

//// 신환번호 발생  
router.get('/api/newidno', (req, res) => {
  Newidno.findAll()
    .then((newidno) => {
      console.log('---1---', newidno);
      res.send(newidno);
    })
    .catch(err => res.status(500).send(err));
});

//// 외래접수 현황  indate query
router.get('/api/users/all/:indate', (req, res) => {
  //console.log("-cc---", req.params.indate);
  Opdrpt.findByindate(req.params.indate)
    .then((opdrpt) => {
      //console.log('---1---', opdrpt);
      res.send(opdrpt);
    })
    .catch(err => res.status(500).send(err));
});

//// 외래접수 현황  indate query
router.get('/api/indate/:indate', (req, res) => {
  console.log("-cc---", req.params.indate);
  Opdord.findByindate(req.params.indate)
    .then((opdord) => {
      console.log('---1---', opdord);
      res.send(opdord);
    })
    .catch(err => res.status(500).send(err));
});


//// 개인별 외래접수 현황  idno query
router.get('/api/opdrpt/idno/:idno', (req, res) => {
  Opdrpt.findByidno(req.params.idno)
    .then((opdrpt) => {
      //console.log('---idno---', opdrpt);
      res.send(opdrpt);
    })
    .catch(err => res.status(500).send(err));
});

//// 외래접수 현황 - 등록번호조회 idno query
router.get('/api/idmst/idno/:idno', (req, res) => {
  Idmst.findOneByidmst(req.params.idno)
    .then((ridno) => {
      //console.log('---11---', ridno);
      res.send(ridno);
    })
    .catch(err => res.status(500).send(err));
});

// Create new opdrpt document
router.post('/api/users/save', (req, res) => {
  console.log(req.body);
  Opdrpt.create(req.body)
  //  .then(opdrpt => res.send(opdrpt))
    .catch(err => res.status(500).send(err));
  res.redirect('/receipts/insert');
});

// Create new opdrpt document
router.post('/insert/opdrpt', (req, res) => {
  Opdrpt.create(req.body)
  //  .then( opdrpt => {       console.log('---post----', req.body);       res.send(opdrpt)    })
    .catch(err => res.status(500).send(err));
  //res.redirect('/receipts/insert');
});

module.exports = router;
