(function(){
  // Ouvre l’UI de consentement de la CMP (IAB TCF v2.2)
  window.openConsent = function(){
    try{
      if(typeof window.__tcfapi === 'function'){
        window.__tcfapi('displayConsentUi', 2, function(success){});
        return;
      }
      // Optionnel: tenter des intégrations spécifiques si la CMP expose une API propriétaire
      // Ex. Funding Choices (Google) peut exposer une méthode dédiée selon configuration.
      alert('Le panneau de consentement n\'est pas disponible pour le moment. Réessayez plus tard.');
    }catch(e){/* ignore */}
  };
})();
