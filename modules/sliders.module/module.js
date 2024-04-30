let $ = document;

$.addEventListener("DOMContentLoaded", function () {
  const sliderMe = () => {
    let currentIndex = 0;
    let currentPosition = 0,
        sliderItem = document.querySelectorAll(".slider-item"),
        sliderItemWidth = window
    .getComputedStyle(sliderItem[0])
    .flexBasis.match(/\d+\.?\d+/g),
        sliderInner = $.querySelector(".slider-inner"),
        control = {
          next: $.querySelector("#next"),
          slideNext() {
            currentPosition += parseFloat(sliderItemWidth);
            currentIndex++;
            console.log("currentPosition", currentPosition)
            console.log("CurrentIndex", currentIndex)
            if (currentPosition > limitPosition) {
              currentPosition = 0;
              currentIndex = 0;
            }
            setCurrentIndex(currentIndex);
            sliderInner.style.right = currentPosition + "%";
            console.log("Current Index", currentIndex)
            const boxLength = document.getElementsByClassName('slider-item').length
            for (let i = 0; i < boxLength; i++ ) {
              document.getElementsByClassName('slider-item')[i].style.opacity = "1"
            }
            if((currentIndex + 2) < boxLength) {
              document.getElementsByClassName('slider-item')[currentIndex + 2].style.opacity = "0.5";
            } else {
              for (let i = 0; i < boxLength; i++ ) {
                document.getElementsByClassName('slider-item')[i].style.opacity = "1";
              }
            }
          },
          prev: $.querySelector("#prev"),
          slidePrev() {
            currentPosition -= parseFloat(sliderItemWidth);
            currentIndex--;
            if (currentPosition < 0) {
              currentPosition = limitPosition;
              currentIndex = document.getElementsByClassName('slider-item')?.length - 1;
            }
            setCurrentIndex(currentIndex);
            sliderInner.style.right = currentPosition + "%";
            console.log("Previews Index", currentIndex);
            const boxLength = document.getElementsByClassName('slider-item').length
            for (let i = 0; i < boxLength; i++ ) {
              document.getElementsByClassName('slider-item')[i].style.opacity = "1"
            }
            if((currentIndex + 2) < boxLength) {
              document.getElementsByClassName('slider-item')[currentIndex + 2].style.opacity = "0.5";
            } else {
              for (let i = 0; i < boxLength; i++ ) {
                document.getElementsByClassName('slider-item')[i].style.opacity = "1";
              }
            }
          },
          slideIndex(index) {
            currentPosition = parseFloat(sliderItemWidth) * index;
            if (currentPosition < 0) {
              currentPosition = limitPosition;
            } else if (currentPosition > limitPosition) {
              currentPosition = 0;
            }
            currentIndex = index;
            sliderInner.style.right = currentPosition + "%";
          },
        },

        limitPosition =
        sliderItemWidth *
        ((document.getElementsByClassName('slider-item').length + 1) - Math.floor(100 / sliderItemWidth));
    const dotElement = $.getElementById("dots");
    // const slideIndex=sliderItem.length;
    // console.log(sliderItem?.length)
    dotElement.innerText = "";
    const boxLen = document.getElementsByClassName('slider-item').length
    for (let i = 0; i < boxLen; i++) {
      const dot = document.createElement("div");
      dot.innerHTML = `<div class="dot" id="box-dot${i}"></div>`;
      //       dot.addEventListener("click", () => {
      //         control.slideIndex(i);
      //         for (let j = 0; j < boxLen - 2; j++) {
      //           document
      //             .getElementsByClassName("dot")
      //             .item(j)
      //             .classList.remove("active-dot");
      //         }
      //         document
      //           .getElementsByClassName("dot")
      //           .item(i)
      //           .classList.add("active-dot");
      //       });
      dot.addEventListener("click", () => {
        dotClickBox(i);
      })
      dotElement.appendChild(dot);
      setTimeout(() => {
        setCurrentIndex(currentIndex);
      }, 10);

      // dots[i].className = dots[i].className.replace(" active", "");
    }

    function dotClickBox(index) {
      console.log(index);
      const dotLength = document.getElementsByClassName('dot').length;
      for( let i = 0; i < dotLength; i++ ) {
        document.getElementsByClassName('dot').item(i).classList.remove("active-dot");
        document.getElementsByClassName('slider-item')[i].style.opacity = "1";
      }
      document.getElementById(`box-dot${index}`).classList.add("active-dot");
      if(window.innerWidth < 480) {
        document.getElementsByClassName('slider-inner')[0].style.right = String(index * 100) + "%";
      } else {
        document.getElementsByClassName('slider-inner')[0].style.right = String(index * 34) + "%";
      }
      if((index + 2) < dotLength) {
        document.getElementsByClassName('slider-item')[index + 2].style.opacity = "0.5";
      } 
      //       else {
      //         document.getElementsByClassName('slider-item')[index + 2].style.opacity = "1";
      //       }
    }

    function setCurrentIndex(index) {
      //       const boxLen = document.getElementsByClassName('slider-item').length
      //       for (let j = 0; j < boxLen; j++) {
      //         document
      //           .getElementsByClassName("dot")
      //           .item(j)
      //           .classList.remove("active-dot");
      //       }
      //       document
      //         .getElementsByClassName("dot")
      //         .item(index)
      //         .classList.add("active-dot");
      dotClickBox(index)
    }
    // dots[slideIndex-1].className += " active";
    //   for(const i=0;i<=10;i+1){
    //     console.log(i)
    // }

    control.next.addEventListener("click", control.slideNext);
    control.prev.addEventListener("click", control.slidePrev);
    window.addEventListener("resize", function () {
      currentPosition = 0;
      $.querySelector(".slider-inner").style.right = currentPosition + "%";
    });
  };

  sliderMe();
  window.addEventListener("resize", sliderMe);
});

document.getElementsByClassName('slider-item')[2].style.opacity = "0.5";



// Accordion script

const items = document.querySelectorAll(".accordion button");
items[0].setAttribute("aria-expanded", "true");
function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));


 

// CURSOR ANIMATION IMAGE


// 3D Effect script 

let el = document.getElementById('tilt');
const height = el.clientHeight;
const width = el.clientWidth;
el.addEventListener('mousemove', handleMove);
function handleMove(e) {
  const xVal = e.layerX;
  /* Store the y position */
  const yVal = e.layerY;
  const yRotation = 20 * ((xVal - width / 2) / width);
  const xRotation = -20 * ((yVal - height / 2) / height);
  const string = 'perspective(500px) scale(1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
  el.style.transform = string;
}

el.addEventListener('mouseout', function () {
  el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
});

el.addEventListener('mousedown', function () {
  el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
});

el.addEventListener('mouseup', function () {
  el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
});
