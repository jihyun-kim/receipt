const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.use('login', new LocalStrategy({ // "login"이라는 LocalStrategy를 생성
     usernameField : 'id',
     passwordField : 'password',
     passReqToCallback : true, // 콜백 함수에 req 객체를 넘길지 여부
    },function(req, id, password, done) {
        // DB를 연결하여 해당 계정의 비밀번호가 올바른지 체크하도록 구현
     let userInfo = null;
     if(   id === 'admin' && password === 'svh7025' 
        || id === 'ASC001' && password === '0314079780' 
        || id === 'ASC002' && password === '0314079780' 
        || id === 'ASC003' && password === '0314079780'
        || id === 'ASC004' && password === '0314079780'
        || id === 'ASC005' && password === '0314079780'
        || id === 'ASC006' && password === '0314079780'
        || id === 'ASC007' && password === '0314079780'
        || id === 'ASC008' && password === '0314079780'
        || id === 'ASC009' && password === '0314079780'
        || id === 'ASC010' && password === '0314079780' ){ // 관리자 계정
        userInfo = {
            admin : true, uid:id
        };
       }   else if(id === 'user' && password === 'password'){ // 사용자 계정
        userInfo = {
            admin : false
        };
       } else{
        return done(null, false);
     }
    return done(null, userInfo);
    })
    );

    passport.serializeUser(function(user, done) {
    // LocalStrategy에서 받은 userInfo 정보를 session에 정보 저장
    done(null, user);
    });
    passport.deserializeUser(function(user, done) {
    // 세션에 따라 많은 정보가 필요한 경우
    // serializeUser에서 중요 정보만 session에 저장 후
    // deserializeUser에서 DB 등에서 정보를 요청하여 추가 정보를 전달 하도록 함
    const userInfo = {
        user, // serializeUser에서 session에 저장한 정보
        info : 'test message' // deserializeUser에서 추가로 저장한 정보
    };
    done(null, userInfo);
    });
};
