
//displaying result of api 
const displayResult = (req) =>{
    let response =  JSON.parse(req.response);
    let responseCollection = response.results;
    var  displayArea = document.getElementById("super-hero-container");
    displayArea.innerHTML=""
    console.log(response);

    //if no response then show no reult found 
    if(response.response === "error"){
        var para = document.createElement("p");
        para.setAttribute("class","para-style");
        para.innerHTML = "No result to display"
        displayArea.appendChild(para);
    }

    //looping in searchresult
    for(let i=0;i<responseCollection.length;i++){
        var newHero = document.createElement("div");
        newHero.setAttribute("class","super-hero-tab");
        var image = document.createElement("img");
        image.setAttribute("src",responseCollection[i].image.url);
        image.setAttribute("alt",responseCollection[i].name);
        image.setAttribute("class","img-style");
        var linkTag = document.createElement("a");
        linkTag.setAttribute("superInfo",responseCollection[i].id);
        linkTag.setAttribute("href","profile.html");
        linkTag.setAttribute("onclick","viewProfile(this)");
        linkTag.appendChild(image);
        newHero.appendChild(linkTag);
        displayArea.appendChild(newHero);
        var button = document.createElement("button");
        button.innerHTML="Add To Favourites"
        button.setAttribute("id","button-style");
        button.setAttribute("superInfo",responseCollection[i].id);
        button.setAttribute("onclick","addToFavourites(this)");
        newHero.appendChild(button);
    }
}

//fetching of api onkeyup event and search button click
const searchSuperHeroFun = () => {
    let filter = document.getElementById("search-input").value.toLowerCase();
    let link = "https://superheroapi.com/api.php/2979097782169753/search/"+ filter;
    console.log(link);
    let request = new XMLHttpRequest();
    request.open("GET",link);
    request.send();
    request.onload = () => {
        if(request.status===200){
           displayResult(request);
        }else{
            console.log(`error ${request.status} ${request.statusText}`);
        }
    }
}


//add to favouriteList using localStorage
const addToFavourites = (caller) =>{
     let getId = caller.getAttribute("superInfo");
     var idList = localStorage.getItem('superHeroId');
     if(idList===null){
         var idArray = [getId]; 
         localStorage.setItem('superHeroId',JSON.stringify(idArray));
         alert("Added to favourite");
     }else{
         var idArray = JSON.parse(idList);
         //inserting only unique elements
         if(idArray.indexOf(getId)==-1){
             idArray.push(getId);
             localStorage.setItem('superHeroId',JSON.stringify(idArray));
             //showing alert on inserting to favourites
             alert("Added to favourite");
         }else{
             //showing alert on already inserted
             alert("Already exists in favourites");
         }

     }
}


//inserting id to localStorage to view partcular profile
const viewProfile = (caller) =>{
    var getId = caller.getAttribute("superInfo");
    localStorage.setItem('profileId',getId);
}