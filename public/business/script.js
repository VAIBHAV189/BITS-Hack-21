// $("#logout").hide();
//     $.get('/users/profile',(data)=>{
//         if(data.username==undefined){
//             alert("Please Login");
//             document.location.href='/login';
//         }
//         else if(data.category!="admin"){
//             alert("Not Authorized");
//             document.location.href = '/';
//         }
//         else{
//             console.log("Welcome " + data.username);
//             $('#login123')
//                 .text(data.username)
//                 .attr("href","#")
//             $("#logout").show();
//             viewusers();
//         }
//     });