// Requiring Express 
const express = require('express');
const app = express()

// Requiring Router 
const router = express.Router()

// Requiring Middleware 
const {authuser, authroles} = require('../Middlewares/authorize');

// Requiring Controllers
const {homecontroller, registeruser, loginuser, logoutuser, admin, forgotpass, resetpass, getuserdetails, updatepassword, updateprofile, getsingleuser, getallusers,  updateuserprofile, deleteuserprofile, timeelapsed} = require('../Controllers/usercontroller');

router.get('/',homecontroller)
router.post('/register',registeruser)
router.post('/login',loginuser)
router.get('/logout',authuser,logoutuser)
router.post('/password/forgot',forgotpass)
router.put('/password/reset/:token',resetpass)
router.get('/admin',authuser,authroles('admin'),admin)
router.get('/me',authuser,getuserdetails)
router.put('/password/update',authuser,updatepassword)
router.put('/me/update',authuser,updateprofile)
router.get('/admin/users',authuser,authroles('admin'),getallusers)
router
.route('/admin/user/:id')
.get(authuser,authroles('admin'),getsingleuser)
.put(authuser,authroles('admin'),updateuserprofile)
.delete(authuser,authroles('admin'),deleteuserprofile)

router.post('/:product/timeelapsed',authuser,timeelapsed)

// Exporting Router 
module.exports = router