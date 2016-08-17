var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport

// setting account and password
var transporter = nodemailer.createTransport('smtps://plashODD%40gmail.com:asdfghnbvcxz@smtp.gmail.com');

module.exports =
{
    Email_sender:function(database,table,duration)
    {
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: ' "ODD warning system"<plashODD@gmail.com> ', // sender address
            to: 'gg1420000@gmail.com', // list of receivers
            subject: '[ODD] No data input to (database: '+database+'        table: '+table+') for '+duration+' seconds', // Subject line
            //text: 'test test 🐴', // plaintext body
            html: '<b>Data flow warning email</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    }
}