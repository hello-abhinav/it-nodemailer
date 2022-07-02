require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Static folder
app.use(express.static("public"));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

app.post("/send", function(req,res){
  const output = `
    You have a new contact request
    Contact Details
      Name: ${req.body.fname} ${req.body.lname}
      Email: ${req.body.email}
      Program: ${req.body.cname}
      Phone: ${req.body.contact}
    Query
    ${req.body.message}
  `;

  // console.log(output);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Contact Details`,
    text:output
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log("Email sent!!!");
      res.json("Email sent!!");
    }
  });
});

app.listen(3000, () => console.log('Server started...'));