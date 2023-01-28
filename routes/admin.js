const express = require('express');
const router = express.Router();
const adminHelpers = require('../helpers/admin-helpers')

const verifyLogin = (req,res,next)=>{
  if (req.session.admin) {
    next()    
  }else{
    res.redirect('/admin')
  }
}
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/admin-login');
});

// router.get('/admin', function(req, res, next) {
//   if (req.session.admin) {
//     adminHelpers.getUserData().then((data) => {
//   console.log(data,'route-call');
//   res.render('admin/view-users',{data});
//     })
//   } else {
//     res.redirect('/admin-login')
//   }
// });

router.get('/admin-login', function (req, res, next) {
  if (req.session.admin) {
    res.redirect('/admin/view-users')
  } else {
    session = req.session
    res.render('admin/admin-login', { session });
  }
});

router.post('/admin-login', (req, res) => {

  adminHelpers.adminlogin(req.body).then((response) => {
    if (response.status) {
      req.session.admin = response.admin
       console.log(req.session.admin);
       console.log('success');
      res.redirect('/admin/view-users')

    } else if (response.adminnotfound) {
      console.log('adminnotfound');
      req.session.adminnotfound = true;
      req.session.wrongpassword = false;
      res.redirect('/admin/admin-login')

    } else {
      console.log('failed login');
      req.session.wrongpassword = true;
      req.session.adminnotfound = false;
      res.redirect('/admin/admin-login')

    }

  })

});

router.get('/view-users',function(req,res){
  // res.render('admin/view-users',{admin:true});
   if (req.session.admin) {
    adminHelpers.getUserData().then((data) => {
  console.log(data,'route-call');
  res.render('admin/view-users',{admin:true,data});
    })
  } else {
    res.redirect('/admin/admin-login')
  }
})


router.get('/add-user',verifyLogin,function(req,res){
  if (req.session.admin) {
    
    res.render('admin/add-user',{admin:true});
  } else {
  
    res.redirect('/admin/view-users')
  }
  
})
router.post('/add-user', (req, res) => {
  adminHelpers.addUser(req.body).then(() => {
    res.redirect('/admin/view-users')
  })
})

//Delete 
router.get('/delete-user/:id', (req, res) => {
  var userid=req.params.id
  adminHelpers.deleteUser(userid).then((data)=>{
    console.log("route");
   res.redirect('/admin/view-users')
  })
 })

 //Update 
router.get('/update-user/:id', (req, res) => {
  let userid=req.params.id
  adminHelpers.getOneUser(userid).then((userdata)=>{
  res.render('admin/update-user',{userdata})
  
    
  })
})

router.post('/update-user/:id', (req, res) => {
  adminHelpers.updateUserData(req.params.id,req.body).then((response) => {
    // console.log(response)
    res.redirect('/admin/view-users')
  })
})



router.get('/logout', (req, res) => {
  req.session.admin=null;
  res.redirect('/admin/admin-login')
});


module.exports = router;
