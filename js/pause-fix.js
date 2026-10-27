(function(){
  /* Toucher une vidéo en lecture la met en pause */
  document.addEventListener('click',function(e){
    var t=e.target;
    if(!t||!t.closest||!t.closest('#videos-ohman'))return;
    var v=null;
    if(t.tagName==='VIDEO'){
      v=t;
      var r=v.getBoundingClientRect();
      if(e.clientY>r.bottom-52)return; /* laisse la barre de contrôle fonctionner */
    }else{
      var w=t.closest('.ohman-video-play-wrap,.ohman-video-card,.ohman-video-featured,.ohman-video-sidebar-item');
      if(w)v=w.querySelector('video');
    }
    if(v&&!v.paused&&!v.ended){
      e.stopPropagation();
      e.preventDefault();
      v.pause();
    }
  },true);
})();

