const request=require('request');

const boredapi=(callback) => {
    const url='http://www.boredapi.com/api/activity/';
   
    request({url, json:true}, (error, {body}={}) => {
        if(error){
      callback("Unable to connect to bored API service", undefined)
        }else if(body.error){
       callback("Unable to find any activity", undefined)
        }else{
        callback(undefined, {
            activity: body.activity,
            type: body.type,
            participants: body.participants
        })
        }
    })

}

module.exports=boredapi;