# Laboras (Next)

A fullstack project of social network made in Next.js

## Related

Reach the main repository of [Laboras](https://github.com/bianca-bezerra/Laboras) project

## Features

- Posts CRUD
- Profiles, celebrations

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO`: Connection string used by _mongoose_ to access your database on MongoDB Atlas

`SERVER_URL`: Current URL where your app is running

`APP_PRIVACY_MODE`: Used to define if the app access is restricted. If you choosen "private", you need to set a list of allowed usesrs (current just on _APP_PRIVATE_GITHUB_USERS_), otherwhise "public" will allow everyone access.

`APP_PRIVATE_GITHUB_USERS`: List of GitHub account IDs separated by comma of the allowed users to access your app on private mode.

`AUTH_SECRET`: Secret used by _Auths.js_ to encode the JWT and encrypt things in transit. [More info](https://authjs.dev/getting-started/deployment#auth_secret)

`GITHUB_SECRET`, `GITHUB_ID`: Variables to define GitHub as provider on _Auth.js_. [More info](https://authjs.dev/getting-started/authentication/oauth)

## Run Locally

Clone the project

```bash
git clone https://github.com/msruan/laboras-nextjs
```

Go to the project directory

```bash
cd laboras-next
```

Install dependencies

```bash
npm i
```

Run the development server

```bash
npm run dev
# or
pnpm dev
```

## Todo

- [OK] Create a public deploy instance
- [OK] Add MongoDB docker compose to use locally
- [OK] Improve login page
- [OK] Add Loggertape
- [OK] Settings section
- [+/-] Change ServerComponents calling API Routes (antipattern) to pure db calls 
  - Need to think how to use cache feature without it
- Separate User and OauthProfiles on database
- Add musics and chat resources
