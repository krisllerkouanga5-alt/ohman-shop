(function(){
  /* Mobile et tablette : la vidéo lancée passe en plein écran adapté à l'écran */
  var mq=window.matchMedia('(max-width:900px)');
  function plein(v){
    try{
      if(v.requestFullscreen){var p=v.requestFullscreen({navigationUI:'hide'});if(p&&p.catch)p.catch(function(){});}
      else if(v.webkitRequestFullscreen){v.webkitRequestFullscreen();}
      else if(v.webkitEnterFullscreen){v.webkitEnterFullscreen();}
    }catch(e){}
  }
  document.addEventListener('play',function(e){
    var v=e.target;
    if(!v||v.tagName!=='VIDEO'||!mq.matches)return;
    if(!v.closest||!v.closest('#videos-ohman'))return;
    if(document.fullscreenElement||document.webkitFullscreenElement)return;
    plein(v);
  },true);
})();
