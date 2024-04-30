const isMobile = window.innerWidth;
const istablet = window.innerWidth;
const progress = document.getElementById("progress");
const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");
const prev1 = document.getElementById("prevBtn1");
const next1 = document.getElementById("nextBtn1");
const circles = document.querySelectorAll(".circle");
const allSets = document.getElementById("sets");
const cards = document.getElementsByClassName("card1");
const progressContainer = document.getElementsByClassName("progress-container")[0];





let currentValue = 1;



if(isMobile < 480) {
  console.log("Mobile View")
}

circles[0].classList.add("active");



singleProgressWidth=Math.floor(progressContainer.offsetWidth/cards.length);
progress.style.width=(currentValue*singleProgressWidth+5)+'px';

function nextBtn() {
  currentValue++;

  if(isMobile < 480) {
    if (currentValue > cards.length) {
      currentValue = cards.length;
    }
    allSets.scrollBy({ 
      top:0, 
      left:280, 
      behavior:"smooth" 
    })
    progress.style.width=(currentValue*singleProgressWidth+12)+'px'

  }
  else if(istablet < 857){
    if (currentValue > cards.length) {
      currentValue = cards.length;
    }
    allSets.scrollBy({ 
      top:0, 
      left:430, 
      behavior:"smooth" 
    })
    progress.style.width=(currentValue*singleProgressWidth+12)+'px'
  }
  else {
    if (currentValue > circles.length) {
      currentValue = circles.length;
    }

    allSets.scrollBy({ 
      top:0, 
      left:955, 
      behavior:"smooth" 
    })
  }
  update();
}

next.addEventListener("click", function () {
  nextBtn();
});
next1.addEventListener("click", function () {
  nextBtn();
});

function prevBtn() {
  currentValue--;
  if (currentValue < 1) {
    currentValue = 1;
  }
  if(isMobile < 480) {
    allSets.scrollBy({ 
      top:0, 
      left:-280, 
      behavior:"smooth" 
    })
    singleProgressWidth=Math.floor(progressContainer.offsetWidth/cards.length);
    progress.style.width=(currentValue*singleProgressWidth)+'px'

  } 
  else if(istablet < 857){
    if (currentValue > cards.length) {
      currentValue = cards.length;
    }
    allSets.scrollBy({ 
      top:0, 
      left:-430, 
      behavior:"smooth" 
    })
    progress.style.width=(currentValue*singleProgressWidth+12)+'px'
  }
  else {
    allSets.scrollBy({ 
      top:0, 
      left:-1122, 
      behavior:"smooth" 
    })
  }
  update();
}
prev.addEventListener("click", function () {
  prevBtn();
});

prev1.addEventListener("click", function () {
  prevBtn();
});

function update() {
  if(isMobile < 480) {
    circles.forEach((circle, index) => {
      const qoutient = Math.floor(currentValue/4);
      console.log(qoutient,"---",currentValue)
      if (index <= qoutient) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    })

  } else {
    circles.forEach((circle, index) => {
      if (index < currentValue) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    });
    const actives = document.querySelectorAll(".active");
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) *100 + "%";
  }

  if(currentValue === cards.length) {
    next.disabled = true
  }
  else if (currentValue <= 1) {
    prev.disabled = true
  }
  else{ 
    next.disabled = false
    prev.disabled = false
  }
}
