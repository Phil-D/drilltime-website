/* Gentle fade-in for the tool page sections. Content is visible without this script;
   it only hides sections that start below the fold, and does nothing with reduced motion. */
(function(){
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('[data-reveal]').forEach(function(el){
    if((el.closest('section')||el).getBoundingClientRect().top<window.innerHeight) return;
    el.classList.add('rv'); io.observe(el);
  });
})();
