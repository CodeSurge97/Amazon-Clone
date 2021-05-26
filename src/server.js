const stripe = require('stripe')('sk_test_51IllR0G9dr2kJ8HgPqAY47zODKYw8bjBWv6jKwMayCbwbx5ssrMUGIvEdUBx8oAgTv9UNJwb6tIU7CfjyIwI6zdw00fxe20eP2');

const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static('.'));
app.use(express.json())

const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}))


//use cors to allow cross origin resource sharing
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));



const YOUR_DOMAIN = 'http://localhost:3000/checkout';

const calculateOrderAmount = cartItems => {

  let total = 0;
        cartItems.forEach((item)=>{
            total += (item.product.price * item.product.quantity)
        })
        return total;

};

app.post("/create-payment-intent", async (req, res) => {

  const cartItems = req.body;
  const amount = calculateOrderAmount(cartItems);

  // Create a PaymentIntent with the order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount*100,
    currency: "usd"
  });

  res.send({

    clientSecret: paymentIntent.client_secret,
    amount: amount

  });

});


app.listen(4242, () => console.log('Running on port 4242'));