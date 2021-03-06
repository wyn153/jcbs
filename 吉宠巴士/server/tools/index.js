const Core = require('@alicloud/pop-core');
const jwt = require("jsonwebtoken");
const tencentcloud = require("tencentcloud-sdk-nodejs");
module.exports = {
    sendMsg(tel, code){
        const SmsClient = tencentcloud.sms.v20190711.Client;
        const clientConfig = {
            credential: {
                secretId: "AKID5oLbaPUAzKWYSCrZJyYvW0GOsChLi8LZ",
                secretKey: "KgeNq2MPziBdopgV9PVRQtBd2iRya6MT",
            },
            region: "",
            profile: {
                httpProfile: {
                    endpoint: "sms.tencentcloudapi.com",
                },
            },
        };
        const client = new SmsClient(clientConfig);
        const params = {
            "PhoneNumberSet": [
                "+86" + tel
            ],
            "TemplateID": "881527",
            "Sign": "爱code爱生活",
            "TemplateParamSet": [
                "" + code
            ],
            "SmsSdkAppid": "1400489828"
        };
        return new Promise((resolve,reject)=>{
            client.SendSms(params).then(data => {
                console.log(data);
                resolve(JSON.stringify(data))
            }, err => {
                console.error("error", err);
                reject(err)
            })
        })
    },
    // sendMsg(tel, code) {
    //     var client = new Core({
    //         accessKeyId: 'LTAI4GHsvUyWBB9YBMfHbHk6',
    //         accessKeySecret: 'Om5GaHNITnjphhehT0lh4uL5ASnXJ2',
    //         endpoint: 'https://dysmsapi.aliyuncs.com',
    //         apiVersion: '2017-05-25'
    //     });

    //     var params = {
    //         "RegionId": "cn-hangzhou",
    //         "PhoneNumbers": tel,
    //         "SignName": "爱code爱生活",
    //         "TemplateCode": "SMS_203728335",
    //         "TemplateParam": `{"code":${code}}`
    //     }

    //     var requestOption = {
    //         method: 'POST'
    //     };

    //     return new Promise((resolve,reject)=>{
    //         client.request('SendSms', params, requestOption).then((result) => {
    //             resolve(JSON.stringify(result));
    //         }, (ex) => {
    //             reject(ex);
    //         })
    //     })
    // },
    verify(token){
        return new Promise((resolve, reject)=>{
            jwt.verify(token, "学IT，请拨打17600901915", (err, data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }
}


// o.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTFhMTdlZGEwLTgwYWYtMTFlYi1hZmJjLTcxMTJlYWJmN2NmOSIsImlhdCI6MTYxNTM2NTI2OCwiZXhwIjoxNjE1MzY3MDY4fQ.2yEIP4BlvOpsb_gC2PeU2yxLHB-8Yox6tJcHtNnOwtU").then(result=>{
//     console.log(result)
// }).catch(err=>{
//     console.log(err)
// })

// 发送短信工具的调用方式

// tools.sendMsg(17600901915, 6243).then((result)=>{
// }).catch((err)=>{
// })