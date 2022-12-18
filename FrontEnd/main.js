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
document.getElementById('contentPage').style.display = 'none';
function startFunction(){
  document.getElementById('landingPage').style.display = 'none';
  document.getElementById('contentPage').style.display = 'block';
}

/* ========================================================================
  * Carousel
  * ======================================================================== */

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}