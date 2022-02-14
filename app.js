//Check if we are running in production environment or development env
const http = require('http');
const os = require('os');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
// const statusMessage   = process.env.INITIAL_STATUS_MESSAGE || "Welcome to HomeJoy";




const express = require('express');
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

// var requestCount = 0;

app.get('/live', function(req,res) {
  console.log('Liveness probe')
  res.send("You've hit " + os.hostname() + "\n").end();
  res.status(200);

});

app.get('/ready', function(req,res) {
    console.log('Readiness probe')
    res.send("I\'am Ready").end();
    res.status(200);
  
  });

// var handler = function(request, response) {
//   console.log("Received request from " + request.connection.remoteAddress);
//   requestCount++;
//   if (requestCount > 5) {
//     response.writeHead(500);
//     response.end("I'm not well. Please restart me!");
//     return;
//   }
//   response.writeHead(200);
//   response.end("You've hit " + os.hostname() + "\n");
// };

// var www = http.createServer(handler);

app.listen(3000, function () {
    console.log('HomeJoy app listening on port 5000!');
  });

app.get('/welcome', function(req, res) {
    console.log('Printing status message');
    res.send(statusMessage);
});

// app.get('/store', function(req,res){
//     console.log('Accessing store page...');
//     fs.readFile('items.json', function(error, data){
//         if(error){
//             res.status(500).end();
//         }else{
//             res.render('store.ejs', {
//                 stripePublicKey: stripePublicKey,
//                 items: JSON.parse(data)
//             });
//         }
//     });
// });

// app.post('/purchase', function(req,res){
//     fs.readFile('items.json', function(error, data){
//         if(error){
//             res.status(500).end();
//         }else{
//             const itemsJson = JSON.parse(data);
//             const itemsArray = itemsJson.music.concat(itemsJson.merch);
//             let total = 0;
//             req.body.items.forEach(function(item){
//                 const itemJson = itemsArray.find(function(i){
//                     return i.id == item.id;
//                 });
//                 total = total + itemJson.price * item.quantity;
//             });

//             stripe.charges.create({
//                 amount: total,
//                 source: req.body.stripeTokenId,
//                 currency: 'usd'
//             }).then(function(){
//                 console.log('Charge Successful');
//                 res.json({message: 'Successfully purchased items'});
//             }).catch(function(){
//                 console.log('Charge Fail');
//                 res.status(500).end();
//             });
//         }
//     });
// });

app.listen(5000);
