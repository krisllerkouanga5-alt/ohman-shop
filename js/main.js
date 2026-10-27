const WA='24106799129'; // â† remplacez par votre numÃ©ro WhatsApp (indicatif + numÃ©ro, sans +)
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
if($('#wa'))$('#wa').href='https://wa.me/'+WA;
const hd=$('header');addEventListener('scroll',()=>hd.classList.toggle('s',scrollY>40),{passive:true});
$('#bg').onclick=()=>$('#nav').classList.toggle('open');
$$('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#nav a').forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{threshold:.45});
$$('[data-s]').forEach(s=>io.observe(s));
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.25});
$$('.rv').forEach(e=>rv.observe(e));
const pm=matchMedia('(prefers-reduced-motion:reduce)').matches,img=$('#pimg');
if(!pm)$('#hero').addEventListener('mousemove',e=>{const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;img.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*5}deg) scale(1.02)`});
$('#hero').addEventListener('mouseleave',()=>img.style.transform='');
$$('[data-open]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();const d=$('#'+b.dataset.open);if(b.dataset.close)b.closest('dialog').close();d.showModal()}));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d||e.target.closest('[data-close]'))d.close()}));
$('#q').oninput=e=>$('#bd').textContent=Math.max(0,+e.target.value||0);
$('#of').onsubmit=e=>{e.preventDefault();const m=`Bonjour OHMAN, je souhaite commander ${$('#q').value} × ${$('#pr').value}. Nom : ${$('#n').value}. TÃ©lÃ©phone : ${$('#t').value}.`;window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`,'_blank');$('#od').close()};

const trk=$('#trk'),cs=$$('.pc'),dots=$('#dots');
cs.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Produit '+(i+1));b.onclick=()=>go(i);dots.append(b)});
const step=()=>cs[1].offsetLeft-cs[0].offsetLeft,idx=()=>Math.round(trk.scrollLeft/step()),mx=()=>trk.scrollWidth-trk.clientWidth;
const go=i=>trk.scrollTo({left:Math.max(0,Math.min(i,cs.length-1))*step(),behavior:pm?'auto':'smooth'});
const mark=()=>{const a=trk.scrollLeft>=mx()-4?cs.length-1:idx();[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===a))};
trk.addEventListener('scroll',mark,{passive:true});mark();
$('#prev').onclick=()=>go(idx()-1);$('#next').onclick=()=>go(idx()+1);
trk.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(idx()+1);if(e.key==='ArrowLeft')go(idx()-1)});
let hold=pm;const sc=$('#produits');
['mouseenter','focusin','touchstart'].forEach(v=>sc.addEventListener(v,()=>hold=true,{passive:true}));
['mouseleave','focusout'].forEach(v=>sc.addEventListener(v,()=>hold=pm));
setInterval(()=>{if(hold||document.hidden)return;trk.scrollLeft>=mx()-4?go(0):go(idx()+1)},3800);
$$('[data-p]').forEach(b=>b.addEventListener('click',()=>$('#pr').value=b.dataset.p));

