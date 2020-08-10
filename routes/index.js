var express = require('express');
var router = express.Router();
const passport = require('passport');
const moment = require('moment');

// passport
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info) { // "login"이라는 LocalStrategy를 사용하여 session 처리
    console.log('--user--',user, moment().format() );
      if (err) {
          next(err);
      }
      if (!user) {
          res.status(401);
          res.json({
              type : 'info',
              message : 'login fail'
          });
          return;
      }
      req.logIn(user, function(err) {
          if (err) {
              next(err);
          }
          res.status(200);
          //res.json({type : 'info', message : 'login success'});
          res.render('index', { title: 'Express' });
          return;
      });
  })(req, res, next);}
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { // 현재 session이 유효한 세션인가?
      // 유효 하므로 다음으로
      return next();
  }
  // 유효하지 않은 경우
  res.status(401);
  res.json({});
}

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
