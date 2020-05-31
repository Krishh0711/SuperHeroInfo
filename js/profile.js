// creating element to append to display 

const displayProfileInfo = (req) => {
    let response =  JSON.parse(req.response);
     console.log(response);
    var image = document.createElement("img");
    image.setAttribute("src",response.image.url);
    image.setAttribute("class","img-style");
    var ImageContainer = document.getElementById("imageContainer");
    ImageContainer.appendChild(image);

    var newRow = document.createElement("tr");
    var key = document.createElement("td");
    key.innerHTML="Name";
    key.setAttribute("class","key-style");
    newRow.appendChild(key);
    var value = document.createElement("td");
    value.innerHTML=response.name;
    value.setAttribute("class","value-style");
    newRow.appendChild(value);
    var table = document.getElementById("info-table");
    table.appendChild(newRow);

    //looping over powerstats object
    var newRow = document.createElement("tr");
    var key = document.createElement("td");
    key.innerHTML="Powerstats";
    key.setAttribute("class","key-style");
    newRow.appendChild(key);
    let powerstats = response.powerstats;
    Object.keys(powerstats).forEach((key,index)=>{
        var key1 = document.createElement("td");
        key1.innerHTML=key+": "+powerstats[key];
        key1.setAttribute("class","object-style");
        newRow.appendChild(key1);
    });
    table.appendChild(newRow);

    //looping over biography object
    var newRow = document.createElement("tr");
    var key = document.createElement("td");
    key.innerHTML="Bio-Graphy";
    key.setAttribute("class","key-style");
    newRow.appendChild(key);
    let bio = response.biography;
    Object.keys(bio).forEach((key,index)=>{
        var key1 = document.createElement("td");
        key1.innerHTML=key+": "+bio[key];
        key1.setAttribute("class","object-style");
        newRow.appendChild(key1);
    });
    table.appendChild(newRow);
}


//function to call api of id received from other page
const displayProfile = () => {
    let id =  localStorage.getItem('profileId');
    console.log(id);
        let link = "https://superheroapi.com/api.php/2979097782169753/"+ id;
       
        let request = new XMLHttpRequest();
        request.open("GET",link);
        request.send();
        request.onload = () => {
            if(request.status===200){
               displayProfileInfo(request);
            }else{
                console.log(`error ${request.status} ${request.statusText}`);
            }
        }
    }

  //call function on load to fetch from api  
window.onload = displayProfile;

