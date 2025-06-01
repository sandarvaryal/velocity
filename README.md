# How to setup the project locally

## Install pnpm

Install pnpm from npm

```sh
npm install -g pnpm@latest
```

## Installing Nodejs

Install Nodejs from [Nodejs](<[https://](https://nodejs.org/en/download)>)

### Install Typescript

```sh
pnpm add -g typescript
```

##Install all dependencies

Run "pnpm install" from root

```sh
pnpm install
```

### Setting up Docker

- Install Docker from [Docker](https://docs.docker.com/engine/install/)
- Make sure you can run the docker cli

```sh
   docker
```

- Pull the Postgres image

```sh
docker pull postgres
```

- Check if the image has been pulled

```sh
docker images
```

- Start the db locally

```sh
docker run -e POSTGRES_PASSWORD=PASSWORD -d -p 5432:5432 postgres
```

### Migrate Db and Generate the prisma client

Migrate Db

```sh
pnpm dlx prisma migrate dev --name init
```

Generate the prisma client

```sh
pnpm dlx prisma generate
```

##run React and Express server

run React

```sh
pnpm run dev
```

run the Express Server

```sh
pnpm run start
```
