# QR Code V2 - Plateforme de Gestion de QR Codes et Liens

Une application web moderne pour gérer les QR codes et les liens personnalisés pour vos clients.

## Fonctionnalités

- 🔐 Authentification sécurisée pour administrateurs et clients
- 📱 Génération de QR codes personnalisés
- 🔗 Gestion des liens personnalisés
- 👥 Interface d'administration pour gérer les clients
- 🎨 Interface utilisateur moderne et responsive

## Prérequis

- Node.js (v16 ou supérieur)
- MongoDB
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone [URL_DU_REPO]
cd qr-code-v2
```

2. Installer les dépendances du frontend :
```bash
npm install
```

3. Installer les dépendances du backend :
```bash
cd server
npm install
```

4. Configurer les variables d'environnement :
   - Créer un fichier `.env` dans le dossier `server` avec le contenu suivant :
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/qr-link-hub
   JWT_SECRET=your-super-secret-key-change-this-in-production
   ```

## Démarrage

1. Démarrer MongoDB sur votre machine

2. Créer le compte administrateur initial :
```bash
cd server
node src/scripts/createAdmin.js
```

3. Démarrer le serveur backend :
```bash
cd server
npm run dev
```

4. Dans un nouveau terminal, démarrer le frontend :
```bash
npm run dev
```

L'application sera accessible à l'adresse : http://localhost:5173

## Identifiants par défaut

- **Administrateur** :
  - Email : admin@example.com
  - Mot de passe : Admin123!

## Technologies utilisées

- Frontend :
  - React
  - TypeScript
  - Tailwind CSS
  - Vite
  - React Router
  - React Query

- Backend :
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT pour l'authentification
  - Bcrypt pour le hachage des mots de passe

## Structure du projet

```
qr-code-v2/
├── src/                 # Code source du frontend
├── server/             # Code source du backend
│   ├── src/
│   │   ├── models/     # Modèles MongoDB
│   │   ├── routes/     # Routes API
│   │   └── scripts/    # Scripts utilitaires
│   └── .env           # Configuration du serveur
└── public/            # Fichiers statiques
```

## Sécurité

- Les mots de passe sont hachés avec bcrypt
- Authentification par JWT
- Protection des routes sensibles
- Validation des entrées utilisateur
- Protection CSRF

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT
