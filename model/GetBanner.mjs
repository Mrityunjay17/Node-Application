const { exec } = require('child_process');

var getBanner=function(text,callback){

    exec(`banner ${text}`, (error, stdout, stderr) => {
        if (error) {
          callback(error,undefined);
          return;
        }
        callback(error,stdout);
    });
};

module.exports.getBanner=getBanner;
