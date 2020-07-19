var request = require('request')

var requestData = ["a","B"]
// request({
//     url:"http://47.100.255.40:8000/projects/test/",
//     method:"post",
//     data:{
//         values:{
//             llz:100
//         }
//     }
// },function (error,response,data) {
//         if(!error&&response.statusCode == 200){
//             console.log(response)
//         }
//         else{
//             console.log(response.statusCode)
//         }
//     }
// );
// request("http://47.100.255.40:8000/projects/test/",function (err,response,body) {
//     if(!err&&response.statusCode == 200){
//         console.log(body)
//     }
// })
request.post({
    url: "http://47.100.255.40:8000/projects/test/",
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    form:{key:'va111lue'}
}, function(error, response) {
    if (!error && response.statusCode == 200) {
        console.log(response.body)
    }
})
