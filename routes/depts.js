const router = require('express').Router();
const Dept = require('../models/dept');

// Find All
router.get('/index', (req, res) => {
  Dept.findAll()
    .then((depts) => {
      if (!depts.length) return res.status(404).send({ err: 'dept not found' });
      res.render('./depts/index', {data:depts});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by deptcd
router.get('/deptcd/:deptcd', (req, res) => {
  Dept.findOneBydeptcd(req.params.deptcd)
    .then((dept) => {
      if (!dept) return res.status(404).send({ err: 'dept not found' });
      res.send(`findOne successfully: ${dept}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new dept document
router.get('/insert', (req, res) => {
  res.render('./depts/insert', {});
  });

// Create new dept document
router.post('/insert', (req, res) => {
  Dept.create(req.body)
 //   .then(dept => res.send(dept))
    .catch(err => res.status(500).send(err));
  res.redirect('/depts/index');
});

// upddate by  document
router.get('/edit/:deptcd', (req, res) => {
  Dept.findOneBydeptcd(req.params.deptcd)
  .then((dept) => {
    res.render('./depts/edit', {data:dept});
  })
  .catch(err => res.status(500).send(err));
});

// Update by deptid
router.post('/edit/:deptcd', (req, res) => {
  //console.log(req.body);
  Dept.updateBydeptcd(req.params.deptcd, req.body)
//    .then(dept => res.send(dept))
    .catch(err => res.status(500).send(err));
  res.redirect('/depts/index');
});

// Delete by deptid
router.get('/delete/:deptcd', (req, res) => {
  Dept.deleteBydeptcd(req.params.deptcd)
  // .then(() => res.sendStatus(200))
     .catch(err => res.status(500).send(err));
  res.redirect('/depts/index');
});
  
module.exports = router;
