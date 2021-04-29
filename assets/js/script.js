
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
