# Déploiement du site app.nowis.store (Vercel)

Ce dossier contient le site statique (PWA) qui héberge les pages Privacy et Suppression de compte requises par Google Play.

## Prérequis
- Compte Vercel + accès au projet
- Vercel CLI installée globalement: `npm i -g vercel`
- Domaine `app.nowis.store` ajouté au projet Vercel

## Étapes (PowerShell Windows)
```powershell
# 1) Ouvrir le dossier du site
cd "c:\Users\smori\application nouvelle\site-nowis"

# 2) Connexion à Vercel (ouvre le navigateur)
vercel login

# 3) Lier le dossier au projet (suivre les questions)
vercel link

# 4) Déployer en production
vercel --prod
```

Au premier déploiement, Vercel fournit une URL *.vercel.app. Associe ensuite `app.nowis.store` au projet (onglet Domains).

## Vérifications après déploiement
- Service Worker: `sw.js` a VERSION = `v3` (mise à jour immédiate côté clients)
- Pages accessibles:
  - https://app.nowis.store/
  - https://app.nowis.store/privacy.html
  - https://app.nowis.store/delete-account.html

`vercel.json` applique:
- No-cache pour `sw.js`
- Cache long pour `/icons/*`
- Réécritures: `/privacy` → `/privacy.html`, `/delete-account` → `/delete-account.html`

## Si vous voyez encore un 404 ou une ancienne version
- Vider le cache du navigateur ou ouvrir DevTools > Application > Service Workers > Unregister/Update
- Forcer un re-déploiement: `vercel --prod`
- Vérifier que le domaine `app.nowis.store` pointe bien sur ce projet Vercel

## Liens Play Console
- Politique de confidentialité: `https://app.nowis.store/privacy.html`
- Suppression de compte: `https://app.nowis.store/delete-account.html`

Dernière mise à jour: 2025-11-11
