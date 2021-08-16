let accReq = $('#accReq')
let compReq = $('#compReq')
let pays = $('#pays')
let newReq = $('#newReq')

let accReqDiv = $('.acceptedReq')
let compReqDiv = $('.completedReq')
let paysDiv = $('.payHistory')  
let newReqForm = $('.newReqForm')

function hideAll()
{
    accReqDiv.hide();
    compReqDiv.hide();
    paysDiv.hide();
    newReqForm.hide();
}

hideAll();
newReqForm.show();
$("#logout").hide();

$(()=>{

    $.get('/root/profile', (data)=>{
        // console.log('Hello');
        if(data == undefined){
            alert('Please Login')
            document.location.href = '/root/login'
        }
        else if(data.user == undefined){
            alert('Please Login')
            document.location.href = '/root/login'
        }
        else if(data.user.username == undefined){
            alert('Please Login')
            document.location.href = '/root/login'
        }
        else if(data.user.userGroup != 'promoter'){
            alert('Not Authorized! Please login with a promoter account')
            document.location.href = '/root/login'
        }
        else{
            // console.log("Welcome" + data.user.username);
            $('#login123')
                .text(data.user.username)
                .attr("href","#")
            $("#logout").show();
        }
    });

    // $("#logout").on('click',function(){
    //     $.get("/root/logout",(data)=>{
    //     });
    // });

    accReq.on('click',()=>{
        hideAll();
        accReqDiv.show();
    })
    newReq.on('click',()=>{
        hideAll();
        newReqForm.show();
    })
    compReq.on('click',()=>{
        hideAll();
        compReqDiv.show();
    })
    pays.on('click',()=>{
        hideAll();
        paysDiv.show();
    })
})


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