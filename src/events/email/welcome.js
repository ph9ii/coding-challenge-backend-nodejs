// @ts-check

const nodemailer = require('nodemailer');

/**
 * Send verification email
 *
 */
module.exports.sendVerificationEmail = (user) => {
	// Send the email
    
    // const transporter = nodemailer.createTransport({ 
    //     service: 'Sendgrid', 
    //     auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } 
    // });
    // const mailOptions = { 
    // 	from: 'no-reply@yourwebapplication.com', 
    //     to: user.email, subject: 'Account Verification Token', 
    //     text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' 
    // };
    // transporter.sendMail(mailOptions, (err) => {
    //     if (err) { return res.status(500).send({ msg: err.message }); }
    //         res.status(200).send('A verification email has been sent to ' + user.email + '.');
    // });
}