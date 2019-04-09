function indexInit() { //Set Page And Nav Origin
    var elem = document.getElementsByClassName("bar-item");
    elem[0].classList.add("colored");

    var element = document.getElementById("menu1");
    element.classList.add("active");
    element.classList.remove("source");
}

function myFunction4(num, pos, dir) { //Set Page Set Nav
    var elem = document.getElementsByClassName("colored");
    if (elem.length > 0){
        elem[0].classList.remove("colored");
    }

    if (dir == 0){
        var elem = document.getElementsByClassName("bar-item");
        elem[pos].classList.add("colored"); //'pos' use
    } else if (dir == 1){
        var elem = document.getElementsByClassName("bar-item");
        elem[pos-1].classList.add("colored"); //'pos' use
    } else if (dir == 2){
        var x = +pos + 1; //("menu"+x); 'x' increment use
        var elem = document.getElementsByClassName("bar-item");
        elem[x].classList.add("colored");  //'x' use
    }



    var element = document.getElementsByClassName("active");
    if (element.length > 0){
        element[0].classList.add("source");
        element[0].classList.remove("active");
    }

    if (dir == 0){
        var element = document.getElementById("menu"+pos);
        element.classList.remove("source");
        element.classList.add("active");
    } else if (dir == 1){
        var element = document.getElementById(num); //'num' use
        element.classList.remove("source");
        element.classList.add("active");
    } else if (dir == 2){
        var element = document.getElementById("menu"+x);  //'x' use
        element.classList.remove("source");
        element.classList.add("active");
    }

}

function myFunction3(num, pos) { //Change Page Same Nav
    var elem = document.getElementsByClassName("active");
    elem[0].classList.add("source");
    elem[0].classList.remove("active");
    var element = document.getElementById(num);
    element.classList.add("active");
    element.classList.remove("source");
}

function myFunction2(num, pos) { //Set Page Set Nav
    var elem = document.getElementsByClassName("bar-item");
    elem[pos-2].classList.add("colored");

    var element = document.getElementById(num);
    element.classList.add("active");
    element.classList.remove("source");
}

function myFunction(num, pos) {  //Change Page Change Nav
	var elem = document.getElementsByClassName("colored");
	elem[0].classList.remove("colored");
	var elem = document.getElementsByClassName("bar-item");
	elem[pos-1].classList.add("colored");

	var elem = document.getElementsByClassName("active");
	elem[0].classList.add("source");
	elem[0].classList.remove("active");
    var element = document.getElementById(num);
    element.classList.add("active");
    element.classList.remove("source");
}

function on(num) { //Lights Off
    var elem = document.getElementsByClassName("overlay");
    elem[num].style.display = "block";
}

function off(num) { //Lights On
    var elem = document.getElementsByClassName("overlay");
    elem[num].style.display = "none";
}

//Utilizado no detail.html
function slice(num, list, dir) {
    list = list.replace(/\s/g, '');
    list = list.replace('[', '');
    list = list.replace(']', '');
    list = list.split(',')

    for (var i = 0; i < list.length; i++) {
        if (list[i] == num) {
            if (dir == 0) {
                window.location = "../"+list[i+1];
            } else {
                window.location = "../"+list[i-1];
            }
        }
    }
}



window.onscroll = function() {myScroll()};

function myScroll() {
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    } else {
    header.classList.remove("sticky");
    }
}



//Process Images -----------
// Get the modal
window.onload = function(){
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var imag = document.getElementsByClassName("myImg"); //Antigo: getElementById('myImg');

    for (var i = 0; i < imag.length; i++) { // imag.length = Números de elementos com classe "myImg"

        var img = imag[i]; // Acessando cada elemento com classe "myImg"

        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        img.onclick = function(){

            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;

            magnify("img01", 2); // CHAMA LUPA

        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() { 
          modal.style.display = "none";

          // remove DIV da LUPA
          var cTarget = document.getElementsByClassName("img-magnifier-glass")[0];
          var tr = cTarget;
          tr.parentNode.removeChild(tr);
          // end remove DIV da LUPA
        }
    }
}





/* LUPA */

function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /*set the position of the magnifier glass:*/
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}


//end Process Images -----------


// progressive-image.js
if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) window.addEventListener('load', function() {

  // start
  var pItem = document.getElementsByClassName('progressive replace'), timer;

  window.addEventListener('scroll', scroller, false);
  window.addEventListener('resize', scroller, false);
  inView();


  // throttled scroll/resize
  function scroller(e) {

    timer = timer || setTimeout(function() {
      timer = null;
      requestAnimationFrame(inView);
    }, 300);

  }


  // image in view?
  function inView() {

    var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;
    while (p < pItem.length) {

      cRect = pItem[p].getBoundingClientRect();
      pT = wT + cRect.top;
      pB = pT + cRect.height;

      if (wT < pB && wB > pT) {
        loadFullImage(pItem[p]);
        pItem[p].classList.remove('replace');
      }
      else p++;

    }

  }


  // replace with full image
  function loadFullImage(item) {

    if (!item || !item.href) return;

    // load image
    var img = new Image();
    if (item.dataset) {
      img.srcset = item.dataset.srcset || '';
      img.sizes = item.dataset.sizes || '';
    }
    img.src = item.href;
    img.className = 'reveal';
    if (img.complete) addImg();
    else img.onload = addImg;

    // replace image
    function addImg() {

      // disable click
      item.addEventListener('click', function(e) { e.preventDefault(); }, false);

      // add full image
      item.appendChild(img).addEventListener('animationend', function(e) {

        // remove preview image
        var pImg = item.querySelector && item.querySelector('img.preview');
        if (pImg) {
          e.target.alt = pImg.alt || '';
          item.removeChild(pImg);
          e.target.classList.remove('reveal');
        }

      });

    }

  }

}, false);