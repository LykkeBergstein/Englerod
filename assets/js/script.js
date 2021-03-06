//General information for sending request to WordPress 
const apiUrl = "http://lykkebergstein.dk/wp-json"; 
const apiUrlGET = "http://lykkebergstein.dk/wp-json/wp/v2"; 

const apiUserInformation = { 
    "username": "api.user", 
    "password": "API-key-1234#!" 
} ; 

let wordPressData; 
let kogebog_billede_nummer = 1; 
let forar_kategori = 1; 
let sommer_kategori = 1; 
let efterar_kategori = 1; 
let vinter_kategori = 1; 
// errorMessage(msg) - displays error message
function errorMessage(msg) {
//    console.log(msg);
}

 

//Change navigation color 
function changeTextColor(page) {  
    if (page === "opskrifter") {  
        document.getElementById("opskrifter").style.color = "#A30900"; 
        document.getElementById("om").style.color = "#000000"; 
        document.getElementById("kontakt").style.color = "#000000"; 
    } else if (page === "om") { 
        document.getElementById("om").style.color = "#A30900"; 
        document.getElementById("opskrifter").style.color = "#000000"; 
        document.getElementById("kontakt").style.color = "#000000"; 
    } else if (page === "kontakt") { 
        document.getElementById("kontakt").style.color = "#A30900"; 
        document.getElementById("om").style.color = "#000000"; 
        document.getElementById("opskrifter").style.color = "#000000"; 
    } else if (page === "headerContent") { 
        document.getElementById("kontakt").style.color = "#000000"; 
        document.getElementById("om").style.color = "#000000"; 
        document.getElementById("opskrifter").style.color = "#000000"; 
    } 
}  
//    case "opskrifter": 
        

document.getElementById("opskrifter").addEventListener ("click", () => { 
    changeTextColor("opskrifter"); 
    loadOpskriftIndex(); 
} ); 
document.getElementById("om").addEventListener ("click", () => { 
    loadAbout(); 
    changeTextColor("om"); 
} ); 
document.getElementById("kontakt").addEventListener ("click", () => { 
    loadContact(); 
    changeTextColor("kontakt"); 
    }    ); 
document.getElementById("headerContent") .addEventListener("click", () => { 
    changeTextColor("headerContent"); 
    loadIndex(); 
}); 
 
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

function createPage() { 
// Der er taget udgangspunkt i Gery's undervisning ; 

    //Connect to the endpoint for all the vans(those are in private posts tagged as vans) 
        //If successful 
        const xhttp = new XMLHttpRequest(); 
        //Where to send request 
        xhttp.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200) { 
                try { 
                wordPressData = JSON.parse(this.response); 
                //    console.log(siteData); 
                    console.log(wordPressData); 
                //    let newOption = document.createElement('option'); //Laver et tomt element 
                    //    newOption.value = wordPressData.id; 
                    //    newOption.text = wordPressData.acf.name; 
                        loadIndex(wordPressData); 
                } catch (error) {   
                    errorMessage(`Parsing error: ${error}`); 
                } 
            } 
        } 
