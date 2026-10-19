/* Feature pages have a fixed language per URL. Remember it so the shared pages
   (home, privacy, terms, support) open in the same language. */
try{localStorage.setItem('dt_lang',document.documentElement.lang==='ar'?'ar':'en');}catch(e){}
