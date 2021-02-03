var staticCacheName = "pwa"; 
  
self.addEventListener("install", function (e) { 
  e.waitUntil( 
    caches.open(staticCacheName).then(function (cache) { 
      return cache.addAll(["/siclo/", "/siclo/manifest.json", "/siclo/index.html", "/siclo/p5.js", "/siclo/serviceworker.js", "/siclo/sketch.js", "/siclo/style.css"]);
    }) 
  ); 
}); 
  
self.addEventListener("fetch", function (event) { 
  console.log(event.request.url); 
  
  event.respondWith( 
    caches.match(event.request).then(function (response) { 
      return response || fetch(event.request); 
    }) 
  ); 
}); 