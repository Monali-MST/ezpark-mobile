var connection = require('../../service/connection');

module.exports = async function booking_history(req,res){

    const query="    SELECT b.BookingID, b.BookedDate, b.StartTime, b.EndTime, b.VehicleNo, b.slot, b.cancel, p.PaymentAmount, r.Refund_amount FROM `ezpark`.`payment_details` p JOIN `ezpark`.`booking` b ON  p.Booking_id=b.BookingID LEFT JOIN `ezpark`.`refund_details` r ON b.BookingID=r.Booking_id WHERE b.user_email=(?) && (b.vehicle_removed=1 || b.cancel=1); ";

    const values = [req.body.UserName];

    connection.query(query, values, (err, data)=>{
        if(err){
            return res.json(100);
        }else {
            if(data != 0){
                return res.json(data);
            }else{
                return res.json(404);
            }
        } 
    })
}