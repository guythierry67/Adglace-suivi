# AD GLACE — Suivi Production / Ventes / Groupe électrogène

Application de suivi opérationnel, prête à déployer sur Netlify avec une vraie
base de données partagée (Supabase), pour que toi, le technicien et la
commerciale voyiez les mêmes données en temps réel depuis vos téléphones.

## Pourquoi Supabase et pas juste Netlify seul ?

Netlify héberge uniquement le site (le code) — il ne fournit pas de base de
données. L'app a besoin d'un endroit pour stocker la production, les ventes
et le groupe électrogène de façon permanente et partagée entre appareils.
Supabase (gratuit pour ce volume d'usage) joue ce rôle.

## Étape 1 — Créer le projet Supabase (5 min)

1. Va sur https://supabase.com → crée un compte gratuit → "New project"
2. Choisis un nom (ex. `adglace`), un mot de passe de base de données, une région proche (Europe de l'Ouest conseillé)
3. Une fois le projet créé, va dans **SQL Editor** → **New query**
4. Colle le contenu du fichier `supabase/schema.sql` (fourni dans ce projet) → **Run**
   → ceci crée la table qui stockera toutes tes données
5. Va dans **Project Settings > API** : note les deux valeurs suivantes, tu en auras besoin à l'étape 3 :
   - **Project URL** (ex. `https://xxxxx.supabase.co`)
   - **anon public key** (longue chaîne commençant par `eyJ...`)

## Étape 2 — Pousser ce projet sur GitHub

1. Crée un nouveau dépôt GitHub (ex. `adglace-suivi`)
2. Pousse tous les fichiers de ce dossier dedans (comme tu l'as fait pour AGTIMMO hier)

```bash
git init
git add .
git commit -m "AD GLACE - app de suivi"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/adglace-suivi.git
git push -u origin main
```

## Étape 3 — Connecter Netlify au dépôt

1. Sur https://app.netlify.com → **Add new site > Import an existing project**
2. Choisis GitHub → sélectionne le dépôt `adglace-suivi`
3. Netlify détecte automatiquement les réglages grâce à `netlify.toml` (build : `npm run build`, dossier publié : `dist`) — ne change rien
4. **Avant de cliquer sur "Deploy"**, va dans **Site settings > Environment variables** et ajoute :
   - `VITE_SUPABASE_URL` → colle l'URL notée à l'étape 1
   - `VITE_SUPABASE_ANON_KEY` → colle la clé notée à l'étape 1
5. Clique sur **Deploy site**

Netlify installe les dépendances et construit le site automatiquement —
patiente 1 à 2 minutes.

## Étape 4 — Récupérer l'adresse et l'installer sur les téléphones

1. Une fois le déploiement terminé, Netlify te donne une adresse du type
   `https://adglace-suivi.netlify.app` (tu peux la personnaliser dans
   **Site settings > Domain management**)
2. Ouvre cette adresse sur ton téléphone, celui du technicien et celui de la commerciale
3. Utilise **"Ajouter à l'écran d'accueil"** (Safari : bouton Partager ; Chrome Android : menu ⋮) pour avoir une icône comme une vraie application

## Sécurité — à savoir

La clé `anon` de Supabase est publique par construction (elle est visible
dans le code envoyé au navigateur) — c'est la politique de sécurité définie
dans `schema.sql` (Row Level Security) qui protège réellement la table.
Cette configuration convient à un usage interne comme celui-ci, mais :
- **ne mets pas d'autres données sensibles dans le même projet Supabase** sans revoir ces politiques
- **ne partage pas l'URL Netlify publiquement** (réseaux sociaux, groupes ouverts) — uniquement avec les personnes qui doivent l'utiliser

## Mettre à jour l'application plus tard

Si tu redemandes des modifications à Claude, applique les changements dans
`src/App.jsx`, puis :

```bash
git add .
git commit -m "mise à jour"
git push
```

Netlify redéploie automatiquement à chaque `push`.

## Développement local (optionnel)

```bash
npm install
cp .env.example .env   # puis renseigne tes vraies clés Supabase dedans
npm run dev
```
