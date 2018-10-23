

// $(".myButton").click(function(){
//   var counter=0;
//   var imgs = [ "#ffcc00",
//                "#008000",
//                "#0000cc",
//                "#ff0000",
//                "#804000",
//                "#999999",
//                "#600080",
//                "#ff33cc",
//                "#0099ff"
//   ]
   
// if(counter === imgs.length) counter = 0;
// $("#one").css("background-color", imgs[counter]);

// counter++;
// });
var instance = M.Carousel.init({
  fullWidth: true,
  indicators: true
});

// Or with jQuery

$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});