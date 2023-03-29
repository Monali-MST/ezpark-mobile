const express = require('express')
const router = express.Router()

const user_reg = require('../mob_app_functions/user_reg/user_reg')
const vehicle_reg = require('../mob_app_functions/user_reg/vehicle_reg')
const email_val = require('../mob_app_functions/user_reg/email_val')


router.post('/user' , (req,res,next)=>{
    user_reg(req, res);
})

router.post('/vehicle' , (req,res,next)=>{
    vehicle_reg(req, res);
})

router.post('/emailValidation' , (req,res,next)=>{
    email_val(req, res);
})

module.exports = router;