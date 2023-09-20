var connection = require('../../service/connection');

module.exports = async function temp_booking(req,res){
    const query="INSERT INTO `ezpark`.`temp_booking` (`BookedDate`, `StartTime`, `EndTime`, `VehicleNo`, `BookingMethod`, `slot`, `user_email`) VALUES ((?), (?), (?), (?), (?), (?), (?));";

    const values=[
        req.body.Date,
        req.body.StartTime,
        req.body.EndTime,
        req.body.VehicleNo,
        req.body.BookingMethod,
        req.body.slot,
        req.body.user_email
    ]

    connection.query(query, values, (err, data)=>{
        if(err){
            console.log(err);
            return res.json(100); //Return 200 when error inserted occured
        }else{

            const bookingID = data.insertId; //Get ID generted for last row

            //Delete inserted data after 5 min
            setTimeout(() => {
                const deleteQuery = "DELETE FROM `ezpark`.`temp_booking` WHERE `BookingID` = ?";
                connection.query(deleteQuery, bookingID, (err) => {
                  if (err) {
                    console.error(err);
                  }
                });
              }, 5 * 60 * 1000); 

            return res.json(200);//Return 200 when data inserted successfully
        }
    })
}