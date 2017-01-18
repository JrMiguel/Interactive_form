// variables
var jobs = document.getElementById("title");
var design = document.getElementById("design");
var color = document.getElementById("color");
var activities = document.getElementsByClassName("activities")[0];
var submitButton = document.getElementById("submit-form");
var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var email = document.getElementById("mail");
var userName = document.getElementById("name");
var register = document.getElementById("register");
var zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/; 
var zip = document.getElementById("zip"); 
var cvv = document.getElementById("cvv"); 
var ccInput = document.getElementById("cc-num"); 
var cc = document.getElementById("credit-card");
var pp = document.getElementById("paypal");
    pp.style.display = "none";
var bc = document.getElementById("bitcoin");
    bc.style.display = "none"; 
var pmtMethod = document.getElementById("payment");
var colorDiv = document.getElementById("colors-js-puns");
    colorDiv.style.display = "none"; 
var ccError = document.createElement("p"); 
    ccError.style.color = "red"; 
    ccError.id = "cc-error";
    cc.insertBefore(ccError, cc.children[3]);
var altJob = document.getElementById("other-title");
    altJob.style.display="none"; 
var emailMsg = document.createElement("p");
    emailMsg.textContent = "Please enter a valid email"; 

//*************When the page loads, give focus to the first text field**************
function focus() {
    var firstTxt = document.getElementsByTagName("input");
    var num = 0; 
    //Loop through all input elements until type = text
    for(var i = 0; i < firstTxt.length; i++) {
        if(firstTxt[i].type == "text") {
           break; 
        } else {
            num++; 
            continue; 
        }
    }
    //foucs on first input with type = text
    firstTxt[num].focus(); 
}
 
//***********A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu**************
var otherJob = function(){
    //Clear text field if it exists
    var userJob = jobs.value;
    if(userJob == "other") {
        altJob.style.display = "";
    } else {
        altJob.style.display = "none"; 
    }
};

//*************Filter color options based on design selection****************
var shirtStyle = function(){
    var shirtDesign = design.value;//options[design.selectedIndex].value;
    var shirtTxt = design.options[design.selectedIndex].text;
    var colorVal = color.value; // options[color.selectedIndex].text;
    var colorValTxt = color.options[color.selectedIndex].text;
    console.log(shirtDesign); 
    console.log(shirtTxt);
    console.log(colorVal);
    console.log(colorValTxt); 
    //Hide color until theme selected 
    if (shirtTxt == "Select Theme"){
        colorDiv.style.display = "none"; 
    } else {
        colorDiv.style.display = ""; 
    }
    //reset color selection if it conflicts with theme
    if(shirtDesign != "js puns" && colorValTxt.indexOf("JS Puns shirt only") > -1 
    || shirtDesign != "heart js" && colorValTxt.indexOf("JS shirt only") > -1){
        color.selectedIndex = 0; 
    }
    //Hide colors based on theme selection 
    for(var i = 0; i < color.children.length; i++){
        var shirtColor = color.children;
        console.log(shirtColor[i].textContent);
        shirtColor[i].style.display = ""; 
        if (shirtDesign == "js puns" && shirtColor[i].textContent.indexOf("JS Puns shirt only") > -1 ){
           shirtColor[i].style.display = "";
       } else if (shirtDesign == "heart js" && shirtColor[i].textContent.indexOf("JS shirt only") >-1 ){
           shirtColor[i].style.display = "";
       } else if (design.options[design.selectedIndex].text == "Select Theme") {
          shirtColor[i].style.display = ""; 
       } else {
          shirtColor[i].style.display = "none"; 
       }
    }
};

//***********Sets conflicting activites to unavailable*************
function boxChecked(){
    for (var a = 0; a < activities.children.length; a++){
            if(activities.children[a].nodeName == "LABEL"){//Allows loop to run with appended textinput
                activities.children[a].setAttribute("class","");
                activities.children[a].childNodes[0].disabled = false;
            }
        }
    for(var i = 0; i < activities.children.length; i++){
        if(activities.children[i].nodeName == "LABEL"){//Allows loop to run with appended textinput
            var splitOne = activities.children[i].textContent.split(/[,—]+/);
            if(activities.children[i].childNodes[0].checked){
                //sets activity to unavailable if a checked activity has a time conflict
                for(var l = 0; l < activities.children.length; l++){
                    var splitTwo = activities.children[l].textContent.split(/[,—]+/);
                    var textComp = activities.children[l].childNodes[0]; 
                    if (splitTwo[1] == splitOne[1] && !textComp.checked){
                        activities.children[l].setAttribute("class","unavailable"); 
                        activities.children[l].childNodes[0].disabled = true;
                    } 
                }
            }
        } 
    }
    pmtAmt();
}

