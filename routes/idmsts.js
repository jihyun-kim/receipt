const router = require('express').Router();
const Idmst = require('../models/idmst');
const Nation = require('../models/nation');
const Dept = require('../models/dept');
const moment = require('moment');

// Find All
router.get('/index', (req, res) => {
  Idmst.findAll()
    .then((idmsts) => {
      if (!idmsts.length) return res.status(404).send({ err: 'Idmst not found' });
      res.render('./idmsts/index', {data:idmsts});
    })
    .catch(err => res.status(500).send(err));
});

// Find Between
router.get('/index2/:limit&:skip', (req, res) => {
  Idmst.findBetweenidmst(req.params.limit, req.params.skip)
    .then((idmsts) => {
      if (!idmsts.length) return res.status(404).send({ err: 'Index2 idmst not found' });
      res.render('./idmsts/index2', {page:req.params.skip, data:idmsts});
    })
    .catch(err => res.status(500).send(err));
});

router.get('/index3/:idno', (req, res) => {
  Idmst.findOneByidno(req.params.idno)
  .then((idmst) => {
    //console.log('-+-', idmst);
    //if (!idmst.length) return res.status(404).send({ err: 'Index2 idmst not found' });
    res.render('./idmsts/index3', {data:[idmst]});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by idno
router.get('/api/:idno', (req, res) => {
  Idmst.findOneByidno(req.params.idno)
    .then((idno) => {
      if (!idno) return res.status(404).send({ err: 'Idmst not found' });
      res.send(idno);
    })
    .catch(err => res.status(500).send(err));
});


// Find One by Idmstid
router.get('/idmstcd/:idmst', (req, res) => {
  Idmst.findOneByidmst(req.params.idmst)
    .then((idmst) => {
      if (!idmst) return res.status(404).send({ err: 'Idmst not found' });
      res.send(`findOne successfully: ${idmst}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new Idmst document
router.get('/insert', (req, res) => {
  Nation.findAll()
  .then((nations) => {
   res.render('./idmsts/insert', {nations:nations});    
  })
  .catch(err => res.status(500).send(err));
});

// Create new Idmst document
router.post('/insert', (req, res) => {
  Idmst.create(req.body)
  //  .then(Idmst => res.send(idmst))
    .catch(err => res.status(500).send(err));
  res.redirect('/idmsts/index');
});


////////////////////////////////////////////
/// INSERT 2  새로운 입력화면
////////////////////////////////////////////
router.get('/insert2', (req, res) => {
  const Today =  moment().format('YYYY-MM-DD')
  Nation.findAll()
  .then((nations) => {
      res.render('./idmsts/insert2', {indate:Today, nations:nations});    
    })
  .catch(err => res.status(500).send(err));
});

// Create new Idmst document
router.post('/insert2', (req, res) => {
  //console.log('-+-', req.body);
  Idmst.create(req.body)
  //  .then(Idmst => res.send(idmst))
    .catch(err => res.status(500).send(err));
    res.redirect('/idmsts/insert2');
});
////////////////////////////////////////////

////////////////////////////////////////////
/// 신환번호 발행 MAX idno
////////////////////////////////////////////
router.get('/api/maxidmst/:idnogubun', (req, res) => {
  Idmst.Maxidmst(req.params.idnogubun)
    .then((maxidmst) => {
      console.log(maxidmst);
      if (!maxidmst) return res.status(404).send({ err: 'newidno not found' });
      res.send(maxidmst);
    })
    .catch(err => res.status(500).send(err));
});
////////////////////////////////////////////

// upddate by  document
router.get('/edit/:idno', (req, res) => {
  Idmst.findOneByidmst(req.params.idno)
    .then((idno) => {
      return Nation.findAll()
      .then((nations) => {
        return Dept.findAll()
        .then((depts) => {
          res.render('./idmsts/edit', {data:idno, nations:nations, depts:depts});
        })
        .catch(err => res.status(500).send(err));
      })
      .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// Update by Idmstid
router.post('/edit/:idno', (req, res) => {
  console.log(req.body);
  Idmst.updateByidmst(req.params.idno, req.body)
  //  .then(idmst => res.send(idno))
    .catch(err => res.status(500).send(err));
  res.redirect('/idmsts/index/');
});


// Delete by Idmstid
router.get('/delete/:idno', (req, res) => {
  Idmst.deleteByidmst(req.params.idno)
  //  .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
  res.redirect('/idmsts/index');
  });

module.exports = router;
