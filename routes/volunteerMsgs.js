const router = require('express').Router();
const VolunteerMsg = require('../models/volunteerMsg');
const Volunteer = require('../models/volunteer');
const moment = require('moment');

// Find All
router.get('/index', (req, res) => {
  VolunteerMsg.findAll()
    .then((VolunteerMsgs) => {
      if (!VolunteerMsgs.length) return res.status(404).send({ err: 'VolunteerMsgs not found' });
      res.render('./volunteerMsgs/index', {data:VolunteerMsgs});
    })
    .catch(err => res.status(500).send(err));
});

// Create new VolunteerMsg document
router.get('/insert', (req, res) => {
  res.render('./volunteerMsgs/insert', {});
});
// Create new VolunteerMsg document
router.post('/insert', (req, res) => {
  VolunteerMsg.create(req.body)
    .then(Volunteer => res.redirect('/volunteerMsgs/index'))
    .catch(err => res.status(500).send(err));
  //res.redirect('/volunteerMsgs/index');
});

// 자원봉사 등록 화면
router.get('/insert2', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  res.render('./volunteerMsgs/insert2', {today:Today});
});
// 자원봉사코드 읽어오기 sub query
router.get('/api/search1', (req, res) => {
  Volunteer.findStatus()
    .then((volunteers) => {
      //console.log('---4---', volunteers);
      res.send(volunteers);
    })
    .catch(err => res.status(500).send(err));
});
// 자원봉사 등록 화면
router.post('/insert2', (req, res) => {
  VolunteerMsg.insertByOrder(req.body)
    .then(Volunteer => res.redirect('/volunteerMsgs/insert2'))
  //  .then(Volunteer => res.send(Volunteer))
    .catch(err => res.status(500).send(err));
  //res.redirect('/volunteerMsgs/insert2');
});

// upddate by  document
router.get('/edit/:indate', (req, res) => {
  VolunteerMsg.findOneByIndate(req.params.indate)
    .then((volunteerMsg) => {
      if (!volunteerMsg) return res.status(404).send({ err: 'VolunteerMsgs not found' });
      res.render('./volunteerMsgs/edit', {data:volunteerMsg});
    })
    .catch(err => res.status(500).send(err));
});
// Update by VolunteerMsg
router.post('/edit/:indate', (req, res) => {
  //console.log(req.body);
  VolunteerMsg.updateByIndate(req.params.indate, req.body)
  //  .then(Volunteer => res.send(Volunteer))
    .catch(err => res.status(500).send(err));
  res.redirect('/volunteerMsgs/index');
});


// Delete by Volunteerid
router.get('/delete/:indate', (req, res) => {
  VolunteerMsg.deleteByIndate(req.params.indate)
  //  .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
  res.redirect('/volunteerMsgs/index');
  });

module.exports = router;