//**********Totals the amt due based on selected activities***********
function pmtAmt() {
    totalDue.className = "";
    var total = 0; 
    for(var i = 0; i < activities.children.length; i++){
        if(activities.children[i].nodeName == "LABEL"){
            if(activities.children[i].childNodes[0].checked){
               var splitOne = activities.children[i].textContent.split("$");
               var amount = parseFloat(splitOne[1],10);
               total+=amount; 
           }
       }
    }
    //Sets the amount and field styling
    totalDue.placeholder = "Total Due: $"+total;
    if(amount > 0){
        totalDue.className = "total";
    }
}

//*************Only display pmt info based on pmt method***********
var hidePmt = function(){
    cc.style.display = "none";
    pp.style.display = "none"; 
    bc.style.display = "none";
    if(pmtMethod.options[pmtMethod.selectedIndex].value == "credit card") {
        cc.style.display = "";
        pp.style.display = "none"; 
        bc.style.display = "none";
    } else if(pmtMethod.options[pmtMethod.selectedIndex].value == "paypal"){
        pp.style.display = "";
        cc.style.display = "none"; 
        bc.style.display = "none";
    } else if(pmtMethod.options[pmtMethod.selectedIndex].value == "bitcoin") {
        bc.style.display = "";
        cc.style.display = "none"; 
        pp.style.display = "none";
    }
};

 //***********************Form validation********************* 
 function validation(){
     submitButton.setAttribute("type", "submit");
     //validate name field
     if(userName.value ==''){
         submitButton.setAttribute("type", "button"); 
         userName.style.borderColor = "red";
     } else {
         userName.style.borderColor = "";
     }
     
     //validate email 
     if(email.value.search(regex) == -1){
         submitButton.setAttribute("type", "button");
         email.style.borderColor = "red";
     } else {
         email.style.borderColor = "";
     }
     
     //validate at least one activity selected
     var checkCount = 0; 
     for(var i = 0; i < activities.children.length; i++){
         if(activities.children[i].nodeName == "LABEL"){
             if(activities.children[i].childNodes[0].checked){
                 checkCount++; 
             }
         }
     }
     if(checkCount == 0) {
        activities.style.borderBottom = "red";
        activities.style.borderBottomStyle = "solid"; 
        activities.style.color = "white"; 
        register.style.background = "red";
        submitButton.setAttribute("type", "button");
        } else {
            activities.style.borderBottom = "";
            activities.style.borderBottomStyle = ""; 
            activities.style.color = ""; 
            register.style.background = "";
        }
        
     //Validate that a payment method is selected
     if(pmtMethod.value == "select_method"){
         pmtMethod.style.borderColor = "red";
         submitButton.setAttribute("type", "button");
     } else {
         pmtMethod.style.borderColor = "";
     }
     
     //Validate a correct card number is entered
     if(pmtMethod.value == "credit card" && (ccInput.value =='' || isNaN(ccInput.value))){
         console.log("cc"); 
         ccInput.style.borderColor ="red";
         ccError.textContent = "Please enter a valid credit card number";
         submitButton.setAttribute("type", "button");
     }  else if(ccInput.value.length < 13 || ccInput.value.length > 16) {
         ccInput.style.borderColor ="red";
         ccError.textContent = "Please enter a credit card number between 13 & 16 digits long";
         submitButton.setAttribute("type", "button");
     } else {
         ccInput.style.borderColor ="";
         ccError.innerText = ""; 
     }
     
     //Validate zipcode 
     if(zip.value.search(zipRegex)){
         zip.style.borderColor = "red";
         submitButton.setAttribute("type", "button");
     } else {
         zip.style.borderColor = "";
     }
     
     //Validate the CVV number 
     if(cvv.value.length != 3){
         cvv.style.borderColor = "red";
         submitButton.setAttribute("type", "button");
     } else {
         cvv.style.borderColor = "";
     }
     //Append error notification 
     if(submitButton.type == "button"){
        submitButton.setAttribute("class", "submit-form");
        submitButton.style.border = "solid"; 
        submitButton.style.borderColor = "red";
     } 
 }

//script
focus();
jobs.onchange = otherJob;//Hide/display Other job text field
design.onchange = shirtStyle;//Display color based on shirt style
//Loop through events and set onclick attribute to input (type=checkbox)
for(var i = 0; i < activities.children.length; i++){
    if(activities.children[i].childNodes[0].type == "checkbox"){
        activities.children[i].childNodes[0].setAttribute("onclick","boxChecked()");
    }
}

var totalDue = document.createElement("input"); //create total amount due field.
totalDue.type = "text";
totalDue.id = "total-due";
totalDue.name = "total-due";
totalDue.placeholder = "Total Due: $0";
totalDue.disabled = true;
activities.appendChild(totalDue);//append total $ based on activites selected
pmtMethod.onchange = hidePmt;//display pmt info based on method
submitButton.onclick = validation;//validate form 
