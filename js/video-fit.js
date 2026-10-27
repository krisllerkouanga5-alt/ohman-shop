(function(){
  /* Mobile et tablette : la vidéo lancée passe en plein écran, avec un bouton Retour */
  var mq=window.matchMedia('(max-width:900px)');
  var btn=null;
  var modif=[];

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
  function force(el,props){
    modif.push([el,el.getAttribute('style')]);
    for(var k in props){el.style.setProperty(k,props[k],'important');}
  }
  function ajuster(f){
    var v=f.querySelector('video');
    if(!v)return;
    force(f,{'background':'#000','width':'100vw','height':'100%','max-width':'none','max-height':'none','display':'flex','align-items':'center','justify-content':'center','margin':'0','padding':'0','border':'0','border-radius':'0','overflow':'hidden','transform':'none'});
    var n=v.parentElement;
    while(n&&n!==f){
      force(n,{'width':'100%','height':'100%','max-width':'none','max-height':'none','min-height':'0','margin':'0','padding':'0','border':'0','border-radius':'0','aspect-ratio':'auto','transform':'none'});
      n=n.parentElement;
    }
    force(v,{'width':'100%','height':'100%','max-width':'none','max-height':'100%','object-fit':'contain','aspect-ratio':'auto','border-radius':'0','transform':'none'});
  }
  function restaurer(){
    for(var i=modif.length-1;i>=0;i--){
      var el=modif[i][0],s=modif[i][1];
      if(s===null)el.removeAttribute('style');else el.setAttribute('style',s);
    }
    modif=[];
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
    restaurer();
    if(f&&f.querySelector&&f.querySelector('video')){
      ajuster(f);
      f.appendChild(creerBouton());
    }else if(btn&&btn.parentNode){
      btn.parentNode.removeChild(btn);
    }
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
