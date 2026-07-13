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

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq-item');
      var open=item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Back to top
  var toTop=document.getElementById('toTop');
  window.addEventListener('scroll',function(){
    if(window.scrollY>500){toTop.classList.add('show');}else{toTop.classList.remove('show');}
  },{passive:true});
  toTop.addEventListener('click',function(){
    window.scrollTo({top:0,behavior:'smooth'});
  });