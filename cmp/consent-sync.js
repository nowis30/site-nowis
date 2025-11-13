/*
  Consent Mode v2 <-> IAB TCF v2 bridge (générique)
  - Défauts (EEE/UK/CH) déjà "denied" dans vos pages.
  - Ce script écoute __tcfapi et met à jour Consent Mode lorsque la CMP est prête.
  - Ajustez le mapping des finalités selon votre politique.
*/
(function(){
  var GOOGLE_VENDOR_ID = 755; // Google Advertising Products
  var lastState = {ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', analytics_storage:'denied'};

  function updateConsentFromTCF(tcData){
    try{
      if(!tcData || !tcData.purpose || !tcData.vendor) return;
      var consents = (tcData.purpose && tcData.purpose.consents) || {};
      var vendorConsents = (tcData.vendor && tcData.vendor.consents) || {};

      var hasP1 = !!consents['1']; // Stockage et accès aux infos (cookies)
      var hasP3 = !!consents['3']; // Création de profils publicitaires personnalisés
      var hasP4 = !!consents['4']; // Sélection de publicités personnalisées
      var hasP7 = !!consents['7']; // Mesurer la performance des publicités (souvent utilisé pour analytics ads)
      var googleOk = !!vendorConsents[String(GOOGLE_VENDOR_ID)];

      // Mapping simple et prudent (ajustez selon votre CMP et politique):
      var ad_storage = (hasP1 && googleOk) ? 'granted' : 'denied';
      var ad_user_data = (hasP3 && hasP4 && googleOk) ? 'granted' : 'denied';
      var ad_personalization = (hasP4 && googleOk) ? 'granted' : 'denied';
      // Pour analytics_storage, par défaut on reste "denied" à moins d’un choix explicite.
      // Si vous collectez un consentement Analytics dédié, remplacez par votre condition.
      var analytics_storage = hasP7 ? 'granted' : 'denied';

      var payload = {
        ad_storage: ad_storage,
        ad_user_data: ad_user_data,
        ad_personalization: ad_personalization,
        analytics_storage: analytics_storage
      };
      if(typeof window.gtag === 'function'){
        window.gtag('consent','update', payload);
      }
      // Emettre un event custom pour déclencher le chargement des annonces
      try {
        var changed = Object.keys(payload).some(function(k){ return payload[k] !== lastState[k]; });
        lastState = payload;
        if(changed){
          window.dispatchEvent(new CustomEvent('consentForAdsUpdate', { detail: payload }));
        }
      } catch(e) { /* ignore */ }
    }catch(e){
      // no-op
    }
  }

  function getTCDataAndUpdate(cb){
    try{
      if(typeof window.__tcfapi !== 'function') return cb && cb(false);
      window.__tcfapi('getTCData', 2, function(tcData, success){
        if(success) updateConsentFromTCF(tcData);
        if(cb) cb(success);
      });
    }catch(e){ cb && cb(false); }
  }

  function subscribeTCFEvents(){
    if(typeof window.__tcfapi !== 'function') return;
    try{
      window.__tcfapi('addEventListener', 2, function(tcData, success){
        if(success && tcData && (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete')){
          updateConsentFromTCF(tcData);
        }
      });
    }catch(e){ /* ignore */ }
  }

  // Attente légère si la CMP charge après
  var attempts = 0;
  (function waitForTCF(){
    if(typeof window.__tcfapi === 'function'){
      getTCDataAndUpdate(function(){ subscribeTCFEvents(); });
    } else if(attempts++ < 40){ // ~4s si 100ms intervalle
      setTimeout(waitForTCF, 100);
    }
  })();
})();
