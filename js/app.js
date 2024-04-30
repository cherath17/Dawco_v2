requirejs.config({
  waitSeconds: 200,
  paths: {                   
    jquery: "https://mktg.dawco.ca/hubfs/MapJs/jquery",
    class: "https://mktg.dawco.ca/hubfs/MapJs/class",
    infobox: "https://mktg.dawco.ca/hubfs/MapJs/infobox",
    projectMap: "https://mktg.dawco.ca/hubfs/MapJs/projectMap",
    markerClusterer: "https://mktg.dawco.ca/hubfs/MapJs/markerClusterer",
    mainmap: "https://mktg.dawco.ca/hubfs/MapJs/mainmap"    
  },
  shim: {
    infobox: {},
    owlCarousel: {
      deps: ["jquery"],
    },
    mainmap: {
      deps: ["jquery", "class", "projectMap"]
    }
  }
});

requirejs(["https://mktg.dawco.ca/hubfs/MapJs/mainmap.js"]);