# tech-blog-clone

 Serverless tech blog clone with subs moduls

## Run it locally

- Make sure to have `NodeJS, NPM, Serverless and MySql` installed in your machine
- Clone the code from Github
- CD to the project directory in your local
- Run command `npm install`, this command will install all required dependencies
- Create `.env.local`, align with repo owner to pass you the values
- Access your Mysql and create DB based on the `.env.local` values
- Run command `npm run knex:migrate` to run migrations
- Run command `npm run start` to start the app locally

## API Documentaion

- [Here](https://documenter.getpostman.com/view/3401137/2s84DhVRdC)

## APP Structure

- The app folows MVC pattern
  - /
    - src/
      - [controllers](https://github.com/mohie93/tech-blog-clone/tree/main/src/controllers)
      - [models](https://github.com/mohie93/tech-blog-clone/tree/main/src/models)
      - [routes](https://github.com/mohie93/tech-blog-clone/tree/main/src/routes)
      - [services](https://github.com/mohie93/tech-blog-clone/tree/main/src/services)
      - [middlewares](https://github.com/mohie93/tech-blog-clone/tree/main/src/middlewares)
      - [validators](https://github.com/mohie93/tech-blog-clone/tree/main/src/validators)
    - [serverless.yml](https://github.com/mohie93/tech-blog-clone/tree/main/serverless.yml)
    - [app.js](https://github.com/mohie93/tech-blog-clone/tree/main/app.js)
    - [knexfile.js](https://github.com/mohie93/tech-blog-clone/tree/main/knexfile.js)

## Cloud Access Creds

- Please contact repo owner

## Deploy the app

- Make sure to have `.env.[stage]` where **stage** can be `prod or dev`
- Run command `npm run deploy:dev` for staging
- Run command `npm run deploy:prod` for production
