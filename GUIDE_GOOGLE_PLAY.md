# Publier l'application web sur Google Play (Trusted Web Activity)

> Guide complet pour transformer cette PWA en application Android via Bubblewrap/TWA et la publier sur le Play Store.

## 1. Vérifier la PWA

1. Ouvrir le site dans Chrome (desktop).
2. Ouvrir DevTools > Lighthouse > Audit PWA (Installable doit être vert).
3. Contrôler `manifest.json` (icônes, start_url, scope, display = standalone) et présence du Service Worker.
4. Tester mode hors ligne: couper le réseau et recharger – la page `offline.html` doit apparaître.

## 2. Nom de package Android retenu

L'application utilisera `store.nowis.millionnaire`. Gardez cette valeur cohérente sur l'ensemble du projet Bubblewrap + Play Console.

## 3. Empreinte SHA-256 de `key-android.jks`

Votre keystore existe déjà: `C:\Users\smori\application nouvelle\site-nowis\key-android.jks`.

1. Vérifiez que l'outil `keytool` est disponible (installé avec le JDK 17). Sinon, installez Temurin/Adoptium JDK 17 puis relancez PowerShell.

2. Lister les alias présents et confirmer `nowis`:
  ```powershell
  & keytool -list -keystore "C:\Users\smori\application nouvelle\site-nowis\key-android.jks" -storepass 123nowis
  ```

3. Récupérer l'empreinte SHA-256 pour l'alias `nowis`:
  ```powershell
  & keytool -list -v -keystore "C:\Users\smori\application nouvelle\site-nowis\key-android.jks" -storepass 123nowis -alias nowis
  ```
  Copiez la ligne `SHA256:` et conservez-la pour l'étape Asset Links.

## 4. Digital Asset Links (`assetlinks.json`)

Fichier déjà présent: `/.well-known/assetlinks.json`.
Remplacez:
- `package_name`: par `store.nowis.millionnaire` (déjà fait ici).
- `REPLACE_WITH_STORE_NOWIS_SHA256`: par l'empreinte SHA-256 obtenue ci-dessus.

Déployez et testez: https://digitalassetlinks.googleapis.com/ (ou via l'appli une fois installée).

## 5. Installer Bubblewrap

Prérequis: Node.js 18+, JDK 17, Android SDK (variables ANDROID_HOME ou ANDROID_SDK_ROOT).
```powershell
npm install -g @bubblewrap/cli
# Utiliser le manifest du client Next.js
bubblewrap init --manifest=https://app.nowis.store/manifest.webmanifest
```
Répondez aux questions avec:
- Package ID: `store.nowis.millionnaire`
- Signing Key: chemin complet `C:\Users\smori\application nouvelle\site-nowis\key-android.jks`
- Store password: `123nowis`
- Key alias: `nowis`
- Key password: `123nowis`
Bubblewrap génère un projet Android (dossier `android/`).

## 6. Construire et signer l'AAB / APK

```powershell
bubblewrap build --signingKey="C:\Users\smori\application nouvelle\site-nowis\key-android.jks" --storePassword=123nowis --keyAlias=nowis --keyPassword=123nowis
```
L'output contient un `.aab` (bundle) et `.apk` de debug/release. Ajustez les mots de passe si vous les modifiez à l'avenir.

## 7. Tester sur un appareil

1. Installer l'APK: glisser ou `adb install chemin.apk`.
2. Ouvrir l'app: elle doit afficher votre site sans barre d'URL (contexte TWA).
3. Couper le réseau: vérifier le fallback hors ligne.

## 8. Publier sur Google Play

1. Créer la fiche: icônes (512×512, 1024×1024 pour le Play Store), captures, description, étiquettes.
2. Importer l'AAB signé (release).
3. Renseigner politiques: confidentialité (héberger une page), contenu ciblé, classification.
4. Tester: test interne > test fermé > production.

## 9. Icônes et améliorations

Ajoutez dans `manifest.json` des entrées PNG:
```json
"icons": [
  {"src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
  {"src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png"},
  {"src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
]
```
Assurez-vous que ces fichiers existent.

## 10. Dépannage

| Problème | Cause | Correction |
|----------|-------|-----------|
| TWA ouvre dans Chrome standard | Asset Links non valide | Vérifier fingerprint & package_name |
| Application non installable | Icône 512 manquante / start_url invalide | Ajouter icône, corriger URL |
| Page blanche au lancement | Erreur JS / réseau initial | Vérifier console, HTTPS obligatoire |
| Offline ne marche pas | SW pas actif / offline.html absent | Vérifier registre SW & précache |

## 11. Checklist finale

- [ ] Nom de package choisi (`store.nowis.millionnaire`)
- [ ] Keystore fingerprint insérée dans `assetlinks.json`
- [ ] assetlinks.json déployé
- [ ] Manifest complet (icônes PNG + maskable)
- [ ] Service Worker actif
- [ ] offline.html opérationnel
- [ ] Bubblewrap projet généré
- [ ] AAB signé testé
- [ ] Fiche Play Console remplie

---
Mettez à jour ce guide après remplacement des placeholders. Bon déploiement !
