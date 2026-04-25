# 🚀 NovaTech - Le Réseau Social Nouvelle Génération

NovaTech est une application inspirée par X (Twitter), conçue pour offrir une expérience utilisateur fluide, moderne et sécurisée. Le projet est bâti sur une architecture robuste utilisant **AdonisJS** pour le backend et **Tailwind CSS** pour une interface ultra-responsive.

---

## Fonctionnalités

### Fonctionnalités Principales
*   **Authentification Avancée :** Inscription et connexion via Email, avec une interface inspirée du design actuel de X.
*   **Système de Flux (Feed) :** Publication de messages (tweets), affichage chronologique et gestion du contenu.
*   **Interactions Sociales :** Likes, Retweets et Commentaires en temps réel pour dynamiser les échanges.
*   **Gestion des Relations :** Système de "Follow/Unfollow" pour construire son propre réseau.
*   **Profils Personnalisés :** Modification du profil, gestion des avatars et affichage des statistiques (nombre de posts, abonnés).

### Fonctionnalités Avancées
*   **Audit de Profil par l'IA (Grok) :** Intégration de l'API xAI pour analyser le profil utilisateur et fournir des conseils personnalisés.
*   **Confidentialité Totale :** Option pour passer son compte en mode **Privé** ou **Public**.
*   **Design Responsive :** Interface optimisée pour Mobile, Tablette et Desktop (Mode sombre natif).

---

## Installation et Lancement

Suivez ces étapes pour installer le projet localement :

### 1. Cloner le projet

* git clone https://github.com/kadea-academy-learners/capstone-x-clone-adonis-manassebonsomi.git
* cd capstone-x-clone-adonis-manassebonsomi

### 2. Installer les dépendances
* npm install

### 3. Configuration de l'environnement

* cp .env.example .env

### 4. Migrations et Seeders

* node ace migration:run
* node ace db:seed

### 5. Lancer le serveur

* node ace serve --watch


## Identifiants de Test (Seeders)

Pour tester rapidement l'application sans créer de compte, utilisez les identifiants suivants :

* **Mot de passe commun :** password123

### Email	--- Pseudo
* sacre@kadea.co	-- @sacre
* bmmprod@mail.com	--- @prod
* test@example.com --- john_doe
* jane@example.com --- jane_private

## Application en ligne

Retrouvez la version fonctionnelle de NovaTech ici :
* Lien vers l'application : https://x-clone-bmm-production.up.railway.app/
