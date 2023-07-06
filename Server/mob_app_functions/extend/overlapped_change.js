var connection = require('../../service/connection');

module.exports = async function overlapped_change(req, res){
    const values = [req.body.slot, req.body.bookingId];
    const query = "UPDATE `ezpark`.`booking` SET `slot` = (?), `overlapped` = '0' WHERE (`BookingID` = (?));";

    connection.query(query, values, (err, date)=> {
        if(err){
            console.log(err);
            return res.json(100);
        }else{
            return res.json(200);
        }
    })
}