/* Copy button for the ready-made parent message on the teachers pages.
   The button stays hidden unless this script runs, so the page still works without it. */
(function(){
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    var src=document.getElementById(btn.getAttribute('data-copy'));
    var status=btn.parentNode.querySelector('.copy-status');
    if(!src) return;
    btn.hidden=false;
    btn.addEventListener('click',function(){
      var text=src.textContent.replace(/\u00a0/g,' ').trim();
      function done(){ if(status){ status.textContent=btn.getAttribute('data-done'); setTimeout(function(){status.textContent='';},3000); } }
      function fallback(){ var r=document.createRange(); r.selectNodeContents(src); var s=window.getSelection(); s.removeAllRanges(); s.addRange(r);
        try{ if(document.execCommand('copy')) done(); }catch(e){} }
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(done,fallback); } else { fallback(); }
    });
  });
})();
