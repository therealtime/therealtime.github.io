var lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
      // downscroll code
      if(window.pageYOffset > 150){
        document.getElementById("logo").class = "img-nav";
        //document.getElementById("logo").src = "./images/logo2.png";
        document.getElementById("logo").src = "./images/Accelabit-GIF-white.gif";
      }
   } else {
      // upscroll code
      if(window.pageYOffset < 150){
        document.getElementById("logo").class = "img-nav";
        document.getElementById("logo").src = "./images/Accelabit-GIF-blk.gif";
      }
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
