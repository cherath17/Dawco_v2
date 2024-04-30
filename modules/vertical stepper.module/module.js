document.addEventListener("DOMContentLoaded", function(){
    if($('.row-fluid .timeline-with-scrolling-animation-timeline-main').length > 0){
        
            if($('.row-fluid .timeline-with-scrolling-animation-timeline-main').length > 0){
                var timelineOuter = $('.row-fluid .timeline-with-scrolling-animation-timeline-main .timeline-with-scrolling-animation-timeline-outer').height();
                $('<div class="mid-line"></div>').insertAfter('.row-fluid .timeline-with-scrolling-animation-timeline-main .timeline-with-scrolling-animation-timeline-outer .timeline-section:last-child');
            }
            // timeline
            for (var i = $(".row-fluid .timeline-with-scrolling-animation-timeline-main .timeline-with-scrolling-animation-timeline-outer").outerHeight() + 100, n = new ScrollMagic.Controller, o = (new ScrollMagic.Scene({
                triggerElement: ".row-fluid .timeline-with-scrolling-animation-timeline-main .timeline-with-scrolling-animation-timeline-outer",
                duration: i, 
                triggerHook: 0.6
            }).addTo(n).reverse(false).on("progress", (function(e) {
                $(".row-fluid .timeline-with-scrolling-animation-timeline-main .timeline-with-scrolling-animation-timeline-outer .mid-line").css("height", 100 * e.progress + "%")
            })), document.getElementsByClassName("timeline-section")), s = 0; s < o.length; s++) new ScrollMagic.Scene({
                triggerElement: o[s],
                triggerHook: 0.6 
            }).setClassToggle(o[s], "visible").reverse(false).addTo(n);
        
    }
});