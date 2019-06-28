var nodemailer = require('nodemailer');
var mailGun = require('nodemailer-mailgun-transport');

const auth={
    auth:{
        api_key : '346d02496ae2756ed1b7afe3f3a616ae-7bce17e5-45d09df7',
        domain : 'sandboxcb3139f7f5524345a3983994c050b6c0.mailgun.org'
    }
};
const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email,subject,text,cb)=>{
    const mailOption = {
        from:email,
        to:'kvisionclasses@gmail.com',
        subject,
        text
    };
    transporter.sendMail(mailOption,function(err,data){
        if(err)
        cb(err,null);
        else
        cb(null,data);

        
    });
};

module.exports = sendMail;
