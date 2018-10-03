var counter = 0;
function changeBG(){
  var imgs = [
    "url(/img/h1.jpeg)",
    "url(/img/h2.jpg)",
    "url(/img/h3.jpg)",
    "url(/img/h4.jpg)",
    "url(/img/h5.jpg)",
    "url(/img/h6.jpg)",
    "url(/img/h7.jpg)",
    "url(/img/h8.jpg)",
    "url(/img/h9.jpg)",
    "url(/img/h10.jpg)"
  ]
   
if(counter === imgs.length) counter = 0;
$("body").css("background-image", imgs[counter]);

counter++;
}
setInterval(changeBG,3000);
