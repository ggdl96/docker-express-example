# This is a express and redis practice with docker containers.

## The basic idea is to implement in the future a basic session managment, with JWT token and storing refresh_token on redis to refresh user token and use expiration time for both tokens

## Set up
### For development
#### run
```bash
cd src/config
cp config.development.js.example config.development.js
```