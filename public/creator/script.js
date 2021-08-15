let ad = $('#analy')
let pend = $('#pend')
let paid = $('#paid')
let comp = $('#comp')
let mypay = $('#mypay')
let myMoney = $('#fetchAdSense')

let adsense = $('.adsense')
let pending = $('.pendingReq')
let paymentDone = $('.paidReq')
let completed = $('.completedReq')
let payHistory = $('.payHistory')
let payMoney = $('#money')

hideAll();
adsense.show()

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
        else if(data.user.userGroup != 'creator'){
            alert('Not Authorized! Please login with a creator account')
            document.location.href = '/root/login'
        }
        else{
            console.log("Welcome" + data.user.username);
            $('#login123')
                .text(data.user.username)
                .attr("href","#")
            $("#logout").show();
        }
    });

    // $("#logout").on('click',function(){
    //     $.get("/root/logout",(data)=>{
    //         if(data=='Success'){
    //         }
    //     });
    // });

    $.getJSON('credentials.json', function(cred){
        console.log(cred.web.client_id)
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id:""});
        });
    })

    
    ad.on('click',()=>{
        hideAll();
        adsense.show();
    })
    pend.on('click',()=>{
        hideAll();
        pending.show();
    })
    paid.on('click',()=>{
        console.log("Show paid ")
        hideAll();
        paymentDone.show();
    })
    comp.on('click',()=>{
        hideAll();
        completed.show();
    })
    mypay.on('click',()=>{
        hideAll();
        payHistory.show();
    })
    myMoney.on('click',()=>{
        hideAll();
        adsense.show();
        payMoney.show();
    })
})

function hideAll()
{
    adsense.hide();
    pending.hide();
    paymentDone.hide();
    completed.hide();
    payHistory.hide();
    payMoney.hide();
}

function plotHistogram(dates, views, subscribersGained) {

    let myChart = document.getElementById('myChart').getContext('2d')
    let histogram = new Chart(myChart, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [
                {label: 'Views', data: views, backgroundColor: 'purple'},
                {label: 'Subscribers', data: subscribersGained, backgroundColor: 'red'}
            ]
        },
        options: {}
    })
}

function authYtAnalytics() {
    return gapi.auth2.init({client_id:"805748317470-j5o5ehvhbt320iptvo81ct2ok82kd0in.apps.googleusercontent.com"})
        .signIn({scope: "https://www.googleapis.com/auth/yt-analytics.readonly"})
        .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}

function authAdSense() {
    return gapi.auth2.init({client_id:"805748317470-j5o5ehvhbt320iptvo81ct2ok82kd0in.apps.googleusercontent.com"})
        .signIn({scope: "https://www.googleapis.com/auth/adsense https://www.googleapis.com/auth/adsense.readonly"})
        .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}

function loadClientYtAnalytics() {
    return gapi.client.load("https://youtubeanalytics.googleapis.com/$discovery/rest?version=v2")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

function loadClientAdSense() {
    gapi.client.setApiKey("AIzaSyCm1tGvJ9wzhYtdFWE28fEs5jhjxHXHKXg");
    return gapi.client.load("https://adsense.googleapis.com/$discovery/rest?version=v2")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

function executeYtAnalytics(startDate, endDate) {
    return gapi.client.youtubeAnalytics.reports.query({
    "ids": "channel==MINE",
    "startDate": startDate,
    "endDate": endDate,
    "metrics": "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",
    "dimensions": "day",
    "sort": "day"
    })
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response.result)
            let res = response.result
            let views = []
            let subscribersGained = []
            let dates = []
            let arrLen = res["rows"].length
            let cnt = 0;
            res["rows"].forEach((arr) => {
                dates.push(arr[0])
                views.push(arr[1])
                subscribersGained.push(arr[5])
                cnt++;
                if(cnt == arrLen)
                    plotHistogram(dates, views, subscribersGained)
            })
        },
        function(err) { console.error("Execute error", err); 
    });
}

function executeAdSense(accName) {
    let parentVal = "accounts/" + accName
    return gapi.client.adsense.accounts.payments.list({
        "parent": parentVal
    })
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        // console.log("Response", response.result);
        let res = response.result;
        let arr = res["payments"];
        $('#unPaid').val(arr[0].amount)
        $('#lastPayment').val(arr[1].amount)
    },
    function(err) { console.error("Execute error", err); });
}

$("#fetchYtAnalytics").on('click',()=>{
    let startDate = $('#startDate').val()
    let endDate = $('#endDate').val()
    authYtAnalytics().then(()=>{
        loadClientYtAnalytics().then(()=>{
            executeYtAnalytics(startDate, endDate)
        })
    })
})

$('#fetchAdSense').on('click',()=>{
    let accName = $('#accName').val();
    authAdSense().then(()=>{
        loadClientAdSense().then(()=>{
            executeAdSense(accName)
        })
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