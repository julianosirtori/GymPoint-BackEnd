# GymPoint BackEnd

### Install Docker Containers
- docker run --name postgres -e POSTGRES_PASSWORD=123456 -d postgres
- docker run --name redis -d redis
- docker run --name mongo -d mongo:4.2


### Development setup
- yarn install
- yarn sequelize-cli db:migrate
- yarn dev


