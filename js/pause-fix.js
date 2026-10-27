(function(){
  /* Un clic sur une vidéo en lecture la met en pause */
  document.addEventListener('click',function(e){
    var t=e.target;
    if(!t||!t.closest||t.tagName==='VIDEO')return;
    var w=t.closest('#videos-ohman .ohman-video-play-wrap');
    if(!w)return;
    var v=w.querySelector('video');
    if(v&&!v.paused&&!v.ended){
      e.stopPropagation();
      e.preventDefault();
      v.pause();
    }
  },true);
})();
