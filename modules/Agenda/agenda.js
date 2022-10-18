const Agenda = require('agenda');
const dbString= require('../../config/env-files/development.json').dbConectionString;
const User= require('../user/user.model');
const emailClient= require('../mailer/mailer');
const { date } = require('@hapi/joi');

const agenda = new Agenda({ db: { address: dbString } });

agenda.define("delete old users", async (job) => {
    await User.remove({ date: { $lt: oneMinuteAgo } , city:'Pune'});
  });


agenda.define(`send email`, {priority: 'high', concurrency: 10}, async (job) => {
    const to = job.attrs.data.to || 'mukul.p@antino.io';
    console.log('Inside agenda define::');
    emailClient().sendMail({
        to,
        from: 'mukul2299pandit@gmail.com',
        subject: `Reminder`,
        body: 'Email Recieved '+date
    },function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log(info.response);
        }
    });
    
});

const sendEmailReport=async function (req,res,next) {
    try{
        // let names= ['in ',toString(x),' minutes']
        console.log('Inside: agenda ');
        const email= req.body.email;
        await agenda.start();
        agenda.schedule('in 1 minutes', `send email`,{to:email}).then(()=>{
            agenda.schedule('in 3 minutes',`send email`,{to:email}).then(()=>{
                agenda.schedule('in 5 minutes',`send email`,{to:email}).then(()=>{
                    next();
                })
            })
        })
        console.log('Ending:agenda');

    }
    catch(err){
        console.log(err);
    }
}

module.exports=sendEmailReport

//   (async function () {
//     await agenda.start();
//     await agenda.every("3 minutes", "delete old users");
//   })();
//   
