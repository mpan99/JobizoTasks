var CronJob= require('cron').CronJob;
/*
 * 
 */
// '*/5 * * * * *'


const scheduleTask= function(){
    const scheduler=new CronJob('55  * * *',()=>{
        console.log('Task Executed');
    },
    {
        scheduled:true,
        timezone: "India Standard Time"
    },

    );
    // console.log('Inside cronSchedules');
    return scheduler;
}

module.exports= scheduleTask