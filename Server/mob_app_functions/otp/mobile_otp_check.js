var connection = require('../../service/connection');

module.exports = async function mobile_otp_check(req, res) {
    const query = "SELECT otp_val FROM ezpark.otp WHERE identifier=(?);";

    const value = [req.body.MobNum];
    const otp = [req.body.OTP];

    connection.query(query, value, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(100);
        } else if (data.length != 0) {
            if (data[0].otp_val == otp) {
                return res.json(200)
            } else {
                return res.json(300)
            }
        } else {
            return res.json(404)
        }
    })
}