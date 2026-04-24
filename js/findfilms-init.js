/* findfilms-init.js — substitui o webflow.js local (0 bytes) */
(function () {
  function init() {
    // 1. Mostrar secções escondidas pelo sistema de animação do Webflow
    //    (têm style="opacity:0" inline; sem o JS do Webflow ficam invisíveis)
    document.querySelectorAll('[data-w-id]').forEach(function (el) {
      if (el.style.opacity === '0') {
        el.style.opacity = '1';
        el.style.transition = 'opacity 0.6s ease';
      }
    });

    // 2. Inicializar vídeos de fundo do Webflow (.w-background-video)
    document.querySelectorAll('.w-background-video').forEach(function (container) {
      var video = container.querySelector('video');
      if (!video) return;

      // Definir poster a partir do atributo data-poster-url
      var poster = container.getAttribute('data-poster-url');
      if (poster && !video.hasAttribute('poster')) {
        video.setAttribute('poster', poster);
      }

      // Garantir flags de autoplay
      video.muted    = true;
      video.loop     = true;
      video.autoplay = true;

      // Forçar play (ignora NotAllowedError silenciosamente)
      var p = video.play();
      if (p) p.catch(function () {});
    });

    // 3. Inicializar o menu de navegação do Webflow (mobile toggle)
    var menuBtn = document.querySelector('.w-nav-button');
    var navMenu = document.querySelector('.w-nav-menu');
    if (menuBtn && navMenu) {
      menuBtn.addEventListener('click', function () {
        var open = navMenu.classList.contains('w--open');
        navMenu.classList.toggle('w--open', !open);
        menuBtn.classList.toggle('w--open', !open);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
