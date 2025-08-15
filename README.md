

##  Comment jouer

1. Ouvre `index.html` dans ton navigateur.
2. Clique sur **Jouer** pour aller à la page du jeu (`game.html`).
3. Entrez ton nom dans le champ prévu.
4. Clique sur **Commencer le jeu**.
5. Clique sur les cercles qui apparaissent pour marquer des points.
6. La partie dure **35 secondes**.
7. À la fin :
   - Si ton score est supérieur à 15 : un message de félicitations s’affiche avec beaucoup de feux d’artifice 🎆 et le message **“Tu es mieux que Litia”**.
   - Sinon : message **“You lose ”**.
8. Tu peux **Rejouer** avec le même nom ou **Fermer** la fenêtre de fin de partie.

---

## Styles et animations

- Les cercles ont des couleurs foncées aléatoires.
- Les feux d’artifice apparaissent continuellement après la fin du jeu tant que la fenêtre n’est pas fermée.
- Le message de fin est coloré selon le résultat :
  - Violet foncé pour les félicitations
  - Rouge foncé pour “You lose ”

---

## Gestion des scores

- Les scores sont sauvegardés dans le **localStorage** du navigateur.
- La page `scores.html` affiche tous les scores précédents enregistrés.
- Chaque score montre le nom du joueur et le nombre de points.

---

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage pour la sauvegarde des scores

---

## Personnalisation

- Tu peux modifier la durée de jeu en changeant la variable `gameTime` dans `script.js`.
- Couleurs des cercles : modifiables dans le tableau `colors`.
- Seuil de félicitations : modifiable dans la condition `if (score > 15)`.

---

## Lancer le projet

1. Cloner ou télécharger le projet.
2. Ouvrir `index.html` dans un navigateur moderne (Chrome, Firefox, Edge…).
3. Jouer et tester les fonctionnalités !

- Projet réalisé par [Ton Nom]
- Version : 1.0
