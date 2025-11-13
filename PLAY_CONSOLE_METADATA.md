# Fiche Google Play – Héritier Millionnaire

Référence pour préparer la publication de la TWA "Héritier Millionnaire" sur Google Play.

## 1. Informations principales

- **Titre (FR)** : Héritier Millionnaire – Cashflow & Quiz
- **Titre (EN)** : Millionaire Heir – Cashflow & Quiz
- **Catégorie** : Jeux > Simulation économique (Business / Board alternative)
- **Classification d’âge** : PEGI 3 / ESRB E10+ (aucun contenu sensible)
- **Politique de confidentialité** : https://twa-bridge-vercel.vercel.app/privacy.html
- **Site web** : https://twa-bridge-vercel.vercel.app/
- **Email de support** : support@nowis.store (à confirmer)

## 2. Descriptions

### Courte description (≤ 80 caractères)
- **FR** : Gère ton cashflow, invests, réponds au quiz et deviens millionnaire.
- **EN** : Grow your cashflow, invest smart, ace the quiz and become a millionaire.

### Description complète (FR)
> Héritier Millionnaire est un jeu de finances personnelles qui mélange cashflow, immobilier, bourse, quiz et mini-jeux de dés. Construis ton patrimoine, réponds à des questions de culture financière et défie tes amis dans des parties rapides.
>
> **Fonctionnalités clés**
> - Tableau de bord complet : patrimoine, revenus passifs, dettes et opportunités.
> - Immobilier & bourse : achète, vends, négocie pour faire croître ton net.
> - Quiz argent & économie : plus de 250 questions réparties par thématique.
> - Défis quotidiens : bonus, missions et classement communautaire.
> - Mode hors ligne partiel : consulte tes stats même sans connexion.
>
> **Pourquoi l’installer ?**
> - Interface adaptée mobiles & tablettes, installable comme app native.
> - Notifications optionnelles pour recevoir les nouveaux défis.
> - Aucun abonnement obligatoire, progression sauvegardée dans le cloud.
>
> Télécharge Héritier Millionnaire, affine tes décisions financières et deviens le prochain millionnaire !

### Full description (EN)
> Millionaire Heir is a personal finance game blending cashflow strategy, real-estate, stock market trades, financial quizzes and quick dice mini-games. Build your net worth, answer economic trivia and challenge friends in fast-paced sessions.
>
> **Highlights**
> - Full dashboard: net worth, passive income, debt ratios and opportunities.
> - Real estate & stocks: buy, sell, negotiate and snowball your wealth.
> - 250+ quiz questions about money, investing and financial culture.
> - Daily boosts: bonuses, missions and a live community leaderboard.
> - Partial offline mode: keep your stats visible even without network.
>
> **Why install it?**
> - Mobile-first interface installable as a native-like app.
> - Optional notifications for new challenges and rewards.
> - No mandatory subscription, progress saved to the cloud.
>
> Download Millionaire Heir, sharpen your financial decisions and climb to the top of the millionaire ranking!

## 3. Visuels requis

| Actif | Spécifications | Source / À préparer |
|-------|----------------|----------------------|
| Icône Play Store | PNG 512×512, fond transparent ou plein | `icons/icon-512.png` (adapter si besoin) |
| Graphic feature | PNG/JPG 1024×500 | Créer bannière: titre + tagline "Cashflow, Immobilier, Quiz" |
| Captures écran portrait | ≥ 3, 1080×1920 recommandées | Depuis appareil Android (tableau de bord, quiz, classement) |
| Vidéo (optionnel) | 1280×720 YouTube | Capture enregistrement écran | 

## 4. Détails fiche boutique

- **Langues** : FR (principal), EN (secondaire). Ajouter d’autres langues si prévues.
- **Appareils ciblés** : Téléphones + tablettes Android.
- **Prix** : Gratuit, avec achats intégrés ? (actuellement non)
- **Publicité** : préciser si l’app affiche des pubs (actuellement non).
- **Analyse de sécurité** : Play App Signing recommandé (upload AAB signé localement).

## 5. Sujets Play Console

1. **Configuration App Signing** :
   - Conserver votre keystore local `key-android.jks`.
   - Google Play App Signing : autorisé (Play gère la clé de distribution), conservez la clé de chargement.

2. **Contenu & ciblage** :
   - Remplir questionnaire contenu (aucune violence, contenu financier éducatif).
   - Ciblage publicitaire : non, si aucune pub.
   - Adolescent/adulte : mentionner que l’app n’est pas destinée aux enfants < 13 ans.

3. **Présence Store** :
   - Ecrire tagline de 30 caractères: "Cashflow, Quiz et Investissements".
   - Mots-clés: finances, cashflow, investissement, quiz, immobilier.

## 6. Étapes test & publication

1. Importer `app-release-bundle.aab` dans Play Console > Version > Test interne.
2. Ajouter testeurs (groupe Google Groups ou liste email).
3. Déployer, laisser Play vérifier (quelques minutes à heures).
4. Lorsque validé, promouvoir vers Test fermé / Production.
5. Surveiller rapports ANR/Crash + feedback.

## 7. Vérifications rapides avant soumission

- [ ] `assetlinks.json` déployé sur domaine final.
- [ ] TWA en plein écran (pas de barre URL) sur build installé.
- [ ] Manifest / SW (PWA) valides (test Lighthouse PWA ≥ 90).
- [ ] Page privacy accessible.
- [ ] Descriptions FR/EN relues et importées sur Play Console.
- [ ] Captures écran compatibles 1080×1920, 16:9 portrait.
- [ ] Pack AAB signé (`app-release-bundle.aab`).

## 8. Ressources complémentaires

- [Checklist TWA Play Store](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Guidelines descriptions Play](https://support.google.com/googleplay/android-developer/answer/1078870)
- [Création captures](https://support.google.com/googleplay/android-developer/answer/9866683)
