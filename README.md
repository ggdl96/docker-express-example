# This is a express and redis practice with docker containers

## The basic idea is to implement in the future a basic session managment, with JWT token and storing refresh_token on redis to refresh user token and use expiration time for both tokens

## Set up

### Docker

#### Read documentation on: <https://docs.docker.com/install/>

#### You will also need **docker-compose:**

- <https://docs.docker.com/compose/install/>
- <https://github.com/docker/compose/releases>

### Node

#### You can install **Node** manually, or use **nvm** to use different versions

### nvm

#### Linux: <https://github.com/nvm-sh/nvm>

#### Windows: <https://github.com/coreybutler/nvm-windows>

### For development

#### run

```bash
    cd src/config
    cp config.development.js.example config.development.js
```

### Install

#### Run on *project root*

```bash
docker-compose build
```

#### Then

```bash
docker-compose up
```
