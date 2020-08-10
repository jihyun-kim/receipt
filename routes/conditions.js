const router = require('express').Router();
const Condition = require('../models/condition');

// 팝업화면 자료 읽어오기
router.get('/api/edit/:pid&:uid', (req, res) => {
  Condition.findOneByCond(req.params.pid, req.params.uid)
    .then((CondObj) => {
      if (!CondObj) return res.status(404).send({ err: 'Conditions not found' });
          console.log('---*---', CondObj);
          res.send(CondObj);
    })
    .catch(err => res.status(500).send(err));
});

// 팝업화면 자료 저장하기
router.post('/api/edit/:pid&:uid', (req, res) => {
  console.log("--post--", req.body);
  Condition.updateByCond(req.params.pid, req.params.uid, req.body)
    .then(CondObj => res.send(CondObj))
    .catch(err => res.status(500).send(err));
  //res.send({result:1});
});
  
module.exports = router;
