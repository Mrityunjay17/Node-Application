const {getBanner}=require("./../model/GetBanner.mjs"); 
const fs =require("fs");

/**
 * @function getId()
 * @returns {string} it's return String unique id 
 */
function getId(){
    return Math.random().toString(35).substr(2, 10);
}

var generateBanner = function(text,callBack){
    if(callBack==undefined){
        callBack=function(){};
    }
    getBanner(text,(error,bannerText)=>{
        if(error!=undefined){
            callBack(error,undefined);
            return;
        }
        var fileId=getId();

        fs.writeFile(`${__dirname}/../Banners/${fileId}.txt`,bannerText,(error)=>{
            if(error!=undefined){
                callBack(error,undefined);
                return;
            }
            callBack(error,`/Banners/${fileId}.txt`);
        });
    });
};

//generateBanner("hello");
module.exports.generateBanner=generateBanner;