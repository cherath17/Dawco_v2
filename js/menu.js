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
  //   var topbar =  document.classList.remove("topbar");
  header.classList.add('top-bar');


  if (scrolled > 38) {
      header.classList.add('scrollin');

    //     header.classList.remove('top-bar');
    headerLogo1.classList.remove('show');
    headerLogo1.classList.add('hide');
    headerLogo2.classList.remove('hide');
    headerLogo2.classList.add('show');
    if(sidebar) sidebar.style.top='98px'
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
<!---------------------search result page start--------------------------->
var hsSearch = function(_instance) {
  var TYPEAHEAD_LIMIT = 3;
  var KEYS = {
    TAB: 'Tab',
    ESC: 'Esc', // IE11 & Edge 16 value for Escape
    ESCAPE: 'Escape',
    UP: 'Up', // IE11 & Edge 16 value for Arrow Up
    ARROW_UP: 'ArrowUp',
    DOWN: 'Down', // IE11 & Edge 16 value for Arrow Down
    ARROW_DOWN: 'ArrowDown',
  };
  var searchTerm = '',
      searchForm = _instance,
      searchField = _instance.querySelector('.hs-search-field__input'),
      searchResults = _instance.querySelector('.hs-search-field__suggestions'),
      searchOptions = function() {
        var formParams = [];
        var form = _instance.querySelector('form');
        for (
          var i = 0;
          i < form.querySelectorAll('input[type=hidden]').length;
          i++
        ) {
          var e = form.querySelectorAll('input[type=hidden]')[i];
          if (e.name !== 'limit') {
            formParams.push(
              encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value)
            );
          }
        }
        var queryString = formParams.join('&');
        return queryString;
      };

  var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
          args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait || 200);
      if (callNow) {
        func.apply(context, args);
      }
    };
  },
      emptySearchResults = function() {
        searchResults.innerHTML = '';
        searchField.focus();
        searchForm.classList.remove('hs-search-field--open');
      },
      fillSearchResults = function(response) {
        var items = [];
        items.push(
          "<li id='results-for'>Results for \"" + response.searchTerm + '"</li>'
        );
        response.results.forEach(function(val, index) {
          items.push(
            "<li id='result" +
            index +
            "'><a href='" +
            val.url +
            "'>" +
            val.title +
            '</a></li>'
          );
        });

        emptySearchResults();
        searchResults.innerHTML = items.join('');
        searchForm.classList.add('hs-search-field--open');
      },
      getSearchResults = function() {
        var request = new XMLHttpRequest();
        var requestUrl =
            '/_hcms/search?&term=' +
            encodeURIComponent(searchTerm) +
            '&limit=' +
            encodeURIComponent(TYPEAHEAD_LIMIT) +
            '&autocomplete=true&analytics=true&' +
            searchOptions();

        request.open('GET', requestUrl, true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            if (data.total > 0) {
              fillSearchResults(data);
              trapFocus();
            } else {
              emptySearchResults();
            }
          } else {
            console.error('Server reached, error retrieving results.');
          }
        };
        request.onerror = function() {
          console.error('Could not reach the server.');
        };
        request.send();
      },
      trapFocus = function() {
        var tabbable = [];
        tabbable.push(searchField);
        var tabbables = searchResults.getElementsByTagName('A');
        for (var i = 0; i < tabbables.length; i++) {
          tabbable.push(tabbables[i]);
        }
        var firstTabbable = tabbable[0],
            lastTabbable = tabbable[tabbable.length - 1];
        var tabResult = function(e) {
          if (e.target == lastTabbable && !e.shiftKey) {
            e.preventDefault();
            firstTabbable.focus();
          } else if (e.target == firstTabbable && e.shiftKey) {
            e.preventDefault();
            lastTabbable.focus();
          }
        },
            nextResult = function(e) {
              e.preventDefault();
              if (e.target == lastTabbable) {
                firstTabbable.focus();
              } else {
                tabbable.forEach(function(el) {
                  if (el == e.target) {
                    tabbable[tabbable.indexOf(el) + 1].focus();
                  }
                });
              }
            },
            lastResult = function(e) {
              e.preventDefault();
              if (e.target == firstTabbable) {
                lastTabbable.focus();
              } else {
                tabbable.forEach(function(el) {
                  if (el == e.target) {
                    tabbable[tabbable.indexOf(el) - 1].focus();
                  }
                });
              }
            };
        searchForm.addEventListener('keydown', function(e) {
          switch (e.key) {
            case KEYS.TAB:
              tabResult(e);
              break;
            case KEYS.ESC:
            case KEYS.ESCAPE:
              emptySearchResults();
              break;
            case KEYS.UP:
            case KEYS.ARROW_UP:
              lastResult(e);
              break;
            case KEYS.DOWN:
            case KEYS.ARROW_DOWN:
              nextResult(e);
              break;
          }
        });
      },
      isSearchTermPresent = debounce(function() {
        searchTerm = searchField.value;
        if (searchTerm.length > 2) {
          getSearchResults();
        } else if (searchTerm.length == 0) {
          emptySearchResults();
        }
      }, 250),
      init = (function() {
        searchField.addEventListener('input', function(e) {
          if (searchTerm != searchField.value) {
            isSearchTermPresent();
          }
        });
      })();
};

