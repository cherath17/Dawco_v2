$(".p3_submenu__section .p3_submenu__content a").click(function() {
  $(this).parent().addClass('selected').siblings().removeClass('selected');
})

var fixmeTop = $('.p3_submenu__section').offset().top;
var menuHeight = $(".p3-header__section").height();
$(window).scroll(function() {

  var currentScroll = $(window).scrollTop();

  if (currentScroll >= fixmeTop) {
    $('.p3_submenu__section').css({
      'position': 'fixed',
      'top': menuHeight,
      'left': '0',
      'z-index': '999',
      'width': '100%',
      'padding': '15px 0'
    });
  } else {
    $('.p3_submenu__section').css({
      position: 'static'
    });
  }

});