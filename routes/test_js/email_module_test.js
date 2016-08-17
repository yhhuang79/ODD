// var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport();
//
// transporter.sendMail(
//     {
//     from: 'plashodd@nodemailer.com',
//     to: 'gg1420000@gmail.com',
//     subject: 'ODD email module test',
//     //html: '<b>hello world!</b>'
//     text:'test test 1 2 3'
//     },
//     function(err,info)
//     {
//         if(err){
//             console.log(err);
//         }else{
//             console.log('Message sent!');
//         };
//         transporter.close();
//     });



//
// var transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'plashODD@gmail.com', // Your email id
//         pass: 'asdfghnbvcxz' // Your password
//     }
// });
// var text = 'Hello world! This is ODD email test!! motherfucker~~~';
// var mailOptions = {
//     from: 'plashodd@gmail.com>', // sender address
//     to: 'gg1420000@gmail.com', // list of receivers
//     subject: 'ODD email test', // Subject line
//     text: text //, // plaintext body
//     // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
// };
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Message sent: ' + info.response);
//     };
// });


var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://plashODD%40gmail.com:asdfghnbvcxz@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: ' "ODD warning system"<plashODD@gmail.com> ', // sender address
    to: 'gg1420000@gmail.com', // list of receivers
    subject: 'No data input to table XXX for OOO seconds', // Subject line
    //text: 'test test 🐴', // plaintext body
    html: '<b>Test Email system</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
