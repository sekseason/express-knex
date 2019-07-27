## Express + Knex + MySQL + Firebase Stage

The demo of Express + Knex + MySQL + Firebase Storage

Example video: https://www.loom.com/share/d1bc7ab297ae41f68c1b9256b14ee4c8

#### Installation

Prerequisite:

```
npm install -g nodemon
npm install -g knex
```

Clone the source from this repo

```
cd express-knex
cp .env.dist .env

# then, configure your `.env` file
# copy your google clound service key file into `server/storage/key.json`

npm install | yarn
knex migrate:latest
knex seed:run
```

#### Run

```
cd express-knex
npm run dev | yarn dev
```

as default you can access api at http://localhost:3000

view api reference (development only) at http://localhost:3000/api-docs

default user  
u: admin  
p: Password@01
