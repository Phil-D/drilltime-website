/* drill time: preload only the active language's critical assets.
   The inline head script has already set <html dir> from localStorage, so the
   language is known here. Loaded async from 'self', so the CSP is unchanged.
   - Font: Varela Round for English, Beiruti for Arabic (the other is never preloaded).
   - LCP image: named by data-lcp-en / data-lcp-ar on this script tag (home page only), with optional
     data-lcp-en-srcset / data-lcp-ar-srcset and data-lcp-sizes so phones preload a smaller file.
     Both hero <img> tags carry data-lcp and loading="lazy", so the hidden language's
     image is never fetched; the active one is preloaded at high priority and switched
     to eager loading. */
(function(){
  var d=document, lang=d.documentElement.getAttribute('dir')==='rtl'?'ar':'en';
  var s=d.currentScript, h=d.head;
  function preload(href, as, type, high, srcset, sizes){
    var l=d.createElement('link');
    l.rel='preload'; l.as=as; l.href=href; l.type=type;
    if(as==='font') l.crossOrigin='anonymous';
    if(high) l.setAttribute('fetchpriority','high');
    if(srcset){ l.setAttribute('imagesrcset',srcset); l.setAttribute('imagesizes',sizes||'100vw'); }
    h.appendChild(l);
  }
  preload(lang==='ar'?'/fonts/beiruti.woff2':'/fonts/varela-round.woff2','font','font/woff2',false);

  var img=s&&s.getAttribute('data-lcp-'+lang);
  if(!img) return;
  preload(img,'image','image/webp',true,s.getAttribute('data-lcp-'+lang+'-srcset'),s.getAttribute('data-lcp-sizes'));

  function promote(n){
    if(n.nodeType===1&&n.tagName==='IMG'&&n.hasAttribute('data-lcp')&&n.classList.contains(lang)){
      n.setAttribute('loading','eager');
    }
  }
  [].forEach.call(d.querySelectorAll('img[data-lcp]'),promote);
  if(d.readyState!=='loading') return;
  var mo=new MutationObserver(function(recs){
    recs.forEach(function(r){[].forEach.call(r.addedNodes,promote);});
  });
  mo.observe(d.documentElement,{childList:true,subtree:true});
  d.addEventListener('DOMContentLoaded',function(){mo.disconnect();});
})();
