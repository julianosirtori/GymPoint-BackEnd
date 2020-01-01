# GymPoint-BackEnd
Bakend do Projeto Gympoint

## Setup

1. Instale NodeJS, se você não possue ainda.

2. Instale Yarn, se você não possue ainda.

  ```
  [sudo] npm install -g yarn
  ```

3. Clone o Projeto:

  ```
  git clone https://github.com/julianosirtori/GymPoint-BackEnd.git
  ```
3. Abra o Projeto:
  ```
  cd GymPoint-BackEnd/
  ```
4. Installe as dependencias:
  ```
  yarn install
  ```
3. Copie e renomeie o arquivo `.env.example`:
  ```
  cp .env.example .env
  ```
4. Se você possue Docker na sua maquina, instale postgres, redis e mongodb:
  ```
   docker run --name postgres -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres:10.11
   docker run --name mongo -p 27017:27017 -d -t mongo 
   docker run --name redis -p 6379:6379 -d -t redis:alpine
  ```
5. Configure o arquivo `.env`:

6. Rode as migrations:
  ```
  yarn sequelize-cli db:migrate
  ```  

6. Rode o servidor de desenvolvimeto:
  ```
  yarn dev
  ```
6. Rode o servidor de filas:
  ```
  yarn queue
  ```


