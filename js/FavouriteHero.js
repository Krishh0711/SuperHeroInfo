//displaying list of favourite item 

const displayFavouriteListItem = (req) =>{
    var superHero = JSON.parse(req.response);
    var newHero = document.createElement("div");
    newHero.setAttribute("class","super-hero-tab");
    var image = document.createElement("img");
    image.setAttribute("src",superHero.image.url);
    image.setAttribute("alt",superHero.name);
    image.setAttribute("class","img-style");
    var linkTag = document.createElement("a");
    linkTag.setAttribute("superInfo",superHero.id);
    linkTag.setAttribute("href","profile.html");
    linkTag.setAttribute("onclick","viewProfile(this)");
    linkTag.appendChild(image);
    newHero.appendChild(linkTag);
    var  displayArea = document.getElementById("super-hero-container");
    displayArea.appendChild(newHero);
    var button = document.createElement("button");
    button.innerHTML="Remove From Favourites"
    button.setAttribute("id","button-style");
    button.setAttribute("superInfo",superHero.id);
    button.setAttribute("onclick","removeFromFavourites(this)");
    newHero.appendChild(button);
}

//calling api  to get list of item inserted in favourite list
const displayFavouriteList = () => {
    let getIds =  JSON.parse(localStorage.getItem('superHeroId'));
    //looping over ids stored in localStorage to fetch api using id
    for(let i=0;i<getIds.length;i++){
        let id = getIds[i];
        let link = "https://superheroapi.com/api.php/2979097782169753/"+ id;
       
        let request = new XMLHttpRequest();
        request.open("GET",link);
        request.send();
        request.onload = () => {
            if(request.status===200){
               displayFavouriteListItem(request);
            }else{
                console.log(`error ${request.status} ${request.statusText}`);
            }
        }
    }
}

//calling function on page load to fetch from id stored in localStorage  
window.onload = displayFavouriteList;

const removeFromFavourites = (caller) =>{
    let getId = caller.getAttribute("superInfo");
    var idList = localStorage.getItem('superHeroId');
    if(idList!=null){
        var idArray = JSON.parse(idList);
        for(var i=0;i<idArray.length;i++){
            if(idArray[i]===getId){
                idArray.splice(i,1);
            }
        }
        localStorage.setItem('superHeroId',JSON.stringify(idArray));
        location.reload();
    }
}


//inserting id to localStorage to view partcular profile
const viewProfile = (caller) =>{
    var getId = caller.getAttribute("superInfo");
    localStorage.setItem('profileId',getId);
}