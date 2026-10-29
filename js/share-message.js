/* Parent message box on the teachers pages: editable message, Copy, WhatsApp and Share.
   Without this script the message still shows and the WhatsApp link carries the original text. */
(function(){
  document.querySelectorAll('[data-share-box]').forEach(function(box){
    var msg=box.querySelector('textarea'), copy=box.querySelector('.copy-btn'), reset=box.querySelector('.msg-reset'),
        wa=box.querySelector('.send-wa'), share=box.querySelector('.send-share'), status=box.querySelector('.copy-status'), timer;
    if(!msg) return;
    // browsers without field-sizing:content get the box grown to fit here
    var fit=!(window.CSS&&CSS.supports&&CSS.supports('field-sizing','content'));
    function grow(){ if(!fit) return; msg.style.overflowY='hidden'; msg.style.height='auto'; msg.style.height=(msg.scrollHeight+msg.offsetHeight-msg.clientHeight)+'px'; }
    function sync(){ var t=msg.value; if(wa) wa.href='https://wa.me/?text='+encodeURIComponent(t); if(reset) reset.hidden=(t===msg.defaultValue); grow(); }
    msg.addEventListener('input',sync);
    window.addEventListener('resize',grow);
    window.addEventListener('pageshow',sync);
    if(reset) reset.addEventListener('click',function(){ msg.value=msg.defaultValue; sync(); msg.focus({preventScroll:true}); });
    function flash(state,say){
      clearTimeout(timer); copy.setAttribute('data-state',state); if(status) status.textContent=say;
      timer=setTimeout(function(){ copy.removeAttribute('data-state'); if(status) status.textContent=''; },2000);
    }
    if(copy){
      copy.hidden=false;
      copy.addEventListener('click',function(){
        var t=msg.value;
        function done(){ flash('done',copy.getAttribute('data-done')); }
        function fallback(){ msg.focus(); msg.select(); var ok=false; try{ ok=document.execCommand('copy'); }catch(e){}
          if(ok) done(); else flash('fail',copy.getAttribute('data-fail')); }
        if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done,fallback); else fallback();
      });
    }
    if(share&&navigator.share){
      share.hidden=false;
      share.addEventListener('click',function(){
        // text only: the message already ends with the web address. An AbortError just means the user cancelled.
        navigator.share({text:msg.value}).catch(function(){});
      });
    }
    sync();
  });
})();