if (
  document.attachEvent
  ? document.readyState === 'complete'
  : document.readyState !== 'loading'
) {
  var searchResults = document.querySelectorAll('.hs-search-field');
  Array.prototype.forEach.call(searchResults, function(el) {
    var hsSearchModule = hsSearch(el);
  });
} else {
  document.addEventListener('DOMContentLoaded', function() {
    var searchResults = document.querySelectorAll('.hs-search-field');
    Array.prototype.forEach.call(searchResults, function(el) {
      var hsSearchModule = hsSearch(el);
    });
  });
}
<!---------------------search result page end--------------------------->
function toggleMenu() {
  var menuBox = document.getElementById('menu-box');    
  if(menuBox.style.display == "block") { // if is menuBox displayed, hide it
    menuBox.style.display = "none";
  }
  else { // if is menuBox hidden, display it
    menuBox.style.display = "block";
  }
}
<!---------------------menu start--------------------------->
const menu1 = document.getElementById('menu-div');
const close = document.getElementById('menu-box');
const sidebar = document.getElementById(`menu-box`);
sidebar?.addEventListener('mouseleave',()=>{
  sidebar.style.display='none';
})
const searchDiv = document.getElementById('input-sear');
const searchTop = document.getElementById('top-input');
const searchIcon = document.getElementById('sear');
const searchtIcon = document.getElementById('top-sear');

if(searchDiv) {

  searchDiv.style.display = 'none';
}
setTimeout(()=>{

}
           ,1000)

if(searchTop) {
  searchTop.style.display = 'none';
}


if(searchIcon){
  searchIcon.onclick = (e) => {
    if(searchDiv.style.display == "block") {
      if(sidebar) sidebar.style.display = "block";
      searchDiv.style.display = "none";
    }
    else { 
      e.stopPropagation();
      if(sidebar) sidebar.style.display = "none";
      searchDiv.style.display = "block";
    }
  }
}

if(searchtIcon){
  searchtIcon.onclick = (e) => {
    if(searchTop.style.display == "block") { 
      searchTop.style.display = "none";
    }
    else { 
      e.stopPropagation();
      searchTop.style.display = "block";
    }
  }
}
var ite = document.getElementsByClassName("close")[0];

if(ite) {
  ite.onclick = function() {
    searchDiv.style.display = "none";
  }
}

