/* Home: English/Arabic toggle that remembers the choice (same behaviour as before).
   The inline head script applies a saved choice before first paint; this wires the buttons. */
(function(){
  function applyLang(lang){
    var h=document.documentElement;
    if(lang==='ar'){h.setAttribute('dir','rtl');h.setAttribute('lang','ar');}
    else{h.setAttribute('dir','ltr');h.setAttribute('lang','en');}
    try{localStorage.setItem('dt_lang',lang);}catch(e){}
  }
  document.querySelectorAll('.langbtn,.flang').forEach(function(b){
    b.addEventListener('click',function(){ applyLang(document.documentElement.getAttribute('dir')==='rtl'?'en':'ar'); });
  });
  try{var s=localStorage.getItem('dt_lang');if(s)applyLang(s);}catch(e){}
})();
