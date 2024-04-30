window.addEventListener('load', () => {
    swiffyslider.init();
    swiffyslider.init(document.getElementById('p3-slider__wrapper'));
});


// let slideValue = 0;
// let imgCount = 1;
// let nbOfImg = 0;
// let active;

// const isElementLoaded = async selector => {
//     while ( document.querySelector(selector) === null) {
//       await new Promise( resolve =>  requestAnimationFrame(resolve) )
//     }
//     return document.querySelector(selector);
//   };

//   const isElementsLoaded = async selector => {
//     while ( document.querySelectorAll(selector) === null) {
//       await new Promise( resolve =>  requestAnimationFrame(resolve) )
//     }
//     return document.querySelectorAll(selector);
//   };

// function hideShowSlideBtn() {
//     isElementLoaded(".p3-slider__btn_prev").then(btn => {
//         if(imgCount == 1) {
//             btn.classList.add("hide");
//             btn.classList.remove("show");
//         } else {
//             btn.classList.remove("hide");
//             btn.classList.add("show");
//         }
//     });
//     isElementLoaded(".p3-slider__btn_next").then(btn => {
//         if(imgCount == nbOfImg) {
//             btn.classList.add("hide");
//             btn.classList.remove("show");
//         } else {
//             btn.classList.remove("hide");
//             btn.classList.add("show");
//         }
//     });
// }

// hideShowSlideBtn();

// function nextImage() {
//     isElementLoaded(".p3-slider__btn_next").then(btn => {
//         btn.addEventListener("click", () => {
//             imgCount++;
//             hideShowSlideBtn();

//             if((nbOfImg -1)*100 == Math.abs(slideValue)) return;
//             isElementLoaded(".p3-slider__images").then((el) => {
//                 slideValue -= 100;
//                 el.style.transform = `translateX(${slideValue}%)`;
//             });
//         });
//     });
// }

// nextImage();

// function prevImage() {
//     isElementLoaded(".p3-slider__btn_prev").then(btn => {
//         btn.addEventListener("click", () => {
//             imgCount--;
//             hideShowSlideBtn();
//             if(slideValue == 0) return;
//             isElementLoaded(".p3-slider__images").then((el) => {
//                 slideValue += 100;
//                 el.style.transform = `translateX(${slideValue}%)`;
//             });
//         });
//     });
// }

// prevImage();

// function fetchLesImgs() {
//     isElementsLoaded(".p3-slider__images img").then(el => nbOfImg = el.length);
// }
// fetchLesImgs();


// // Bullet navigation

// function bulletActive() {
//     isElementLoaded(`.bullet-${imgCount}`).then(bullet => {
//         if(active == undefined) {
//             bullet.classList.add("active-bullet");
//             active = bullet;
//         } else {
//             if(active != bullet) {
//                 active.classList.remove("active-bullet");
//                 bullet.classList.add("active-bullet");
//                 active = bullet;
//             }
//         }
//     });
// }
// bulletActive();
// document.addEventListener("click", bulletActive);

// function fetchBulletsEls() {
//     isElementsLoaded(".bullet").then(bullets => {
//         bullets.forEach((bullet, index) => {
//             bullet.addEventListener("click", () => {
//                 goToImg(index+1,(index+1)*100);
//             });
//         })
//     });
// }

// fetchBulletsEls();

// function goToImg(nthImg, amountToSlide) {
//     isElementLoaded(".p3-slider__images").then(el => {
//         let amountToTranslate;
//         if(imgCount*100 < amountToSlide) {
//             hideShowSlideBtn();
//             amountToTranslate = amountToSlide - (imgCount*100);
//             slideValue -= amountToTranslate;
//             el.style.transform = `translateX(${slideValue}%)`;
//             imgCount = nthImg;
//         } else {
//             hideShowSlideBtn();
//             amountToTranslate = (imgCount*100) - amountToSlide;
//             slideValue += amountToTranslate;
//             el.style.transform = `translateX(${slideValue}%)`;
//             imgCount = nthImg;
//         }
//     });
// }

