const router = require('express').Router();
const Idmst = require('../models/idmst');
const Nation = require('../models/nation');
const Dept = require('../models/dept');
const Opdrpt = require('../models/opdrpt');
const Trdshd = require('../models/trdshd');
const moment = require('moment');

// Find All by sortkey
router.get('/index/:skey', (req, res) => {
  Opdrpt.findAll(req.params.skey)
    .then((opdrpts) => {
      if (!opdrpts.length) return res.status(404).send({ err: 'opdrpt not found' });
      res.render('./opdrpts/index', {data:opdrpts});
    })
    .catch(err => res.status(500).send(err));
});

// Find Between
router.get('/index2/:limit&:skip', (req, res) => {
  Opdrpt.findBetweenopdrpt(req.params.limit, req.params.skip)
    .then((opdrpts) => {
      if (!opdrpts.length) return res.status(404).send({ err: 'Index2 opdrpt not found' });
      res.render('./opdrpts/index2', {page:req.params.skip, data:opdrpts});
    })
    .catch(err => res.status(500).send(err));
});

// 외래접수 개별 조회
router.get('/index3/:idno', (req, res) => {
  Opdrpt.findByidno(req.params.idno)
    .then((opdrpts) => {
      if (!opdrpts.length) return res.status(404).send({ err: 'Index3 opdrpt not found' });
      res.render('./opdrpts/index3', {data:opdrpts});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by opdrpt
router.get('/opdrptcd/:idno&:indate', (req, res) => {
  Opdrpt.findOneByopdrpt(req.params.idno, req.params.indate)
    .then((opdrpt) => {
      if (!opdrpt) return res.status(404).send({ err: 'opdrpt not found' });
      res.send(`findOne successfully: ${opdrpt}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by trdshd
router.get('/api/trdshd/:indate', (req, res) => {
  Trdshd.findOneBytrdshd(req.params.indate)
    .then((trdshd) => {
      console.log('--trdshd--', trdshd);
      return Dept.findByArray(trdshd.depts)
      .then((depts) => {
        console.log('---3---', depts);
        res.send(depts);
    })
    .catch(err => res.status(500).send(err));
  })
  .catch(err => res.status(500).send(err));
});

// Create new opdrpt document 초기화면
router.get('/insert', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  Trdshd.findOneBytrdshd(Today)
    .then((trdshd) => {
      return Dept.findByArray(trdshd.depts)
      .then((depts) => {
        console.log('---3---', depts);
        res.render('./opdrpts/insert', {today:Today, deptsAll:depts});    
      })
    .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// Create new opdrpt document
router.post('/insert', (req, res) => {
  console.log('--cc--', req.body);
  Opdrpt.create(req.body)
  //  .then(opdrpt => res.send(opdrpt))
    .catch(err => res.status(500).send(err));
  res.redirect('/opdrpts/index');
});

// Create new opdrpt document 초기화면
router.get('/insert2', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  Trdshd.findOneBytrdshd(Today)
    .then((trdshd) => {
      return Dept.findByArray(trdshd.depts)
      .then((depts) => {
        //console.log('---3---', depts);
        res.render('./opdrpts/insert2', {today:Today, deptsAll:depts, deptsAll2:''});    
      })
    .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// Create new opdrpt document
router.post('/insert2', (req, res) => {
  console.log('-opdrpts-', req.body);
  Opdrpt.create(req.body)
  //  .then(opdrpt => {      res.send(opdrpt)     })
    .catch(err => res.status(500).send(err));
  res.redirect('/opdrpts/insert2');
});

// 외래 추가 접수 시작화면
router.get('/insert3', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  Trdshd.findOneBytrdshd(Today)
    .then((trdshd) => {
      return Dept.findByArray(trdshd.depts)
      .then((depts) => {
        //console.log('---3---', depts);
        res.render('./opdrpts/insert3', {today:Today, deptsAll:depts, deptsAll2:''});    
      })
    .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// 외래 추가 접수 
router.post('/insert3', (req, res) => {
  console.log('-opdrpts-', req.body);
  Opdrpt.pushOpdrpt(req.body)
  //  .then(opdrpt => {      res.send(opdrpt)     })
    .catch(err => res.status(500).send(err));
  res.redirect('/opdrpts/insert3');
});

// 접수화면 인터페이스2
router.get('/api/opdrpt2/:idno&:indate', (req, res) => {
  //console.log("idno&indate",req.params.idno, req.params.indate)
  Opdrpt.findOneByopdrpt2(req.params.idno)
  .then( (idmst) => {
    //console.log('--idmst--', idmst);
    res.send(idmst);
    })
  .catch(err => res.status(500).send(err));
});

// 접수화면 인터페이스3
router.get('/api/opdrpt3/:idno', (req, res) => {
  //console.log("idno",req.params.idno)
  Opdrpt.findOneByOpdrpt3(req.params.idno)
  .then( (opdrpt) => {
    //console.log('--opdrpt--', opdrpt);
    res.send(opdrpt);
  })
  .catch(err => res.status(500).send(err));
});

// upddate by  document
router.get('/edit/:idno&:indate', (req, res) => {
  Opdrpt.findOneByopdrpt(req.params.idno, req.params.indate)
    .then((opdrpt) => {
      if (!opdrpt) return res.status(404).send({ err: 'opdrpt not found' });
          //console.log('---*---', opdrpt);
          res.render('./opdrpts/edit', {data:opdrpt});
    })
    .catch(err => res.status(500).send(err));
});

// Update by opdrptid
router.post('/edit/:idno&:indate', (req, res) => {
  Opdrpt.updateByopdrpt(req.params.idno, req.params.indate, req.body)
  //  .then(opdrpt => res.send(idno, indate))
    .catch(err => res.status(500).send(err));
  res.redirect('/opdrpts/index');
});


// Delete by opdrptid
router.get('/delete/:idno&:indate', (req, res) => {
  Opdrpt.deleteByopdrpt(req.params.idno, req.params.indate)
  //  .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
  res.redirect('/opdrpts/index');
  });

module.exports = router;
