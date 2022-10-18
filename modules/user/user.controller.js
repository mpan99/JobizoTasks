const userService = require("../user/user.services");
const User = require("../user/user.model");
const transporter = require("../mailer/mailer");
const email = require("../../config/env-files/development.json").EMAIL;
var nodemailer = require("nodemailer");
const scheduleTask= require('../cron/cronSchedules')
var CronJob= require('cron');



const userController = {
    
    // scheduleTask:(req,res)=>{
    //     const scheduledTask= scheduleTask();
        
    //     scheduledTask.start();
        
    //     setTimeout(()=>{res.end('Task executed');},120000)
    // },


  createUser: async (req, res) => {
    console.log("Inside userConstroller:: create request");
    const user = await userService.createAUser(req.body);
    res.status(201).json(user);
    // res.redirect('/login');
  },
  getUser:async (req, res) => {
    console.log("Get User");
    const user=await userService.getAUser(req.params);
    console.log(user);
    res.status(200).json(user);
  },
  getUserById:async (req, res) => {
    console.log("with id : ", req.params.id);
    res.send(await userService.getAUserById(req.params.id));
  },
  updateUser:async (req, res) => {
    res.status(200).json(await userService.updateAUserById(req.params.id, req.body));
  },
  deleteUser:async  (req, res) => {
    res.send(await userService.deleteAUser(req.params.id));
  },
  loginUser: async (req, res) => {
    console.log("Inside Login Controller");
    console.log(req.header("auth-token"));
    const response = await userService.loginAUser(
      req.body.email,
      req.body.password,
      req.header("auth-token")
    );

    res.header("auth-token", response.data);
    return response.success
      ? res.status(200).json({
          message: "logged in successfully",
          token: response.data,
        })
      : res.status(401).json(response.data);
  },
  logoutUser: (req, res) => {
    userService.logoutAUser(req);
  },

  uploadFile: (req, res) => {
    console.log("Inside uploadFile");
    try {
      res.send(req.file);
    } catch (err) {
      res.send(400);
    }
  },

  default: async(req,res)=>{
    console.log('Inside default controller');
    res.end('Default API')
  },

  sendMail: async (req, res) => {
    try {
      
            console.log('Inside sendMail');
            const transporter =  nodemailer.createTransport({
                service:'gmail',
                port: 465,
                secure: false,
                auth: {
                    user: "mukul2299pandit@gmail.com",
                    pass: "ygtnrjqrnqpvkqlw"
                }
            });

            var mailOptions = {
                from: 'mukul2299pandit@gmail.com', // sender address
                to: "mukul.p@antino.io", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                  res.send('Email sent: ' + info.response);
                }
              })

            

    
    } catch (err) {
      console.log("Inside MailSender:: ", err);
    }
  },
};

module.exports = userController;
