// DRAGGABLE STICKER STUFF 

// Make the DIV element draggable:
var draggableElements = document.getElementsByClassName("sticker");

for(var i = 0; i < draggableElements.length; i++){
    dragElement(draggableElements[i]);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// ENTRIES BOX FUNCTIONS

const entriesContainer = document.querySelector(".entries-container");
const createBtn = document.querySelector(".btn");
let entries = document.querySelectorAll(".input-box");

function showEntries(){
    entriesContainer.innerHTML = localStorage.getItem("entries");
}
showEntries();

function updateStorage() {
    localStorage.setItem("entries", entriesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    // Clear existing content in the entries container
    entriesContainer.innerHTML = "";

    // Create a new entry
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    entriesContainer.appendChild(inputBox).appendChild(img);
});

entriesContainer.addEventListener("click", function(e){
  if(e.target.tagName === "IMG"){
      e.target.parentElement.remove();
      updateStorage();
  }
  else if(e.target.tagName === "P"){
      entries = document.querySelectorAll(".input-box");
      entries.forEach(en => {
          en.onkeyup = function(){
              updateStorage();
          }
      })
  }
})

// createBtn.addEventListener("click", ()=>{
//     let inputBox = document.createElement("p");
//     let img = document.createElement("img");
//     inputBox.className = "input-box";
//     inputBox.setAttribute("contenteditable", "true");
//     img.src = "images/delete.png";
//     entriesContainer.appendChild(inputBox).appendChild(img);
// })

// entriesContainer.addEventListener("click", function(e){
//     if(e.target.tagName === "IMG"){
//         e.target.parentElement.remove();
//         updateStorage();
//     }
//     else if(e.target.tagName === "P"){
//         entries = document.querySelectorAll(".input-box");
//         entries.forEach(en => {
//             en.onkeyup = function(){
//                 updateStorage();
//             }
//         })
//     }
// })

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
