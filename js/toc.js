/* Guides: mark the section being read in the "On this page" sidebar. The contents list works without it. */
(function(){
  var links=document.querySelectorAll('.toc-side a[href^="#"]');
  if(!links.length||!('IntersectionObserver' in window)) return;
  var map={}, heads=[];
  links.forEach(function(a){ var h=document.getElementById(a.getAttribute('href').slice(1)); if(h){ map[h.id]=a; heads.push(h); } });
  function update(){
    var cur=null;
    heads.forEach(function(h){ if(h.getBoundingClientRect().top<window.innerHeight*0.3) cur=h.id; });
    links.forEach(function(a){ a.removeAttribute('aria-current'); });
    if(cur&&map[cur]) map[cur].setAttribute('aria-current','location');
  }
  var io=new IntersectionObserver(update,{rootMargin:'0px 0px -70% 0px'});
  heads.forEach(function(h){ io.observe(h); });
})();
