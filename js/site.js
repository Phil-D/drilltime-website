function applyLang(lang){
  const html=document.documentElement;
  if(lang==='ar'){html.setAttribute('dir','rtl');html.setAttribute('lang','ar');}
  else{html.setAttribute('dir','ltr');html.setAttribute('lang','en');}
  try{localStorage.setItem('dt_lang',lang);}catch(e){}
}
function toggleLang(){
  const cur=document.documentElement.getAttribute('dir')==='rtl'?'ar':'en';
  applyLang(cur==='ar'?'en':'ar');
}
try{const saved=localStorage.getItem('dt_lang');if(saved)applyLang(saved);}catch(e){}

(function(){
  var u='drilltime', d='drilltimeapp', t='com';
  var addr=u+'\u0040'+d+'.'+t;
  document.querySelectorAll('.em-link').forEach(function(a){
    a.href='mailto:'+addr;
    var kids=a.childNodes, lastText=null;
    for(var i=kids.length-1;i>=0;i--){ if(kids[i].nodeType===3 && kids[i].textContent.trim()){ lastText=kids[i]; break; } }
    if(lastText && a.children.length){ lastText.textContent=' '+addr; }
    else{ a.textContent=addr; }
  });
})();
