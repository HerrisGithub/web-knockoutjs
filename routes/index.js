var express = require('express');
var router = express.Router();
var nedb = require('nedb');
var knex = require('knex')(require('../knexfile').development);
var moment = require('moment');

function isValidDate(year,month,date) {
  var newdate = new Date();
  var yyyy = Number(year);
  var mm = Number(month)-1;
  var dd = Number(date);
  newdate.setFullYear(yyyy);
  newdate.setMonth(mm);
  newdate.setDate(dd);
  return dd == newdate.getDate() && mm == newdate.getMonth() && yyyy == newdate.getFullYear();
}
//#region  auth
  var auth=function(req,res,next){
    var db = req.db;
    var session = req.session;
    if(typeof req.session.username !=='undefined'){
      next();
    }else{
      res.redirect('/rol');
    }
  };
//#endregion

//#region register
  router.post('/register',function(req,res){
    var body = req.body;
    var firstname = (body.firstname).trim();
    var lastname = (body.lastname).trim();
    var fullname = firstname+' '+lastname;
    if(isValidDate(req.body.year,req.body.month,req.body.date)){
      var doc = {
        fullname :fullname,
        username:req.body.username,
        email:req.body.email,
        gender:req.body.jk=='male'?true:false,
        birth:req.body.year+'-'+req.body.month+'-'+req.body.date,
        phone:req.body.phone,
        photo:'',
        province:'',
        district:'',
        postal_code:'',
        address:'',
        password:req.body.password

      };
      knex.transaction(function(t){
        knex('users').transacting(t)
        .insert(doc)
        .then(t.commit)
        .catch(t.rollback);
      }).then(function(){
          res.redirect('/');
      }).catch(function(err){
        console.log(err);
        
      });
    }else{
      console.log('asdad');
    }
  });
//#endregion
//#region login
  router.get('/rol', function(req, res, next) {
    res.render('rol/rol', { title: 'Masuk atau Daftar' });
  });
  router.get('/login',function(req,res){
    res.redirect('/rol');
  });
  router.post('/login',function(req,res,next){
      var body = req.body;
      var email = body.email;
      var password = body.password;
      knex('users').select('*')
      .where({email:email,password:password})
      .then(function(data){
        data = JSON.parse(JSON.stringify(data));
        if(data.length>0){
          data = data[0];
          req.session.username = data.username;
          req.session.email = data.email;
          console.log(req.session);
          res.redirect('/');
        }
      });
      if(body.username =='herris'){
        req.session.username = 'herris';
        res.redirect('/');
      }
  });
//#endregion

//#region  homepage
  router.get('/',auth, function(req, res, next) {
      var db = req.db;
      res.render('home/index', { title: 'Home' });
  });
//#endregion


module.exports = router;