var ite2 = document.getElementById("close_top");
if(ite2) {
  ite2.onclick = function() {
    searchTop.style.display = "none";
  }
}
let previousMenuElement;
let previousSideBarIndex = 0;
var sidemenuIndex =0;
var rightsidemenuIndex=0;
function sidemenulength(){
  setTimeout(()=>{
    const sideBanner = document.getElementById("side_banner");
    if(document.getElementsByClassName('side_rightmenu')[rightsidemenuIndex].getBoundingClientRect().height > 0){
      document.getElementsByClassName('side-own')[sidemenuIndex].style.height='100%';
      //       document.getElementsByClassName('side-own')[sidemenuIndex].style.height =`${document.getElementsByClassName('side-own')[sidemenuIndex].getBoundingClientRect().height+5}px`;
      containersidenavheight=document.getElementsByClassName('side_rightmenu')[rightsidemenuIndex].getBoundingClientRect().height+100;
    }
    const sidenavheight=document.getElementsByClassName('side-own')[sidemenuIndex].getBoundingClientRect().height;
    let maxheight=containersidenavheight>=sidenavheight ? containersidenavheight : sidenavheight;
    if(maxheight>=500){
      maxheight=500;
      document.getElementsByClassName('dropdown-content-io')[rightsidemenuIndex].style.overflowY='scroll';
    }
    if(document.getElementsByClassName('side_rightmenu')[rightsidemenuIndex].getBoundingClientRect().height>0){
      document.getElementsByClassName('dropdown-content-io')[rightsidemenuIndex].style.height=`${maxheight}px`;
      document.getElementsByClassName('side-own')[sidemenuIndex].style.height=`${maxheight-5}px`;
      //       document.getElementsByClassName('dropdown-content-io')[rightsidemenuIndex].style.overflowY='hidden'
    }
    //     const sidebar1 = document.getElementById(`menu-box-${rightsidemenuIndex + 1}`);
    //     if(document.getElementsByClassName('dropdown-content-io')[rightsidemenuIndex].getBoundingClientRect().height>=500){
    //     document.getElementsByClassName('dropdown-content-io')[rightsidemenuIndex].style.overflowY='scroll';
    //     }else{
    //     document.getElementsByClassName('dropdown-content-io')[rightsidemenuIndex].style.overflowY='hidden'
    //     }
    //     const parentDivHeight = sidebar1.getBoundingClientRect().height;
    //     document.getElementsByClassName("dropdown-content-io")[rightsidemenuIndex].style.height = parentDivHeight + 'px';
  },10)
}
for(let i=0;i<menu1.getElementsByClassName('hs-menu-item hs-menu-depth-1 hs-item-has-children')?.length;i++) {

  const mainBox = menu1.getElementsByClassName('hs-menu-item hs-menu-depth-1 hs-item-has-children')[i];
  let sideOwn;
  mainBox.addEventListener('mouseover',()=>{
    rightsidemenuIndex=0;
    sidemenuIndex=i;
    const sidebar1 = document.getElementById(`menu-box-${i + 1}`);
    const parentDivHeight = sidebar1.getBoundingClientRect().height;
    sidebar1.style.display = "block";
    sideOwn = sidebar1.getElementsByClassName("side-own")[0];
    previousMenuElement = sideOwn;
    if(previousSideBarIndex == 0) {
      firstOption = sideOwn.getElementsByClassName("dropdown-io")[0];
      firstOption.style.backgroundColor = "white";
      //       firstOption.style.fontWeight = "700";
      if(firstOption.getElementsByClassName("dropdown-content-io")[0]) {
        firstOption.getElementsByClassName("dropdown-content-io")[0].style.display = "block";
        firstOption.getElementsByClassName("dropdown-content-io")[0].style.opacity=1;
        const macwindow=window.innerWidth<1500?-2:2
        const rightsideMenuBox = firstOption.getElementsByClassName("side_rightmenu")[0];
        const rightsideMenuSubBox = rightsideMenuBox.getElementsByClassName("p3-right__menu")[0];
        const cardsCount=2;
        let  numberofBox=Math.ceil(rightsideMenuSubBox.getElementsByClassName("p3-side__submenu").length/cardsCount);
        let singleElementHeight=0;
        if(Math.ceil(rightsideMenuSubBox.getElementsByClassName("p3-side__submenu").length>cardsCount)){
          if(numberofBox===2)
            singleElementHeight=(numberofBox*108)+91+macwindow;
          else
            singleElementHeight=(numberofBox*108)+109+macwindow;}
        else{
          singleElementHeight=182;
        }
        //        singleElementHeight+=macwindow
        document.getElementsByClassName('side-own')[sidemenuIndex].style.height=singleElementHeight+'px';
        //           ((rightsideMenuSubBox.getElementsByClassName("p3-side__submenu").length * 90))+'px';
      }
    }
    sidemenulength()
  });
  mainBox.addEventListener('mouseleave',()=>{
    previousSideBarIndex = 0
  })
}

