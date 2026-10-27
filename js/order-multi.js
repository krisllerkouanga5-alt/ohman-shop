(function(){
  var WA='24106799129';
  var cart=[];
  var NAMES={'poutoulspray-10ml':'Poutoulspray 10 ml','poutoulspray-20ml':'Poutoulspray 20 ml','membre-pommade':'Membre (pommade)','amelaku-6g':'Amélaku 6 g','amelaku-12g':'Amélaku 12 g'};
  var dlg=document.getElementById('od'), form=document.getElementById('of');
  if(!dlg||!form) return;
  var sel=document.getElementById('pr'), qty=document.getElementById('q');

  var box=document.createElement('div');
  box.id='ohman-order-list';
  box.style.cssText='margin:6px 0 12px;font-size:14px';
  form.insertBefore(box, form.firstChild);

  var lab=form.querySelector('label[for="pr"]');
  if(lab) lab.textContent='Ajouter un autre article';

  var addBtn=document.createElement('button');
  addBtn.type='button';
  addBtn.className='pill';
  addBtn.textContent='+ Ajouter à ma commande';
  addBtn.style.cssText='margin:8px 0 14px;background:transparent;border:1px solid #20c55e;color:#20c55e';
  qty.insertAdjacentElement('afterend', addBtn);

  function add(name, n){
    n=parseInt(n,10)||1;
    for(var i=0;i<cart.length;i++){
      if(cart[i].name===name){ cart[i].qty+=n; return; }
    }
    cart.push({name:name, qty:n});
  }

  function render(){
    if(!cart.length){
      box.innerHTML='<p style="opacity:.8">Aucun article choisi. Choisissez un produit ci-dessous.</p>';
      return;
    }
    var h='<p style="font-weight:700;margin:0 0 6px;color:#20c55e">Ma commande</p>';
    cart.forEach(function(it,i){
      h+='<div style="display:flex;align-items:center;gap:8px;margin:6px 0;padding:8px 10px;border:1px solid #20c55e;border-radius:10px;background:rgba(32,197,94,.12);color:#20c55e;font-weight:700">'
       +'<span style="flex:1">'+it.name+'</span>'
       +'<button type="button" data-a="m" data-i="'+i+'" style="width:28px">-</button>'
       +'<b>'+it.qty+'</b>'
       +'<button type="button" data-a="p" data-i="'+i+'" style="width:28px">+</button>'
       +'<button type="button" data-a="x" data-i="'+i+'" aria-label="Retirer">&times;</button>'
       +'</div>';
    });
    box.innerHTML=h;
  }

  function openDlg(){
    if(!dlg.open){ try{ dlg.showModal(); }catch(e){ dlg.setAttribute('open',''); } }
    render();
  }

  box.addEventListener('click', function(e){
    var b=e.target.closest('button[data-a]');
    if(!b) return;
    var i=parseInt(b.getAttribute('data-i'),10), a=b.getAttribute('data-a');
    if(a==='p') cart[i].qty++;
    if(a==='m'){ cart[i].qty--; if(cart[i].qty<1) cart.splice(i,1); }
    if(a==='x') cart.splice(i,1);
    render();
  });

  addBtn.addEventListener('click', function(){
    add(sel.value, qty.value);
    qty.value=1;
    render();
  });

  document.addEventListener('click', function(e){
    var t=e.target.closest ? e.target.closest('.ohman-product-order,a[href*="wa.me"],#ohmanPackLightboxOrder') : null;
    if(!t) return;
    var name=null;
    if(t.classList.contains('ohman-product-order')){
      var id=t.getAttribute('data-ohman-product-id');
      name=NAMES[id]||id;
    } else {
      var href=t.getAttribute('href')||'';
      try{ href=decodeURIComponent(href); }catch(err){}
      var m=href.match(/(Formule .+?) et sa/);
      if(m) name=m[1];
    }
    if(!name) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    add(name,1);
    var lb=document.querySelector('.ohman-pack-lightbox.is-open,.ohman-pack-lightbox.open');
    if(lb){ lb.classList.remove('is-open'); lb.classList.remove('open'); }
    openDlg();
  }, true);

  form.addEventListener('submit', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    if(!cart.length) add(sel.value, qty.value);
    var nom=document.getElementById('n').value.trim();
    var tel=document.getElementById('t').value.trim();
    var msg='Bonjour OHMAN, je souhaite commander :\n';
    cart.forEach(function(it){ msg+='- '+it.qty+' x '+it.name+'\n'; });
    msg+='\nNom : '+nom+'\nTéléphone : '+tel;
    window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank');
    cart=[];
    render();
    if(dlg.close) dlg.close();
  }, true);

  new MutationObserver(function(){ if(dlg.open) render(); })
    .observe(dlg,{attributes:true,attributeFilter:['open']});
  render();
})();