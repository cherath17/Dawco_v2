document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.p3-footer__wrapper .back-to-top')) {
    document.querySelector('.p3-footer__wrapper .back-to-top').addEventListener("click", function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});






