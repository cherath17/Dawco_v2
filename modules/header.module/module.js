const isElementLoaded = async selector => {
    while ( document.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector);
};

isElementLoaded(".p3-header__icon-burger").then( burger => {
    burger.addEventListener("click", ouvrirMenu);
});

isElementLoaded(".close-menu").then( btnFerme => {
    btnFerme.addEventListener("click", fermerMenu);
});

window.onscroll = function() {
  var header = document.getElementsByTagName('header')[0];
  var headerLogo1 = document.getElementsByClassName('p3-header__logo')[0];
  var headerLogo2 = document.getElementsByClassName('p3-header__logo')[1];
  var scrolled = document.scrollingElement.scrollTop;
  
  if (scrolled > 38) {
    header.classList.add('scrollin');
    headerLogo1.classList.remove('show');
    headerLogo1.classList.add('hide');
    headerLogo2.classList.remove('hide');
    headerLogo2.classList.add('show');
  } else {
    header.classList.remove('scrollin');
    headerLogo1.classList.remove('hide');
    headerLogo1.classList.add('show');
    headerLogo1.classList.remove('show');
    headerLogo1.classList.add('hide');
  }
};


function ouvrirMenu() {
    isElementLoaded(".p3-header__menu-lateral").then( el => {
        el.classList.add("lateral-menu-visible");
    });
}

function fermerMenu() {
    isElementLoaded(".p3-header__menu-lateral").then( el => {
        el.classList.remove("lateral-menu-visible");
    });
}



var burger = document.getElementsByClassName('js_toggle_main_nav')[0];
var mainMenu = document.getElementsByClassName('p3-header__mobile_menu')[0];

burger.addEventListener('click', function() {
  this.classList.toggle('active');
  mainMenu.classList.toggle('opened_nav');
  return false;
}, false);

