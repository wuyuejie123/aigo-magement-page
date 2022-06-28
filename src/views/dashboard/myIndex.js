
const  axios =require('axios');
axios.get('http://localhost:22222/pjgo/deviceinfo/list').then(function (response){
    console.log(response);
}).catch(function (error){
    console.log(error);
}).then(function (){});
