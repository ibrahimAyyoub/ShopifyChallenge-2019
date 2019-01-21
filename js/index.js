/*
    ********************************************
    Author: Ibrahim Ayyoub.
    # Web Engineer Challenge - Summer 2019
    # Goal: Build a web app to search for waste items using the Toronto Waste Wizard database, and save frequently used ones.
    ********************************************
*/
// If a user searches an item then the following method will handle it.
const handle_search = ()=>{

    // User searches,Empty the search bar so its easy to search the next time.
    let user_keywords = document.getElementById("search-bar").value.toLowerCase().trim();
    // Clear the lists. 
    document.querySelector(".init-items").innerHTML = ""
    
    //Display data on UI.
    performSearch(user_keywords);
    

    // Reset the search bar, once the user searches an item.
    document.getElementById("search-bar").value = "";
}

// This method enables the user to press "enter(return) button" to make it easier to search.
const keyboardSupport = (event)=>{
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) 
        handle_search();     // Do the search and get the data.
}

// A nice method for decoding HTML entities.
// Taken from stackoverflow -> https://stackoverflow.com/questions/5796718/html-entity-decode
function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];
    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
    return text;
}

// This method is for when a user likes or dislikes an item, basically its kind of a controller for liking/disliking in a way.
const handleFavourites = (event)=>{

    // Getting the ID of the item favoured
    let item_favored = event.target.id

    // If the user didn't press on the favourite icon, then return nothing.
    if(!item_favored) return;
    // The user favourite this item
    else item_favored = event.target

    //Checking if the event target was the star icon.
    if(item_favored.classList.contains("is-item")){
        if(item_favored.classList.contains("star-icon")){
            //remove the grey star and add the green-star
            item_favored.classList.add("star-green");
            item_favored.classList.remove("star-icon");

            //Add item to favourties list. and store it in the local storage.
            addItemToFavourties(item_favored)
            storeItemToStorage(item_favored)
        }
        else{
            //remove the green star and add the grey-star
            item_favored.classList.add("star-icon");
            item_favored.classList.remove("star-green");
            
            //remove  item from favourties list. and delete it from the local storage.
            delItemFromFavourties(item_favored);
            deleteItemFromStorage(item_favored);
        }
    }
}

// This method will get the data related to the user's keywords.
const performSearch = (user_keywords)=>{

    if((user_keywords) && user_keywords.length >1){
        console.log("word searched:" ,user_keywords)
        let url = `https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?q=keywords: ${user_keywords}`
        fetch(
            url,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
                }
            }
        )
        .then((response)=>response.json()) // convert the readableStream to a json object.
        .then((data)=>{
            console.log("data recieved")
            console.log(data)

            
            if(!data || data.length === 0){
                let error_message = `<p>No results found, try keywords like "takeout", "milk",or "pizza" or anything that has to do with waste</p>`
            document.querySelector(".init-items").insertAdjacentHTML("beforeend",error_message);  
            }
            

            let item_html = ``
            let description_html = ``
            let id = 0
            for(let item of data)
            {
                console.log(item);
                description_html =  decodeHTMLEntities(item.body)
                
                item_html += 

                `<div class="row list-style">
                    <!-- name of the items -->
                    <div class="col-6 items">
                        <ul>
                            <li><i class="fa fa-star star-icon is-item" id="${id}"></i>${item.title}</li>
                        </ul>
                    </div>
                    <!-- Description of the items -->
                    <div class="col-6 descriptions">
                     ${description_html}
                    </div>
                </div>`;
            
                id++;
            }
            document.querySelector(".init-items").insertAdjacentHTML("beforeend",item_html);  
        })
        .catch((err)=>{
            let error_message = `<p>No results found, try keywords like "takeout", "milk",or "pizza" or anything that has to do with waste</p>`
            document.querySelector(".init-items").insertAdjacentHTML("beforeend",error_message);  
        })
    }
}

 //If a user clicks on the star icon(grey), then its going to be added to the favourites list.
const addItemToFavourties = (itemLiked)=>{
    let insert_fav = document.getElementById(itemLiked.id).parentNode.parentNode.parentNode.parentNode;
    insert_fav.classList.add("added-to-fav");
    document.querySelector(".init-favs").insertAdjacentHTML("beforeend", insert_fav.outerHTML);
    insert_fav.classList.remove("added-to-fav");
    
}


//If a user clicks on the star(Green, already favoured) then delete that item from the favourites list from the items list.
const delItemFromFavourties = (itemDisliked)=>{

    // Thanks to ES6 for allowing conversion from NodeList to an Array.
    let favourite_items = [...document.querySelectorAll(".added-to-fav")];

    for(let fav of favourite_items){
        // Allow type cast instead of doing it manually, recall '==' allows type casting while '===' doesn't
        if(fav.children[0].children[0].children[0].children[0].id == itemDisliked.id)
            fav.parentNode.removeChild(fav);
    }
}

// This method handles the deletion of a favord item from the favourties list.
const handleDeletionFromFavourtiesList = (event)=>{

    let itemFromFavList = event.target.id

    // If the user didn't press on the favourite icon, then return nothing.
    if(!itemFromFavList) return;
    // The user favoured this item
    else itemFromFavList = event.target

    // Checking if the thing clickeed is an item that is favored.
     if(itemFromFavList.classList.contains("is-item")){
        if(itemFromFavList.classList.contains("star-green")){
             //delete item to favourties list, also remove its icon from the items list and remove it from the local storage.
             deleteFavoredItemFromFavList(itemFromFavList);
             deleteItemFromStorage(itemFromFavList);
        }
    }
    
}
//If a user clicks on the star(Green, already favoured) but this time from the favourties list and not the items list,then delete that item from the favourites list from the favourites list.
const deleteFavoredItemFromFavList = (itemToDelete)=>{
    // Item_from_list is the item from the rendered items. so i have to remove its icon and not from the favirtes only
    let item_from_list= document.getElementById(itemToDelete.id);
    item_from_list.classList.remove("star-green")
    item_from_list.classList.add("star-icon")
    delItemFromFavourties(itemToDelete)
    deleteItemFromStorage(itemToDelete);
    
}

// Store favourites to local storage API.
const storeItemToStorage = (itemToStore)=>{
    localStorage.setItem(itemToStore.id.toString(),itemToStore.parentNode.parentNode.parentNode.parentNode.outerHTML);
}
// delete favourites from local storage API.
const deleteItemFromStorage = (itemToDelete)=>{
    localStorage.removeItem(itemToDelete.id.toString());
}

// Event handlers for the app.
document.getElementById("search-btn").addEventListener("click",handle_search);
document.getElementById("search-bar").addEventListener("keyup",keyboardSupport)
document.querySelector(".init-items").addEventListener("click",handleFavourites);
document.querySelector(".init-favs").addEventListener("click",handleDeletionFromFavourtiesList);