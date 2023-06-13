var connection = require('../../service/connection');

module.exports = async function fetch_bookings(req, res) {
    const query = "SELECT BookingID, BookedDate, StartTime, EndTime, VehicleNo, slot FROM ezpark.booking WHERE user_email=(?)";

    const value = req.body.userName;

    const returnData = [];

    connection.query(query, value, (err, data) => {
        if (err) {
            return res.json(err);
        } else if (data != 0) {
            data.forEach(element => {
                if (element.slot > 42) {
                    returnData.push({ Date: element.BookedDate, StartTime: element.StartTime, EndTime: element.EndTime, VehicleNo: element.VehicleNo, Slot: "D-" + (element.slot - 42), BookingID:element.BookingID })
                    // console.log("D-"+(element.slot-42));
                } else if (element.slot > 28) {
                    console.log("C-" + (element.slot - 28));
                    returnData.push({ Date: element.BookedDate, StartTime: element.StartTime, EndTime: element.EndTime, VehicleNo: element.VehicleNo, Slot: "C-" + (element.slot - 28), BookingID:element.BookingID })
                } else if (element.slot > 14) {
                    // console.log("B-" + (element.slot - 14));
                    returnData.push({ Date: element.BookedDate, StartTime: element.StartTime, EndTime: element.EndTime, VehicleNo: element.VehicleNo, Slot: "B-" + (element.slot - 14), BookingID:element.BookingID})
                } else {
                    // console.log("A-" + element.slot)
                    returnData.push({ Date: element.BookedDate, StartTime: element.StartTime, EndTime: element.EndTime, VehicleNo: element.VehicleNo, Slot: "A-" + element.slot, BookingID:element.BookingID})
                }
            });
            return res.json(returnData);
        } else {
            return res.json("No bookings");
        }
    })
}