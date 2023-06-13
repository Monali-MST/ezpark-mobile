const express = require('express')
const router = express.Router()

const test = require('../mob_app_functions/test/test')
const user_reg = require('../mob_app_functions/user_reg/user_reg')
const vehicle_reg = require('../mob_app_functions/user_reg/vehicle_reg')
const email_val = require('../mob_app_functions/user_reg/email_val')
const user_login = require('../mob_app_functions/user_login/user_login')
const slot_ret = require('../mob_app_functions/booking/slot_display')
const fetch_vehicles = require('../mob_app_functions/booking/fetch_vehicles')
const fetch_discounts = require('../mob_app_functions/booking/fetch_discounts')
const fetch_bookings = require('../mob_app_functions/my_bookings/fetch_bookings')

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

//__________Email validation when signup__________
router.post('/emailValidation' , (req,res,next)=>{
    email_val(req, res);
})

//__________Email validation when login__________
router.post('/userLogin' , (req,res,next)=>{
    user_login(req, res);
})

//__________Booket slot retrive when booking__________
router.post('/slotBooking' , (req,res,next)=>{
    slot_ret(req,res);
})

//__________Vehicle fetch when booking__________
router.post('/fetchVehicles', (req,res,next)=>{
    fetch_vehicles(req,res);
})

//__________Available discounts fetch when booking__________
router.post('/fetchDiscounts', (req,res,next)=>{
    fetch_discounts(req,res);
})

//__________Fetch current and future bookings__________
router.post('/fetchBookings', (req,res,next)=>{
    fetch_bookings(req,res);
})

module.exports = router;