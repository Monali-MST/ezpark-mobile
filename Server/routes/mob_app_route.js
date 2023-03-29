const express = require('express')
const router = express.Router()

const test = require('../mob_app_functions/test/test')
const user_reg = require('../mob_app_functions/user_reg/user_reg')
const vehicle_reg = require('../mob_app_functions/user_reg/vehicle_reg')
const email_val = require('../mob_app_functions/user_reg/email_val')

//__________Server test__________
router.get('/test' , (req,res,next)=>{
    test(req, res);
})

//__________User register__________
router.post('/user' , (req,res,next)=>{
    user_reg(req, res);
})

//__________Vehicle register__________
router.post('/vehicle' , (req,res,next)=>{
    vehicle_reg(req, res);
})

//__________Email validation when login__________
router.post('/emailValidation' , (req,res,next)=>{
    email_val(req, res);
})

module.exports = router;