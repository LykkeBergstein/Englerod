//General information for sending request to WordPress 
const apiUrl = "http://lykkebergstein.dk/wp-json"; 
const apiUrlGET = "http://lykkebergstein.dk/wp-json/wp/v2"; 

const apiUserInformation = { 
    "username": "api.user", 
    "password": "API-key-1234#!" 
} ; 

// errorMessage(msg) - displays error message
function errorMessage(msg) {
//    console.log(msg);
}

 

//Change navigation color 
function changeTextColor() { 
    if (document.getElementById ("opskrifter")) { 
        document.getElementById("opskrifter").style.color = "#A30900"; 
        document.getElementById("om").style.color = "#000000"; 
        document.getElementById("kontakt").style.color = "#000000"; 
    } else if (document.getElementById ("om")) { 
        document.getElementById("om").style.color = "#A30900"; 
        document.getElementById("opskrifter").style.color = "#000000"; 
        document.getElementById("kontakt").style.color = "#000000"; 
    } else if (document.getElementById ("kontakt")) { 
        document.getElementById("kontakt").style.color = "#A30900"; 
        document.getElementById("om").style.color = "#000000"; 
        document.getElementById("opskrifter").style.color = "#000000"; 
    } 
}  
//    case "opskrifter": 
        

document.getElementById("opskrifter").onclick = changeTextColor; 
document.getElementById("om").onclick = changeTextColor; 
document.getElementById("kontakt").onclick = changeTextColor; 

//Send request to WordPress 
const xhttp = new XMLHttpRequest() ; 
//Specify what happens when done 
xhttp.onreadystatechange = function() { 
    if (this.readyState == 4 && this.status == 200) { 
        //all fine 
        try { 
            let data = JSON.parse(this.response); 
            window.localStorage.setItem('authToken', data.token); 
            createPage(); 
        } catch(error) { 
            errorMessage(`Parsing error: ${error}`); 
        } 
    } 
    if (this.readyState == 4 && this.status >= 400) { 
        errorMessage("An error has occured, please try again later. "); 
    } 
} 

xhttp.open('POST', `${apiUrl}/jwt-auth/v1/token` , true); 
//Specify any request headers needed 
xhttp.setRequestHeader('Content-Type', 'application/JSON'); 
//Send the request 
xhttp.send(JSON.stringify(apiUserInformation)); 
 //Omskriver JSON-objektet til string text 
 console.log(`Yay we have a token: ${window.localStorage.getItem("authToken")} `) ; 

xhttp.open('GET', `${apiUrlGET}/posts?status=private&per_page=50`, true); 
//Specify any necessary headers 
xhttp.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('authToken')}`) ; 
//Send request 
xhttp.send(); 
console.log( 

