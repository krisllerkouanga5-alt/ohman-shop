(function(){
  /* Mobile et tablette : la vidéo lancée passe en plein écran, avec un bouton Retour */
  var mq=window.matchMedia('(max-width:900px)');
  var btn=null;

  function sortir(){
    if(document.exitFullscreen)document.exitFullscreen();
    else if(document.webkitExitFullscreen)document.webkitExitFullscreen();
  }
  function creerBouton(){
    if(btn)return btn;
    btn=document.createElement('button');
    btn.id='ohman-vback';
    btn.type='button';
    btn.setAttribute('aria-label','Retour');
    btn.innerHTML='&#8592; Retour';
    btn.style.cssText='position:absolute;top:max(12px,env(safe-area-inset-top));left:12px;z-index:2147483647;padding:10px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.4);background:rgba(0,0,0,.7);color:#fff;font:600 15px/1 system-ui,sans-serif;cursor:pointer';
    btn.addEventListener('click',function(ev){ev.stopPropagation();ev.preventDefault();sortir();});
    return btn;
  }
  function elementPleinEcran(){
    return document.fullscreenElement||document.webkitFullscreenElement||null;
  }
  function plein(v){
    var w=v.closest('.ohman-video-play-wrap')||v.closest('.ohman-video-card')||v.parentElement;
    try{
      if(w.requestFullscreen){var p=w.requestFullscreen({navigationUI:'hide'});if(p&&p.catch)p.catch(function(){});}
      else if(w.webkitRequestFullscreen){w.webkitRequestFullscreen();}
      else if(v.webkitEnterFullscreen){v.webkitEnterFullscreen();}
    }catch(e){}
  }
  function changement(){
    var f=elementPleinEcran();
    if(f&&f.querySelector&&f.querySelector('video')){f.appendChild(creerBouton());}
    else if(btn&&btn.parentNode){btn.parentNode.removeChild(btn);}
  }

  document.addEventListener('fullscreenchange',changement);
  document.addEventListener('webkitfullscreenchange',changement);
  document.addEventListener('play',function(e){
    var v=e.target;
    if(!v||v.tagName!=='VIDEO'||!mq.matches)return;
    if(!v.closest||!v.closest('#videos-ohman'))return;
    if(elementPleinEcran())return;
    plein(v);
  },true);
})();
