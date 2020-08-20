const express    =   require('express');
const userModel  =   require('../models/userModel');
const jwt        =   require('jsonwebtoken');
const passport   =   require('passport');

const router = express.Router();

router.get('/addUser',(req,res)=>{
     res.json({msg:'working'});
});

router.post('/addUser',(req,res)=>{
    const user = new userModel({
        username:req.body.uname,
        email:req.body.email,
        password:req.body.password
    });
    user.save((err,udata)=>{
        if(err){
            res.json({er:err});
        }
        res.json({data:udata});
    });
});

router.get('/login',(req,res)=>{
 res.json({msg:'login working'});
});

router.post('/login',(req,res)=>{
   userModel.find({$and:[{email:req.body.email,password:req.body.password}]},(err,udata)=>{
          if(err){
              res.json({er:err});
          }
          const x = 'bearer '+jwt.sign(
              {email:udata[0].email},
              process.env.SECRET_KEY,
              {expiresIn: '10s' } // ten second expiration
          );
          res.json({da:x});
   });
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({msg:'profile page'});
});

module.exports = router;