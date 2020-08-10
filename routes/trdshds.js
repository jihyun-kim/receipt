const router = require('express').Router();
const Trdshd = require('../models/trdshd');
const Dept = require('../models/dept');
const moment = require('moment');

// Find All
router.get('/index', (req, res) => {
  Trdshd.findAll()
    .then((trdshds) => {
      if (!trdshds.length) return res.status(404).send({ err: 'Trdshd not found' });
      res.render('./trdshds/index', {data:trdshds});
    })
    .catch(err => res.status(500).send(err));
});

// Find Between //차후에 필요한 시점에 추가

// Create new Trdshd document 초기화면
router.get('/insert', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  Dept.findAll()
  .then((deptsAll) => {
    res.render('./trdshds/insert', {deptsAll:deptsAll, today:Today});    
  })
  .catch(err => res.status(500).send(err));
});

// Create new Trdshd document
router.post('/insert', (req, res) => {
  //console.log("--c--", req.body);
  Trdshd.create(req.body)
  //  .then(trdshd => res.send(trdshd))
    .catch(err => res.status(500).send(err));
  res.redirect('/trdshds/index');
});

////////////////////////////////////////////
//  insert2
////////////////////////////////////////////
// Create new Trdshd document 초기화면
router.get('/insert2', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  Dept.findAll()
  .then((deptsAll) => {
    res.render('./trdshds/insert2', {deptsAll:deptsAll, today:Today});    
  })
  .catch(err => res.status(500).send(err));
});
// Create new Trdshd document
router.post('/insert2', (req, res) => {
  //console.log("--c--", req.body);
  Trdshd.create(req.body)
  //  .then((trdshd) => {  res.send(trdshd);    })
    .catch(err => res.status(500).send(err));
  res.redirect('/trdshds/index');
});

// upddate by  document
router.get('/edit/:indate', (req, res) => {
  Trdshd.findOneBytrdshd(req.params.indate)
    .then((indate) => {
        return Dept.findAll()
        .then((depts) => {
          //console.log('---3---', indate, depts);
          res.render('./trdshds/edit', {data:indate, depts:depts});
      })
      .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// Update by Trdshdid
router.post('/edit/:indate', (req, res) => {
  console.log(req.body);
  Trdshd.updateBytrdshd(req.params.indate, req.body)
  //  .then(trdshd => res.send(indate))
    .catch(err => res.status(500).send(err));
  res.redirect('/trdshds/index');
});


// Delete by Trdshdid
router.get('/delete/:indate', (req, res) => {
  Trdshd.deleteBytrdshd(req.params.indate)
  //  .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
  res.redirect('/trdshds/index');
  });

module.exports = router;
