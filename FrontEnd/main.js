/* ========================================================================
 * Header PopUps
 * ======================================================================== */

//Refrences Popup
const refPop = document.querySelector(".refPop");
const ref_closeButton = document.querySelector(".ref-close-button");

function refrenceFunction(){
  refPop.classList.toggle("show-refpopup");
}

function refwindowOnClick(event){
  if (event.target === refPop){
    refrenceFunction();
  }
}

ref_closeButton.addEventListener("click",refrenceFunction);
window.addEventListener("click", refwindowOnClick);

//Contacts Popup
const conPop = document.querySelector(".conPop");
const con_closeButton = document.querySelector(".con-close-button");

function contactFunction(){
  conPop.classList.toggle("show-conpopup");
}

function conwindowOnClick(event){
  if (event.target === conPop){
    contactFunction();
  }
}

con_closeButton.addEventListener("click",contactFunction);
window.addEventListener("click", conwindowOnClick);

/* ========================================================================
 * Start
 * ======================================================================== */

function startFunction(){
  window.location.assign("project.html");
}