// OHMAN - Revelation progressive au scroll pour galerie et videos
(() => {
  const sections = [
    document.querySelector('#produits'),
    document.querySelector('#videos-ohman')
  ].filter(Boolean);

  if (!sections.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sections.forEach(section => section.classList.add('ohman-scroll-reveal'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    sections.forEach(section => section.classList.add('ohman-scroll-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ohman-scroll-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(section => observer.observe(section));
})();
// OHMAN_COUNTDOWN_TIMER
(() => {
  const hourEl = document.getElementById('ohman-hour');
  const minEl = document.getElementById('ohman-min');
  const secEl = document.getElementById('ohman-sec');
  if (!hourEl || !minEl || !secEl) return;

  const key = 'ohmanCountdownEnd_v6';
  let end = Number(localStorage.getItem(key));

  if (!end || end <= Date.now()) {
    end = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(key, String(end));
  }

  const update = () => {
    if (end - Date.now() <= 0) { end = Date.now() + 24 * 60 * 60 * 1000; localStorage.setItem(key, String(end)); } const left = Math.max(0, end - Date.now());
    hourEl.textContent = String(Math.floor(left / 3600000)).padStart(2, '0');
    minEl.textContent = String(Math.floor((left % 3600000) / 60000)).padStart(2, '0');
    secEl.textContent = String(Math.floor((left % 60000) / 1000)).padStart(2, '0');
    
  };

  update();
  const timer = setInterval(update, 1000);
})();


// ===== OHMAN PACK LIGHTBOX BEGIN =====
(() => {
  function initializeOhmanPackLightbox() {
    const lightbox = document.getElementById("ohmanPackLightbox");
    const largeImage = document.getElementById("ohmanPackLightboxImage");
    const titleElement = document.getElementById("ohmanPackLightboxTitle");
    const descriptionElement = document.getElementById("ohmanPackLightboxDescription");
    const priceElement = document.getElementById("ohmanPackLightboxPrice");
    const orderLink = document.getElementById("ohmanPackLightboxOrder");

    if (!lightbox || !largeImage || !titleElement || !priceElement || !orderLink) {
      console.error("OHMAN : fenÃªtre d'aperÃ§u ou Ã©lÃ©ment de dÃ©tail introuvable.");
      return;
    }

    if (lightbox.dataset.initialized === "true") return;

    const closeButton = lightbox.querySelector("[data-ohman-pack-close]");
    const imageSelector = "#packs-ohman .ohman-pack-mini-card > img";
    let lastFocusedElement = null;

    function openPreview(image) {
      const card = image.closest(".ohman-pack-mini-card");
      if (!card) return;

      lastFocusedElement = document.activeElement;

      const title = card.querySelector("h3");
      const price = card.querySelector(".ohman-pack-mini-price");
      const link = card.querySelector("a[href]");

      largeImage.src = image.currentSrc || image.src;
      largeImage.alt = image.alt || "Formule OHMAN";
      titleElement.textContent = title ? title.textContent.trim() : "Formule OHMAN";
      priceElement.textContent = price ? price.textContent.trim() : "Prix Ã  confirmer";

      if (descriptionElement) {
        descriptionElement.textContent =
          "Consultez l'image agrandie pour voir les dÃ©tails de cette formule. Contactez OHMAN pour toute information complÃ©mentaire.";
      }

      orderLink.href = link ? link.href : "https://wa.me/24106799129";

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("ohman-pack-modal-open");

      if (closeButton) closeButton.focus();
    }

    function closePreview() {
      if (!lightbox.classList.contains("is-open")) return;

      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("ohman-pack-modal-open");
      largeImage.removeAttribute("src");

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }

    // Clic sur l'image : afficher la grande image et ses dÃ©tails
    document.addEventListener("click", function(event) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const image = target.closest(imageSelector);
      if (image) {
        openPreview(image);
        return;
      }

      if (target === lightbox || target.closest("[data-ohman-pack-close]")) {
        closePreview();
      }
    });

    // Clavier : EntrÃ©e/Espace pour ouvrir, Ã‰chap pour fermer
    document.addEventListener("keydown", function(event) {
      const target = event.target;

      if (
        target instanceof HTMLImageElement &&
        target.matches(imageSelector) &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        openPreview(target);
        return;
      }

      if (event.key === "Escape") closePreview();
    });

    document.querySelectorAll(imageSelector).forEach(function(image) {
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", "Agrandir : " + (image.alt || "Formule OHMAN"));
    });

    lightbox.dataset.initialized = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeOhmanPackLightbox, { once: true });
  } else {
    initializeOhmanPackLightbox();
  }
})();
// ===== OHMAN PACK LIGHTBOX END =====









// ===== OHMAN VIDEO PLAYBACK STABLE BEGIN =====
(function initOhmanStablePlayback() {
  function initialize() {
    const gallery = document.querySelector(
      '#videos-ohman .ohman-videos-grid'
    );

    if (!gallery || gallery.dataset.stablePlayback === 'true') return;

    const cards = Array.from(
      gallery.querySelectorAll('.ohman-video-card')
    );

    const videos = cards.map(card => card.querySelector('video'));

    videos.forEach(function(video, index) {
      if (!video) return;

      const card = cards[index];

      // Conserver les commandes natives du navigateur
      video.controls = true;
      video.playsInline = true;

      // Charger uniquement les mÃ©tadonnÃ©es avant la lecture
      if (!video.getAttribute('preload')) {
        video.setAttribute('preload', 'metadata');
      }

      // Ã€ la lecture rÃ©elle, agrandir uniquement cette vidÃ©o
      video.addEventListener('playing', function() {
        cards.forEach(function(otherCard, otherIndex) {
          const otherVideo = videos[otherIndex];

          if (otherCard !== card) {
            otherCard.classList.remove('is-playing');

            // Ã‰viter plusieurs lectures simultanÃ©es
            if (otherVideo && otherVideo !== video && !otherVideo.paused) {
              otherVideo.pause();
            }
          }
        });

        card.classList.add('is-playing');
      });

      // Si le navigateur n'arrive pas encore Ã  remplir le tampon,
      // garder la carte agrandie pendant l'attente.
      video.addEventListener('waiting', function() {
        if (!video.paused && !video.ended) {
          card.classList.add('is-playing');
        }
      });

      video.addEventListener('pause', function() {
        card.classList.remove('is-playing');
      });

      video.addEventListener('ended', function() {
        card.classList.remove('is-playing');
      });

      video.addEventListener('error', function() {
        console.error(
          'OHMAN : erreur de lecture pour la vidÃ©o ' + (index + 1),
          video.currentSrc || video.querySelector('source')?.src,
          video.error ? video.error.code : 'inconnue'
        );
      });
    });

    gallery.dataset.stablePlayback = 'true';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
// ===== OHMAN VIDEO PLAYBACK STABLE END =====


// ===== OHMAN PLAY BUTTON BEGIN =====
(function () {
    function initOhmanVideoPlayButtons() {
        const section = document.querySelector('#videos-ohman');
        if (!section) {
            console.warn('OHMAN : section #videos-ohman introuvable.');
            return;
        }

        const videos = section.querySelectorAll('video');

        videos.forEach(function (video, index) {
            video.controls = true;
            video.playsInline = true;

            // Créer un cadre autour de la vidéo si nécessaire
            if (!video.parentElement.classList.contains('ohman-video-play-wrap')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'ohman-video-play-wrap';
                video.parentNode.insertBefore(wrapper, video);
                wrapper.appendChild(video);
            }

            const wrapper = video.parentElement;
            let button = wrapper.querySelector('.ohman-video-play-button');

            if (!button) {
                button = document.createElement('button');
                button.type = 'button';
                button.className = 'ohman-video-play-button';
                button.setAttribute('aria-label', 'Lire la vidéo ' + (index + 1));
                button.innerHTML =
                    '<span class="ohman-video-play-icon" aria-hidden="true">▶</span>' +
                    '<span class="ohman-video-play-label">Lire la vidéo</span>';
                wrapper.appendChild(button);

                button.addEventListener('click', async function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    const label = button.querySelector('.ohman-video-play-label');
                    label.textContent = 'Lancement…';

                    try {
                        await video.play();
                    } catch (error) {
                        button.classList.remove('is-hidden');
                        label.textContent = 'Réessayer la lecture';
                        console.error(
                            'OHMAN : impossible de lancer la vidéo ' + (index + 1),
                            error
                        );
                    }
                });

                video.addEventListener('playing', function () {
                    button.classList.add('is-hidden');
                });

                video.addEventListener('pause', function () {
                    if (!video.ended) {
                        button.classList.remove('is-hidden');
                        button.querySelector('.ohman-video-play-label').textContent =
                            'Reprendre la vidéo';
                    }
                });

                video.addEventListener('ended', function () {
                    button.classList.remove('is-hidden');
                    button.querySelector('.ohman-video-play-label').textContent =
                        'Revoir la vidéo';
                });

                video.addEventListener('error', function () {
                    console.error(
                        'OHMAN : erreur vidéo ' + (index + 1),
                        'Code :', video.error ? video.error.code : 'inconnu',
                        'Source :', video.currentSrc
                    );
                    button.classList.remove('is-hidden');
                    button.querySelector('.ohman-video-play-label').textContent =
                        'Réessayer la lecture';
                });
            }
        });

        console.log('OHMAN : boutons de lecture installés sur ' + videos.length + ' vidéo(s).');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOhmanVideoPlayButtons);
    } else {
        initOhmanVideoPlayButtons();
    }
})();
// ===== OHMAN PLAY BUTTON END =====


// ===== OHMAN YOUTUBE LAYOUT BEGIN =====
(function () {
    function initOhmanYoutubeLayout() {
        const section = document.querySelector('#videos-ohman');
        if (!section) return;

        const grid = section.querySelector('.ohman-videos-grid');
        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll('.ohman-video-card'));
        if (!cards.length) return;

        function showFeaturedCard(activeCard) {
            cards.forEach(function (card) {
                const video = card.querySelector('video');
                const isActive = card === activeCard;

                card.classList.toggle('ohman-video-featured', isActive);
                card.classList.toggle('ohman-video-sidebar-item', !isActive);

                if (video) {
                    video.classList.toggle('is-playing', isActive && !video.paused);
                }
            });
        }

        // Première vidéo principale au chargement
        const currentlyPlaying = cards.find(function (card) {
            const video = card.querySelector('video');
            return video && !video.paused && !video.ended;
        });

        showFeaturedCard(currentlyPlaying || cards[0]);

        cards.forEach(function (card) {
            const video = card.querySelector('video');
            if (!video || video.dataset.ohmanYoutubeBound === '1') return;
            video.dataset.ohmanYoutubeBound = '1';

            video.addEventListener('playing', function () {
                // Une seule vidéo joue à la fois
                cards.forEach(function (otherCard) {
                    const otherVideo = otherCard.querySelector('video');
                    if (otherVideo && otherVideo !== video && !otherVideo.paused) {
                        otherVideo.pause();
                    }
                });

                showFeaturedCard(card);
            });
        });

        console.log('OHMAN : disposition style YouTube activée pour ' + cards.length + ' vidéos.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOhmanYoutubeLayout);
    } else {
        initOhmanYoutubeLayout();
    }
})();
// ===== OHMAN YOUTUBE LAYOUT END =====


