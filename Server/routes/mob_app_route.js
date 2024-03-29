const express = require('express')
const router = express.Router()

const test = require('../mob_app_functions/test/test');
const user_reg = require('../mob_app_functions/user_reg/user_reg');
const vehicle_reg = require('../mob_app_functions/user_reg/vehicle_reg');
const email_val = require('../mob_app_functions/user_reg/email_val');
const user_login = require('../mob_app_functions/user_login/user_login');
const slot_ret = require('../mob_app_functions/booking/slot_display');
const fetch_vehicles = require('../mob_app_functions/booking/fetch_vehicles');
const fetch_discounts = require('../mob_app_functions/booking/fetch_discounts');
const fetch_bookings = require('../mob_app_functions/my_bookings/fetch_bookings');
const temp_booking = require('../mob_app_functions/booking/temp_booking');
const mobile_otp_send = require('../mob_app_functions/otp/mobile_otp_send');
const mobile_otp_check = require('../mob_app_functions/otp/mobile_otp_check');
const email_otp_send = require('../mob_app_functions/otp/email_otp_send');
const email_otp_check = require('../mob_app_functions/otp/email_otp_check');
const booking_history = require('../mob_app_functions/history/booking_history');
const mobile_resend = require('../mob_app_functions/otp/mobile_resend');
const email_resend = require('../mob_app_functions/otp/email_resend');
const change_password = require('../mob_app_functions/change_password/change_password');
const fetch_refund = require('../mob_app_functions/my_bookings/fetch_refund');
const cancel_refund = require('../mob_app_functions/booking_cancel/cancel_refund');
const cancel_request = require('../mob_app_functions/booking_cancel/cancel_request');
const before_five = require('../mob_app_functions/notification/before_five');
const end_time = require('../mob_app_functions/notification/end_time');
const extend = require('../mob_app_functions/extend/extend');
const slotPrice = require('../mob_app_functions/extend/slotPrice');
const overlapped_change = require('../mob_app_functions/extend/overlapped_change');
const payment = require('../mob_app_functions/payment/payment');
const success_booking = require('../mob_app_functions/booking/success_booking');
const review = require('../mob_app_functions/review/review');
const point = require('../mob_app_functions/dashboard/point');
const badge_upgrade = require('../mob_app_functions/dashboard/badge_upgrade');
const fetch_review = require('../mob_app_functions/dashboard/fetch_review');
const vehicle_manage = require('../mob_app_functions/vehicle_management/vehicle_manage');
const add_vehicle = require('../mob_app_functions/vehicle_management/add_vehicle');
const delete_vehicle = require('../mob_app_functions/vehicle_management/delete_vehicle');
 

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

//__________Fetch refund details__________
router.post('/refundDetails', (req, res, next) => {
    fetch_refund(req, res);
})

//__________Booking cancellation with refund__________
router.post('/cancelRefund', (req, res, next) => {
    cancel_refund(req, res);
})

//__________Booking cancellation with request__________
router.post('/cancelRequest', (req, res, next) => {
    cancel_request(req, res);
})

//__________Notify five minutes before booking end__________
router.post('/notifyBeforeFive', (req, res, next) => {
    before_five(req, res);
})

//__________Notify on booking end time__________
router.post('/notifyOnEnd', (req, res, next) => {
    end_time(req, res);
})

//__________Booking extend__________
router.post('/extend', (req, res, next) => {
    extend(req, res);
})

//__________Fetch slot price__________
router.post('/slotPrice', (req, res, next) => {
    slotPrice(req, res);
})

//__________Change overlapped slots__________
router.post('/changeOverLapped', (req, res, next) => {
    overlapped_change(req, res);
})

//__________Handle Payments__________
router.post('/paymentIntent', (req, res, next) => {
    payment(req, res);
})

//__________Insert date to booking table__________
router.post('/successBooking', (req, res, next) => {
    success_booking(req, res);
})

//__________Insert review and ratings to review_rate table__________
router.post('/review', (req, res, next) => {
    review(req, res);
})

//__________Fetch user points__________
router.post('/point', (req, res, next) => {
    point(req, res);
})

//__________Upgrade user badge__________
router.post('/badgeUpgrade', (req, res, next)=>{
    badge_upgrade(req, res);
})

//__________Fetch reviews to the dashboard__________
router.post('/fetchReview', (req, res, next)=>{
    fetch_review(req, res);
})

//__________Manage vehicles of relevant user__________
router.post('/manageVehicles', (req, res, next)=>{
    vehicle_manage(req, res);
})

//__________Add new vehicle__________
router.post('/addNewVehicle', (req, res, next)=>{
    add_vehicle(req, res);
})

//__________Delete vehicle__________
router.post('/deleteVehicle', (req, res, next)=>{
    delete_vehicle(req, res);
})

module.exports = router;