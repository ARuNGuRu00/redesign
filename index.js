
/* send mail */

function ran_Num(){
    return(Math.floor(Math.random()*9)+1);
}
var otpNum="";
function otp(){
    ar=[ran_Num(),ran_Num(),ran_Num(),ran_Num(),ran_Num(),ran_Num()];
    otpNum="";
    for (i of ar){
        otpNum+=i;
    }
    return otpNum;
}

function send(val){
    const massages={
        email:val,
        code: otp()
    } ;
    emailjs.send('service_ysvss7k','template_mndvdtf',massages).then(function (response){
        console.log('sucess!',response.status,response.text);
    },function(error){
        console.log('fail');
    })
    return 0;
}

var username2='';
var username1='';
var password1='';
var password2="";
var phase1=0;
var phase2=0;
function getDetails(val){
    if (username1==="" && username2===''){
        username1=val;
        bot_win("ReEnter the username for comformation");
    }
    else if (username2==="" && username1!==""){
        username2=val;
        if(username1===username2){
            bot_win(`get username as "${username1}"`);
            username2="";
            phase1=0;
            phase2=1;
            bot_win("Enter password");
        }
        else{
            bot_win("Incorrect Entry");
            bot_win("Do you what to reEnter username[Yes/No]");
        }
    }
    else if(val==="y" || val==="yes"){
        username1="";
        username2='';
        bot_win("Enter Username");
    }
    else if(val==="no" || val==="n"){
        phase1=0;
        username1="";username2="";
        bot_win("how can i help you?");
    }
    
}


async function getPhase2(val){
    if (password1==="" && password2===''){
        password1=val;
        bot_win("ReEnter the password for comformation");
    }
    else if (password2==="" && password1!==""){
        password2=val;
        if(password1===password2){
            password2="";
            bot_win("Comformation successfull!");
            bot_win("Account created you can now Check In")
            phase2=0;
            await sleep(2000);
            window.location.replace = "checkIn.html";
        }
        else{
            bot_win("Incorrect password conformation");
            bot_win("Do you what to reEnter password[Yes/No]");
        }
    }
    else if(val==="y" || val==="yes"){
        password1="";password2='';
        bot_win("Enter password");
    }
    else if(val==="no" || val==="n"){
        phase2=0;
        password1="";password2='';
        bot_win("how can i help you?");
    }
    
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function verify(val){
    var c_otp=val;
    if (c_otp === otpNum){
        bot_win("Enter username");
        phase1=1;
        join_gate=0;
    }
    else{
        bot_win("Incorrect");
    }
    
}

/* completed*/
let on_status=1;
function chat(){
    document.getElementById('bot').style="bottom:0vh;opacity:1;";
    if (on_status===1){
        bot_win("how can i help you");
        on_status=0;
    }
}

function checkfor(val){
    if (val.indexOf('@') !== -1 && join_gate===1){
        console.log(val);
        send(val);
        bot_win("check your mail and enter your verification code.");
    }
    else if(join_gate===1 && val.length===6){
        console.log(otpNum);
        verify(val);
    }
    else if(phase1===1){
        getDetails(val);
    }
    else if(phase2===1){
        getPhase2(val);
    }
    else{
        bot_win("can not understand your content.");
    }
}
let join_gate=0;
function win(types){
    let item2=document.createElement("div");
    let val=document.getElementById("search").value;
    item2.className="win";
    item2.innerHTML=`<div class='content'>${val}</div>`;
    document.querySelector('.chat-win').appendChild(item2);
    checkfor(val);
    document.getElementById("search-form").reset();
    /*document.getElementById('search-form').innerHTML=`<input type="${types}" id="search" required>`;*/
    bottom_focus();
}


function bot_win(con){
    let item2=document.createElement("div");
    item2.className="bot-win";
    item2.innerHTML=`<div class='content'>${con}</div>`;
    document.querySelector('.chat-win').appendChild(item2);
    bottom_focus();
}

function down(){
    document.getElementById('bot').style="bottom:-78vh;opacity:0.4;"
}

function join_function(){
    on_status=0;
    chat();
    join_gate=1;
    bot_win("Enter your Email id to create an account");
    /*document.getElementById('search-form').innerHTML=`<input type="email" id="search" required>`;*/
    
}


function bottom_focus(){
    var contentDiv = document.getElementById("chat-win");
    contentDiv.scrollTop = contentDiv.scrollHeight;
}

