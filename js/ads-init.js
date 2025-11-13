(function(){
  function isGranted(payload){
    return payload && payload.ad_storage === 'granted';
  }

  function pushAd(el){
    try {
      if(el && !el.dataset.loaded){
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        el.dataset.loaded = '1';
      }
    } catch(e) {
      // ignore, retry later
    }
  }

  function pushAll(){
    var nodes = document.querySelectorAll('ins.adsbygoogle');
    nodes.forEach(pushAd);
  }

  // 1) Pousser les annonces dès que le script AdSense est prêt
  var readyTries = 0;
  (function waitForAds(){
    if(window.adsbygoogle && Array.isArray(window.adsbygoogle)){
      pushAll();
    } else if(readyTries++ < 100) { // ~10s à 100ms
      setTimeout(waitForAds, 100);
    }
  })();

  // 2) Re-pousser si le consentement pour la pub devient accordé (EEE/UK/CH)
  window.addEventListener('consentForAdsUpdate', function(ev){
    try{
      if(isGranted(ev.detail)){
        pushAll();
      }
    }catch(e){/* ignore */}
  });

  // 3) Fallback DOM ready (pour Safari/iPhone, si 1) a raté le timing)
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(pushAll, 300);
  });
})();