const dropDown = document.getElementsByClassName("dropdown-io");
if(dropDown.length) {
  Array.from(dropDown)?.forEach((dElement,i) => {
    dElement.addEventListener("mouseover", function (e) {
      rightsidemenuIndex=i;
      e.stopPropagation();
      sidemenulength();
      if(previousMenuElement) {
        firstOption = previousMenuElement.getElementsByClassName("dropdown-io")[0];
        firstOption.style.backgroundColor = "transparent";
        if(firstOption.getElementsByClassName("dropdown-content-io")[0]) {
          firstOption.getElementsByClassName("dropdown-content-io")[0].style.display = "none";
          firstOption.getElementsByClassName("dropdown-content-io")[0].style.opacity=0;
        }   
      }

      dElement.getElementsByClassName("dropdown-content-io")[0].style.opacity = 0;
      Array.from(dElement.getElementsByClassName("dropdown-content-io"))?.forEach((dElementt,j)=>{
        dElementt.style.opacity=0;
      })
      document.getElementsByClassName("dropdown-content-io")[i].style.opacity=1;
      document.getElementsByClassName("dropdown-content-io")[i].style.display = "block";
      document.getElementsByClassName("dropdown-io")[i].style.backgroundColor = "white";
      document.getElementsByClassName("dropdown-io")[i].style.fontWeight = "700";


      //       $('.p3-header_mega').each( function() {
      //   $(this).outerHeight( $(this).parent().height() - ( $(this).offset().top - ( $(this).parent().offset().top + parseInt( $(this).parent().css('padding-top') ) ) ) )
      // });
    })
    dElement.addEventListener("mouseout", function (e) {
      e.stopPropagation();
      let previousSideBarIndex = i;
      Array.from(dElement.getElementsByClassName("dropdown-content-io"))?.forEach((dElementt,j)=>{
        dElementt.style.opacity=0;
      })

      if(dElement == document.getElementsByClassName("dropdown-io")[i]) {
        document.getElementsByClassName("dropdown-content-io")[i].style.display = "none";
        document.getElementsByClassName("dropdown-io")[i].style.backgroundColor = "transparent";
        document.getElementsByClassName("dropdown-io")[i].style.fontWeight = "400";
      }
    })
  })
}

if(document.getElementsByClassName("dropdown-content-io")[0]) {
  document.getElementsByClassName("dropdown-content-io")[0].style.display = "block";
  document.getElementsByClassName("dropdown-io")[0].style.backgroundColor = "white";
}

let containersidenavheight=document.getElementsByClassName('side_rightmenu')[0]?.getBoundingClientRect().height+100;
const sidenavheight=document.getElementsByClassName('side-own')[0]?.getBoundingClientRect().height;
const maxheight=containersidenavheight
if(document.getElementsByClassName('side-own')[0]) {
document.getElementsByClassName('side-own')[0].style.height=`${maxheight}px`;
}

// $('.side_rightmenu').each( function() {
//   $(this).outerHeight( $(this).parent().height() - ( $(this).offset().top - ( $(this).parent().offset().top + parseInt( $(this).parent().css('padding-top') ) ) ) )
// });



<!---------------------Menu End--------------------------->

<!---------------------Top search start--------------------------->
if (sidebar){
  sidebar.style.display = 'none';
}



function setClose(i){
  setTimeout(()=>{
    var closed = document.getElementsByClassName("closediv")
    for(let i=0;i<closed?.length;i++){
      closed[i].addEventListener('mouseover',(event)=>{
        event.stopPropagation();
        document.getElementById(`menu-box-${i + 1}`).style.display='none !important';
        document.getElementById(`menu-box-${i + 1}`).style.background='yellow';
      }
                                )}
  },1000)
  //   function closeDiv(){
  //     setTimeout(()=> {
  //       console.log(sidemenuIndex);
  //       document.getElementById(`menu-box-${sidemenuIndex}`).style.display='none !important';
  //       document.getElementById(`menu-box-${sidemenuIndex}`).style.height='0px';

  //       console.log(d
  //       .getElementById(`menu-box-${sidemenuIndex}`))
  //     },100)
  //   }
}


<!---------------------Top search end--------------------------->
