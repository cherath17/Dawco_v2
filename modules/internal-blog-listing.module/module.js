const valueChange = (e, origin) => {
  const searchParam = new URLSearchParams(window.location.search);
  searchParam.set(origin, e.target.value);
  window.location.search = searchParam.toString();
  return;
}

$('#tag-filter').change((e) => valueChange(e, 'tag'));
$('#author-filter').change((e) => valueChange(e, 'author'));

$(function () {
  $(".accordion-content:not(:first-of-type)").css("display", "none");
  $(".js-accordion-title:first-of-type").addClass("open");
  $(".js-accordion-title").click(function () {
    $(".open").not(this).removeClass("open").next().slideUp(300);
    $(this).toggleClass("open").next().slideToggle(300);
  });
});