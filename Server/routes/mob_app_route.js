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
const temp_booking = require('../mob_app_functions/booking/temp_booking')
const mobile_otp_send = require('../mob_app_functions/otp/mobile_otp_send')
const mobile_otp_check = require('../mob_app_functions/otp/mobile_otp_check')
const email_otp_send = require('../mob_app_functions/otp/email_otp_send')
const email_otp_check = require('../mob_app_functions/otp/email_otp_check')
const booking_history = require('../mob_app_functions/history/booking_history')
const mobile_resend = require('../mob_app_functions/otp/mobile_resend')
const email_resend = require('../mob_app_functions/otp/email_resend')
const change_password = require('../mob_app_functions/change_password/change_password')


//__________Server test__________
router.get('/test', (req, res, next) => {
    test(req, res);
})

//__________User register__________
router.post('/user', (req, res, next) => {
    user_reg(req, res);
})

//__________Vehicle register__________
router.post('/vehicle', (req, res, next) => {
    vehicle_reg(req, res);
})

//__________Email validation when signup__________
router.post('/emailValidation', (req, res, next) => {
    email_val(req, res);
})

//__________Email validation when login__________
router.post('/userLogin', (req, res, next) => {
    user_login(req, res);
})

//__________Booked slot retrive when booking__________
router.post('/slotBooking', (req, res, next) => {
    slot_ret(req, res);
})

//__________Vehicle fetch when booking__________
router.post('/fetchVehicles', (req, res, next) => {
    fetch_vehicles(req, res);
})

//__________Available discounts fetch when booking__________
router.post('/fetchDiscounts', (req, res, next) => {
    fetch_discounts(req, res);
})

//__________Fetch current and future bookings__________
router.post('/fetchBookings', (req, res, next) => {
    fetch_bookings(req, res);
})

//__________Insert booking details to temporary booking table__________
router.post('/tempBooking', (req, res, next) => {
    temp_booking(req, res);
})

//__________Sdnd OTP to Mobile__________
router.post('/sendOtpMob', (req, res, next) => {
    mobile_otp_send(req, res);
})

//__________Check Mobile OTP__________
router.post('/checkOtpMob', (req, res, next) => {
    mobile_otp_check(req, res);
})

//__________Send OTP to Email__________
router.post('/sendOtpMail', (req, res, next) => {
    email_otp_send(req, res);
})

//__________Check Mobile OTP__________
router.post('/checkOtpMail', (req, res, next) => {
    email_otp_check(req, res);
})

//__________Resend OTP to Mobile__________
router.post('/mobOtpResend', (req, res, next) => {
    mobile_resend(req, res);
})

//__________Resend OTP to Email
router.post('/mailOtpResend', (req, res, next) => {
    email_resend(req, res);
})

//__________Fetch booking history__________
router.post('/bookHistory', (req, res, next) => {
    booking_history(req, res);
})

//__________Change password__________
router.post('/changePassword', (req, res, next) => {
    change_password(req, res);
})

module.exports = router;