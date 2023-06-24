var connection = require('../../service/connection');//Connect to the database

module.exports = async function slot_display(req, res) {
    const query1 = "SELECT slot from ezpark.booking WHERE cancel=0 AND BookedDate=(?) AND (slot>(?) AND slot<(?)) AND ((StartTime>=(?) AND StartTime<=(?)) OR (EndTime>=(?) AND EndTime<=(?)) OR (StartTime<(?) AND EndTime>(?)));"

    const query2 = "SELECT slot_type, Enability, slot_price from ezpark.slot WHERE slot_id>(?) AND slot_id<(?);"

    const query3 = "SELECT slot from ezpark.temp_booking WHERE BookedDate=(?) AND (slot>(?) AND slot<(?)) AND ((StartTime>=(?) AND StartTime<=(?)) OR (EndTime>=(?) AND EndTime<=(?)) OR (StartTime<(?) AND EndTime>(?)));"

    const values1 = [req.body.date, req.body.firstSlot, req.body.endSlot, req.body.fromTime, req.body.toTime, req.body.fromTime, req.body.toTime, req.body.fromTime, req.body.toTime];

    const values2 = [req.body.firstSlot, req.body.endSlot];

    const bookedSlots = [];
    const tempBookedSlots = [];
    const slotTypes = [];
    const enability = [];
    const price = [];
    const returnData = [];

    try {
        const data1 = await queryAsync(query1, values1);
        data1.forEach(element => {
            bookedSlots.push(element.slot);
        });

        const data3 = await queryAsync(query3, values1);
        data3.forEach(element => {
            tempBookedSlots.push(element.slot);
        });
    
        const data2 = await queryAsync(query2, values2);
        data2.forEach(element => {
          slotTypes.push(element.slot_type);
          enability.push(element.Enability);
          price.push(element.slot_price);
        });
        let j=0;
        for (let i = (values2[0]+1); i < values2[1]; i++) {
          if (bookedSlots.includes(i) || tempBookedSlots.includes(i)) {
            returnData.push({ SlotNo: (i-values2[0]), Type: slotTypes[(i-values2[0]) - 1], Enability:enability[(i-values2[0])-1], Price:price[j], booked: 1 });
          } else {
            returnData.push({ SlotNo: (i-values2[0]), Type: slotTypes[(i-values2[0]) - 1], Enability:enability[(i-values2[0])-1], Price:price[j], booked: 0 });
          }
          j++;
        }
        return res.json(returnData);
      } catch (error) {
        return res.json(error);
      }
    };

    // Helper function to wrap connection.query in a promise
    function queryAsync(query, values) {
      return new Promise((resolve, reject) => {
        connection.query(query, values, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }