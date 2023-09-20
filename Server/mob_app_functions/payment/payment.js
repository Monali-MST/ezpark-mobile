var connection = require("../../service/connection");
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = async function payment(req, res) {
    const customer = await stripe.customers.create({
        "email": req.body.userName
    });
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            customer: customer.id,
            currency: 'usd'
        });

        return res.json({paymentIntent: paymentIntent.client_secret, customer: customer.id});
    }catch(err){
        console.log(err);
        return res.json(100);
    }
};