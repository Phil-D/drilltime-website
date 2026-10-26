/* Slim App Store bar: hidden until the page's main App Store button has scrolled up out of view
   (on a page with no App Store button above the bar, until the hero has). A transform slide only,
   so nothing shifts. Without JavaScript, or without IntersectionObserver, the bar stays hidden. */
(function () {
  var bar = document.querySelector(".buybar");
  if (!bar || !("IntersectionObserver" in window)) return;
  var target = null, links = document.querySelectorAll("a[data-appstore]");
  for (var i = 0; i < links.length; i++) {
    if (bar.contains(links[i])) continue;
    if (links[i].compareDocumentPosition(bar) & Node.DOCUMENT_POSITION_FOLLOWING) target = links[i];
    break;
  }
  target = target || bar.previousElementSibling;
  if (!target) return;
  new IntersectionObserver(function (entries) {
    var e = entries[entries.length - 1];
    bar.classList.toggle("is-shown", !e.isIntersecting && e.boundingClientRect.bottom <= 0);
  }).observe(target);
})();
