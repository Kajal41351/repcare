var counter = 0;
function changeBG(){
  var imgs = [
    "url(/img/gal1.png)",
    "url(/img/gal2.jpg)",
    "url(/img/gal3.jpg)",
    "url(/img/gal3b.jpg)",
    "url(/img/gal4.jpg)",
    "url(/img/gal4b.jpg)",
    "url(/img/gal5.jpg)",
    "url(/img/gal6.jpg)",
    "url(/img/gal7.jpg)",
    "url(/img/gal8.png)"
  ]
   
if(counter === imgs.length) counter = 0;
$(".whole1").css("background-image", imgs[counter]);

counter++;
}
setInterval(changeBG,2500);

