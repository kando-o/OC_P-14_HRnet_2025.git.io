# P14-HRnet - Application de Gestion des Employés

Application React moderne pour la gestion des ressources humaines, permettant de créer, visualiser et gérer les employés d'une entreprise.

## 🚀 Technologies Utilisées

- **React 18** - Bibliothèque UI moderne
- **Vite** - Build tool ultra-rapide
- **React Router** - Navigation entre pages
- **Material-UI** - Composants UI prêts à l'emploi
- **Vitest** - Framework de tests moderne
- **ESLint** - Qualité du code

## 📦 Installation

```bash
# Cloner le projet
git clone [https://github.com/OpenClassrooms-Student-Center/P12_Front-end.git]

# Installer les dépendances
npm install
```

## 🛠️ Commandes Disponibles

### 🚀 Développement
```bash
npm run dev
```
Lance le serveur de développement Vite avec hot reload. L'application sera accessible sur `http://localhost:5173`

### 🏗️ Build et Production
```bash
npm run build
```
Compile le projet pour la production. Les fichiers optimisés sont générés dans le dossier `dist/`

```bash
npm run serv
```
Build le projet ET lance un serveur de preview pour tester la version de production

```bash
npm run preview
```
Lance uniquement le serveur de preview (nécessite d'avoir fait `npm run build` avant)

### 🧪 Tests
```bash
npm test
```
Lance les tests unitaires en mode watch (les tests se relancent automatiquement à chaque modification)

```bash
npm run test:ui
```
Ouvre l'interface graphique de Vitest pour une meilleure expérience de développement des tests

```bash
npm run test:coverage
```
Génère un rapport détaillé de couverture de code, montrant quelles lignes sont testées ou non

### 🔍 Qualité du Code
```bash
npm run lint
```
Vérifie la qualité du code avec ESLint et signale les erreurs de style et les bonnes pratiques

## 📁 Structure du Projet

```
P14-HRnet/
├── src/
│   ├── Component/          # Composants réutilisables
│   │   ├── Header.jsx      # En-tête de l'application
│   │   └── modal/          # Composants modaux
│   ├── Page/               # Pages de l'application
│   │   ├── Home/           # Page d'accueil et création d'employé
│   │   ├── Employe/        # Page de visualisation des employés
│   │   ├── Layout/         # Layout principal
│   │   └── 404/            # Page d'erreur
│   ├── router/             # Configuration des routes
│   └── assets/             # Ressources statiques
├── public/                  # Fichiers publics
├── tests/                   # Tests unitaires
└── vitest.config.js         # Configuration Vitest
```

## 🎯 Fonctionnalités Principales

### 🎫 Gestion des Employés
- **Création** : Formulaire complet avec validation
- **Stockage** : Persistance des données via localStorage
- **Visualisation** : Liste des employés avec recherche et filtres
- **Validation** : Contrôles de saisie et patterns de validation

### 🎨 Interface Utilisateur
- **Design moderne** avec Material-UI
- **Responsive** pour tous les écrans
- **Navigation intuitive** entre les pages
- **Modales** pour les confirmations et messages

## 🧪 Tests

L'application utilise Vitest pour les tests unitaires avec React Testing Library :

- **Tests des composants** : Vérification du rendu et des interactions
- **Tests des formulaires** : Validation et soumission
- **Tests d'intégration** : Flux complet de création d'employé
- **Couverture de code** : Rapport détaillé des lignes testées

## 📝 Notes de Développement

- **localStorage** : Utilisé pour la persistance des données (pas de base de données externe)
- **Composants fonctionnels** : Architecture moderne avec hooks React
- **Lazy loading** : Chargement à la demande des composants modaux
- **Validation HTML5** : Patterns et attributs required pour la validation côté client

## 🤝 Contribution

1. Fork le projet
2. Crée une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit tes changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une Pull Request

## 📝 Licence

Ce projet est développé dans le cadre de la formation OpenClassrooms.

## 🆘 Support

Pour toute question ou problème :
- Vérifie la documentation des dépendances
- Consulte les tests pour comprendre le comportement attendu
- Utilise `npm run lint` pour identifier les problèmes de code

---

**Développé avec KANDO Jason pour la gestion du code**