/*     
createPage(); */ 
xhttp.open ('GET', `${apiUrlGET}/posts?status=private`, true); 
/*
xhttp.open('GET', `${apiUrlGET}/posts?status=private&per_page=50`, true); */ 
//Specify any necessary headers 
xhttp.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('authToken')}`) ; 
//Send request 
xhttp.send(); 
    } 

function loadIndex() { 
   document.querySelector("#content").innerHTML = ` 
    <img class="picture1" src="${wordPressData[0].acf.billede_johanne1.url}" alt="Johanne der st??r bag Englerod"> 
    <img class="picture2" src="${wordPressData[0].acf.billede_johanne2.url}" alt="Johanne Mosgaard"> 
    <h1> ${wordPressData[0].acf.overskrift} </h1> 
    <article class="indexBeskrivelse"> ${wordPressData[0].acf.beskrivelse} </article> 
    <p id="linkOmOs"> ${wordPressData[0].acf.link_om_os} </p> 
    <h2 class="blogindl??gOverskrift"> ${wordPressData[0].acf.blogindlaeg} </h2> 
    <div class="posts"> 
        <div class="post1"> 
            <img class="post1image" src="${wordPressData[0].acf.blogindlaeg_posts.post1.post_billede.url}" alt="spidsk??lssalat"> 
            <div class="post1text"> 
                <h3 class="post1Overskrift"> ${wordPressData[0].acf.blogindlaeg_posts.post1.navn} </h3>   
                <p class="postBeskrivelse"> ${wordPressData[0].acf.blogindlaeg_posts.post1.post_beskrivelse} </p> 
            </div> 
        </div> 
    </div> 
    <br> 
        <div class="posts"> 
            <div class="post1"> 
            <img class="post1image" src="${wordPressData[0].acf.blogindlaeg_posts.post2.post_billede.url}" alt="snobr??d">  
            <div class="post1text"> 
                <h3 class="post1Overskrift"> ${wordPressData[0].acf.blogindlaeg_posts.post2.navn} </h3>  
                <p class="postBeskrivelse"> ${wordPressData[0].acf.blogindlaeg_posts.post2.post_beskrivelse} </p> 
            </div> 
        </div> 
    </div> 
    <br> 
        <div class="posts"> 
            <div class="post1"> 
            <img class="post1image" src="${wordPressData[0].acf.blogindlaeg_posts.post3.post_billede.url}" alt="spidsk??lssalat"> 
            <div class="post1text"> 
                <h3 class="post1Overskrift"> ${wordPressData[0].acf.blogindlaeg_posts.post3.navn} </h3>  
                <p class="postBeskrivelse"> ${wordPressData[0].acf.blogindlaeg_posts.post3.post_beskrivelse} </p> 
            </div> 
        </div> 
    </div> 
    </div> 

    <div class="videos"> 
        <h2 class="blogindl??gOverskrift"> ${wordPressData[0].acf.videoer.overskrift} </h2> 
        <img class="videoImage" src="${wordPressData[0].acf.videoer.video1.url}" alt="video thumbnail"> 
        <img class="videoImage" src="${wordPressData[0].acf.videoer.video2.url}" alt="video thumbnail"> 
        <img class="videoImage" src="${wordPressData[0].acf.videoer.video3.url}" alt="video thumbnail"> 
    </div> 
    <br> 
    <br> 
    <br> 
    <br> 
    <br> 
    <br> 
    </div> 
   `; 
   document.getElementById("linkOmOs") .addEventListener("click", () => { 
    loadAbout(); 
    changeTextColor("om"); 
}); 
} 

function loadContact() { 
document.querySelector("#content").innerHTML = ` 
        <div class="kontaktBeskrivelse"> 
            <div class="kontaktTekst"> 
                <h2 class="kontaktHeader"> ${wordPressData[3].acf.overskrift} </h2> 
                <article class="articleKontakt"> ${wordPressData[3].acf.beskrivelse} </article> 
            </div> 
            <img class="billedeKontakt" src="${wordPressData[3].acf.billede.url}" alt="Johanne Mosgaard"> 
        </div> 
        <div class="kontaktformular"> 
            <h2 class="blogindl??gOverskrift"> ${wordPressData[3].acf.kontaktformular.overskrift} </h2> 
            <form> 
                <input type="text" name="Navn" placeholder="Navn" required>  
                <input type="email" name="Email" placeholder="Email" required> 
                <input type="text" id="textarea" placeholder="Skriv besked her" required> 
                <input type="submit" value="Send"> 
            </form> 
            <br> 
        </div> 
    `; 
} 

    function loadAbout() { 
    document.querySelector("#content").innerHTML = ` 
        <img class="omOsHeader" src="${wordPressData[2].acf.header_image.url}" alt="header image"> 
        <article class="articleOmOs"> ${wordPressData[2].acf.textarea1} </article> 
        <article class="articleOmOs"> ${wordPressData[2].acf.textarea2} </article> 
        <article class="articleOmOs"> ${wordPressData[2].acf.textarea3} </article> 
        <h2 class="blogindl??gOverskrift"> ${wordPressData[2].acf.overskrift_kogeboger} </h2> 
        <div class="kogebogEksempel"> 
            <div class="arrowBox"> 
                <img id="arrowLeft" src="${wordPressData[2].acf.kogebog_eksempel.arrowleft.url}" alt="pil til venstre"> 
            </div> 
            <img id="kogebogBillede" src="${wordPressData[2].acf.kogebog_eksempel.kogebog_billede1.url}" alt="Coveret til VEGANSK GRUNDK??KKEN"> 
            <div class="arrowBox"> 
                <img id="arrowRight" src="${wordPressData[2].acf.kogebog_eksempel.arrowright.url}" alt="pil til h??jre"> 
            </div> 
        </div> 
        <br> 
        <br>  
        <br> 
        <br> 
        <br> 
    `;  
    document.getElementById ("arrowLeft") .addEventListener("click", () => { 
        kogebog_billede_nummer - 1 === 0 ? kogebog_billede_nummer = 3 : kogebog_billede_nummer-- 
        document.getElementById ("kogebogBillede") .src= `${wordPressData[2].acf.kogebog_eksempel["kogebog_billede" + kogebog_billede_nummer].url}` ; 
    }); 
    

    document.getElementById ("arrowRight") .addEventListener("click", () => { 
        kogebog_billede_nummer + 1 === 4 ? kogebog_billede_nummer = 1 : kogebog_billede_nummer++ 
        document.getElementById ("kogebogBillede") .src= `${wordPressData[2].acf.kogebog_eksempel["kogebog_billede" + kogebog_billede_nummer].url}` ; 
    }); 
    } 

    function loadOpskriftIndex() { 
    document.querySelector("#content").innerHTML = ` 
    <h1> ${wordPressData[1].acf.overskrift} </h1>  
    <h2 class="h2_opskriftindex"> ${wordPressData[1].acf.underoverskrift} </h2> 
    <article class="opskriftindex_beskrivelse"> ${wordPressData[1].acf.beskrivelse} </article> 
    <h2 class="h2_opskriftindex"> ${wordPressData[1].acf.forar.forar_overskrift} </h2> 
    <div class="springBox"> 
        <div class="arrowBoxIndex"> 
            <img id="leftIndex" src="${wordPressData[1].acf.forar.arrowLeft.url}" alt="pil til venstre"> 
        </div> 
        <img id="retForar" src="${wordPressData[1].acf.forar.forar_billede.kategori1.billede.url}" alt="kategori"> 
        <div class="arrowBoxIndex"> 
            <img id="rightIndex" src="${wordPressData[1].acf.forar.arrowRight.url}" alt="pil til h??jre"> 
        </div> 
    </div> 

    <h2 class="h2_opskriftindex"> ${wordPressData[1].acf.sommer.sommer_overskrift} </h2> 
    <div class="summerBox">  
        <div class="arrowBoxIndex"> 
            <img id="leftIndexSummer" src="${wordPressData[1].acf.sommer.arrowLeft.url}" alt="pil til venstre"> 
        </div> 
        <img id="retSommer" src="${wordPressData[1].acf.sommer.sommer_billede.kategori1.billede.url}" alt="kategori"> 
        <div class="arrowBoxIndex"> 
            <img id="rightIndexSummer" src="${wordPressData[1].acf.sommer.arrowRight.url}" alt="pil til h??jre"> 
        </div> 
    </div> 

    <h2 class="h2_opskriftindex"> ${wordPressData[1].acf.efterar.efterar_overskrift} </h2> 
    <div class="fallBox">   
        <div class="arrowBoxIndex"> 
            <img id="leftIndexFall" src="${wordPressData[1].acf.efterar.arrowLeft.url}" alt="pil til venstre"> 
        </div> 
        <img id="retEfterar" src="${wordPressData[1].acf.efterar.efterar_billede.kategori1.billede.url}" alt="kategori"> 
        <div class="arrowBoxIndex"> 
            <img id="rightIndexFall" src="${wordPressData[1].acf.efterar.arrowRight.url}" alt="pil til h??jre"> 
        </div> 
    </div> 

    <h2 class="h2_opskriftindex"> ${wordPressData[1].acf.vinter.vinter_overskrift} </h2> 
    <div class="winterBox">    
        <div class="arrowBoxIndex"> 
            <img id="leftIndexWinter" src="${wordPressData[1].acf.vinter.arrowLeft.url}" alt="pil til venstre"> 
        </div> 
        <img id="retVinter" src="${wordPressData[1].acf.sommer.sommer_billede.kategori1.billede.url}" alt="kategori"> 
        <div class="arrowBoxIndex"> 
            <img id="rightIndexWinter" src="${wordPressData[1].acf.vinter.arrowRight.url}" alt="pil til h??jre"> 
        </div> 
    </div> 
    `; 

    document.getElementById ("leftIndex") .addEventListener("click", () => { 
        forar_kategori - 1 === 0 ? forar_kategori = 10 : forar_kategori-- 
        document.getElementById ("retForar") .src= `${wordPressData[1].acf.forar.forar_billede["kategori" + forar_kategori].billede.url}` ; 
    }); 
    
    document.getElementById ("rightIndex") .addEventListener("click", () => { 
        forar_kategori + 1 === 11 ? forar_kategori = 1 : forar_kategori++  
        document.getElementById ("retForar") .src= `${wordPressData[1].acf.forar.forar_billede["kategori" + forar_kategori].billede.url}` ;  
    }); 
    document.getElementById ("leftIndexSummer") .addEventListener("click", () => { 
        sommer_kategori - 1 === 0 ? sommer_kategori = 10 : sommer_kategori-- 
        document.getElementById ("retSommer") .src= `${wordPressData[1].acf.sommer.sommer_billede["kategori" + sommer_kategori].billede.url}` ; 
    }); 
    
    document.getElementById ("rightIndexSummer") .addEventListener("click", () => { 
        sommer_kategori + 1 === 11 ? sommer_kategori = 1 : sommer_kategori++ 
        document.getElementById ("retSommer") .src= `${wordPressData[1].acf.sommer.sommer_billede["kategori" + sommer_kategori].billede.url}` ;  
    }); 

    document.getElementById ("leftIndexFall") .addEventListener("click", () => { 
        efterar_kategori - 1 === 0 ? efterar_kategori = 10 : efterar_kategori-- 
        document.getElementById ("retEfterar") .src= `${wordPressData[1].acf.efterar.efterar_billede["kategori" + efterar_kategori].billede.url}` ; 
    }); 
    
    document.getElementById ("rightIndexFall") .addEventListener("click", () => { 
        efterar_kategori + 1 === 11 ? efterar_kategori = 1 : efterar_kategori++ 
        document.getElementById ("retEfterar") .src= `${wordPressData[1].acf.efterar.efterar_billede["kategori" + efterar_kategori].billede.url}` ;   
    }); 

    document.getElementById ("leftIndexWinter") .addEventListener("click", () => { 
        vinter_kategori - 1 === 0 ? vinter_kategori = 11 : vinter_kategori-- 
        document.getElementById ("retVinter") .src= `${wordPressData[1].acf.vinter.vinter_billede["kategori" + vinter_kategori].billede.url}` ; 
    }); 
    
    document.getElementById ("rightIndexWinter") .addEventListener("click", () => { 
        vinter_kategori + 1 === 12 ? vinter_kategori = 1 : vinter_kategori++ 
        document.getElementById ("retVinter") .src= `${wordPressData[1].acf.vinter.vinter_billede["kategori" + vinter_kategori].billede.url}` ; 
    }); 
    /* Fors??g p?? at lave subpages med forskellige kategorier baseret p?? ??rstiden */ 
    document.getElementById("retForar").addEventListener("click", () => { 
        tags = { 
            "S??de sager" : 28, 
            "Glutenfri": 27, 
            "Bagv??rk": 26, 
            "Tilbeh??r": 25, 
            "Gr??n jul": 24, 
            "Drikke":  22, 
            "Efter??r": 15, 
            "For??r": 13, 
            "Mindre retter": 20, 
            "Morgenmad": 19, 
            "Salater": 23, 
            "Sommer": 14, 
            "Store m??ltider": 16, 
            "Supper": 21, 
            "Vinter": 18 
        }; 
        loadSubpage (tags["For??r"], tags[wordPressData[1].acf.forar.forar_billede["kategori" + forar_kategori].kategori]) 
    } ); 

    
    document.getElementById("retSommer").addEventListener("click", () => { 
        tags = { 
            "S??de sager" : 28, 
            "Glutenfri": 27, 
            "Bagv??rk": 26, 
            "Tilbeh??r": 25, 
            "Gr??n jul": 24, 
            "Drikke":  22, 
            "Efter??r": 15, 
            "For??r": 13, 
            "Mindre retter": 20, 
            "Morgenmad": 19, 
            "Salater": 23, 
            "Sommer": 14, 
            "Store m??ltider": 16, 
            "Supper": 21, 
            "Vinter": 18 
        }; 
        loadSubpage (tags["Sommer"], tags[wordPressData[1].acf.sommer.sommer_billede["kategori" + sommer_kategori].kategori]) 
    } ); 

    document.getElementById("retEfterar").addEventListener("click", () => {  
        tags = { 
            "S??de sager" : 28, 
            "Glutenfri": 27, 
            "Bagv??rk": 26, 
            "Tilbeh??r": 25, 
            "Gr??n jul": 24, 
            "Drikke":  22, 
            "Efter??r": 15, 
            "For??r": 13, 
            "Mindre retter": 20, 
            "Morgenmad": 19, 
            "Salater": 23, 
            "Sommer": 14, 
            "Store m??ltider": 16, 
            "Supper": 21, 
            "Vinter": 18 
        }; 
        loadSubpage (tags["Efter??r"], tags[wordPressData[1].acf.efterar.efterar_billede["kategori" + efterar_kategori].kategori]) 
    } ); 
    } 


    function loadSubpage (season, dish) { 
        document.querySelector("#content").innerHTML = ` 
            <h1 class="opOverskrift">  </h1> 
            <h2 class="kategoriOverskrift">  </h2> 
        ` 
        wordPressData.forEach(page => { 
            if (page.tags.includes(season) && page.tags.includes(dish)) { 
            document.querySelector("#content").innerHTML += ` 
                <div class="opBox" id="${page.acf.recipe_name}" > 
                    <h3 class="opHeader"> ${page.acf.recipe_name}  </h3> 
                    <img class="opImage" src="${page.acf.picture_of_dish.url}" alt="picture of dish" > 
                   <li class="tidsliste">
                    <ul class="antal"> Antal personer: ${page.acf.antal} </ul> 
                    <ul class="forberedelse"> Forberedelses tid: ${page.acf.tid.forberedelsestid} </ul> 
                    <ul class="samlet"> Samlet tid: ${page.acf.tid.samlet_tid} </ul> 
                    <ul class="pris">  </ul> 
                    </li>
                </div> ` 
                document.getElementById (`${page.acf.recipe_name}`) .addEventListener("click", () => { 
                    loadopskrift(); 
                } ); 
            } 
        } ); 
    } 

    function loadopskrift () {
        document.querySelector("#content").innerHTML = `
    <h1 class="recipename"> ${wordPressData[4].acf.recipe_name} </h1>
    <h4 class="name_of_author"> ${wordPressData[4].acf.author}</h4>
    <p class="antal_personer"> ${wordPressData[4].acf.antal} </p> 
    <img class="picture_of_dish" src="${wordPressData[4].acf.picture_of_dish.url}" alt="picture of dish">
    
    <div>
        <p class="forberedelsestid"> ${wordPressData[4].acf.tid.forberedelsestid}</p>
        <p class="tilberedningstid"> ${wordPressData[4].acf.tid.tilberedningstid}</p>
        <p class="samlet_tid"> ${wordPressData[4].acf.tid.samlet_tid}</p>
    </div>
    
        <h1 class="overskrift_ingrediens">${wordPressData[4].acf.ingredienser.overskrift}</h1>
        <ul class="ingrediensgruppe"> 
            <li class="ingrediens1"> ${wordPressData[4].acf.ingredienser.ingrediens1}</li>
            <li class="ingrediens2"> ${wordPressData[4].acf.ingredienser.ingrediens2}</li>
            <li class="ingrediens3"> ${wordPressData[4].acf.ingredienser.ingrediens3}</li>
            <li class="ingrediens4"> ${wordPressData[4].acf.ingredienser.ingrediens4}</li>
            <li class="ingrediens5"> ${wordPressData[4].acf.ingredienser.ingrediens5}</li>
            <li class="ingrediens6"> ${wordPressData[4].acf.ingredienser.ingrediens6}</li>
            <li class="ingrediens7"> ${wordPressData[4].acf.ingredienser.ingrediens7}</li>
            <li class="ingrediens8"> ${wordPressData[4].acf.ingredienser.ingrediens8}</li>
            <li class="ingrediens9"> ${wordPressData[4].acf.ingredienser.ingrediens9}</li>
            <li class="ingrediens10"> ${wordPressData[4].acf.ingredienser.ingrediens10}</li>
            <li class="ingrediens11"> ${wordPressData[4].acf.ingredienser.ingrediens11}</li>
            <li class="ingrediens12"> ${wordPressData[4].acf.ingredienser.ingrediens12}</li>
            <li class="ingrediens13"> ${wordPressData[4].acf.ingredienser.ingrediens13}</li>
            <li class="ingrediens14"> ${wordPressData[4].acf.ingredienser.ingrediens14}</li>
        </ul>

    <div class="fremgangsmade">
        <h2 class="overskrift_fremgangsmade"> ${wordPressData[4].acf.fremgangsmade.overskrift}</h2>
        <h3 class="underoverskrift_fremgangsmade"> ${wordPressData[4].acf.fremgangsmade.underoverskrift}</h3>
            <ol>
                <li class="steps"> ${wordPressData[4].acf.fremgangsmade.step1}</li><br>
                <li class="steps"> ${wordPressData[4].acf.fremgangsmade.step2}</li><br>
            </ol>
        <h3 class="underoverskrift_fremgangsmade"> ${wordPressData[4].acf.fremgangsmade.underoverskrift1}</h3>
            <ol>
                <li class="steps"> ${wordPressData[4].acf.fremgangsmade.step3}</li><br>
                <li class="steps"> ${wordPressData[4].acf.fremgangsmade.step4}</li><br>
            </ol>
    </div>

    <div class="tips">
    <h3 class="tips_overskrift"> ${wordPressData[4].acf.tips.overskrift}</h3>
    <p class="tips_felt"> ${wordPressData[4].acf.tips.tips_felt}</p>
    </div>
    `; 
    } 

     