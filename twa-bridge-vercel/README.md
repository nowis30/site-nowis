# TWA Bridge Vercel

Mini-projet Next.js servant `/.well-known/assetlinks.json` pour établir la relation Digital Asset Links avec l'application Android.
Toutes les autres routes sont réécrites vers le site existant `https://client-jeux-millionnaire.vercel.app`.

## Objectif
Permettre de déployer rapidement le fichier assetlinks sur Vercel sans modifier le code source principal.

## Fichiers clés
- `public/.well-known/assetlinks.json` : fichier de confiance pour la TWA.
- `next.config.js` : règle de rewrite universelle.

## Déploiement
1. Installer dépendances:
```bash
npm install
```
2. Développement local:
```bash
npm run dev
```
3. Déployer sur Vercel (importer ce dossier comme projet).
4. Vérifier l'URL:
```
https://<nouveau-domaine>.vercel.app/.well-known/assetlinks.json
```
5. Mettre à jour l'`host` dans `twa-manifest.json` avec ce nouveau domaine si différent.

## Mise à jour TWA après déploiement
```powershell
bubblewrap update --manifest=https://<nouveau-domaine>.vercel.app/manifest.webmanifest
bubblewrap build --signingKey="C:\Users\smori\application nouvelle\site-nowis\key-android.jks" --storePassword=123nowis --keyAlias=nowis --keyPassword=123nowis
adb install -r app-release-signed.apk
```

## Remarque
Ce bridge est temporaire: quand vous contrôlez totalement le site principal, migrez simplement le fichier `assetlinks.json` directement dans son propre repo.
