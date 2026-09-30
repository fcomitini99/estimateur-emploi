# Estimateur d'Emploi ⏳

Site humoristique qui estime le temps nécessaire pour trouver un travail (entre 15 et 450 ans).
100 % statique : HTML, CSS et JavaScript, sans dépendance ni build.

## Lancer en local

Ouvrir `index.html` dans un navigateur.

## Publier sur GitHub Pages

1. Créer un dépôt sur GitHub (par ex. `estimateur-emploi`).
2. Dans ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Premier commit"
   git branch -M main
   git remote add origin https://github.com/<utilisateur>/estimateur-emploi.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Source : Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Le site sera disponible sur `https://<utilisateur>.github.io/estimateur-emploi/`.

## Calcul

Chaque réponse donne un score entre 0 et 1, pondéré :

| Question | Poids |
|---|---|
| Domaine | 15 % |
| Plus de 25 ans d'expérience | 20 % |
| Nombre de doctorats (0 à 35) | 25 % |
| Implant IA | 20 % |
| Affiliation criminelle | 20 % |

Années = 450 × (15 / 450)^score — donc tout au minimum → 450 ans, tout au maximum → 15 ans.
Les listes et leurs scores se modifient en haut de `script.js`.
