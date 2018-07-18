

const express = require('express');
const router = express.Router();
//const user = require('../../../models/user');
const genUtil = require('../../../utilites/genutils');
const userHelper = require('../../../helper/user_helper');
const USER_DETAILS_FIELDS = ['role', 'status', 'sex', 'name', 'email', 'id', 'createdAt', 'updatedAt'];



// router.post('/user')
router.post('/signup', async(req, res, next) =>{

    let email = req.body.email || '' ;
    let password = req.body.password  || '';
    let name = req.body.name  || '';
    let sex = req.body.sex || '' ;
    let role = req.body.role || '' ;

    let retVal = await userHelper.createUserInDatabase(req.body);

    //let retVal = await email + '' +password + '' + name+ '' + sex + '' + role
    genUtil.sendJsonResponse(res, 200, 'posted', retVal.args );


});

//
// router.post('/sinup', async (req, res, next) => {
//     let user = req.session.user;
//     let retVal = await userHelper.createUserInDatabase(user, req.body);
//     genUtil.sendJsonResponse(res, retVal.status ? 201 : 400, retVal.message, retVal.args.user)
// });

router.post('/login', async (req, res, next) => {
    let email = req.body.email  ;
    let password = req.body.password ;
    let retVal =  email + ''+ password;
    genUtil.sendJsonResponse(res, 200, 'success', {email:email, password:password} );


});



router.get('/verify_email', async(req, res, next) =>{
    let email = req.query.email ;
    retVal = email
    genUtil.sendJsonResponse(res, 200, 'success', {email: retVal} );

});

router.get('/email_confirmation', async(req, res, next) =>{


});

router.get('/password_reset', async(req, res, next)=>{

});

router.post('/password_reset', async(req, res, next) => {

});

module.exports = router;


