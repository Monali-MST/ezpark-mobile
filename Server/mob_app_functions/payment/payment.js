var connection = require("../../service/connection");
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = async function payment(req, res) {
    console.log(req.body.amount);
    const customer = await stripe.customers.create({
        "email": req.body.userName
    });
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            customer: customer.id,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return res.json({paymentIntent: paymentIntent.client_secret, customer: customer.id});
    }catch(err){
        console.log(err);
        return res.json(100);
    }
};