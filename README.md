# Lannister Pay
An NGN (Nigerian Naira) fee processing service for a fictional Payment Processor (LannisterPay)

## 🖇 How to Start

-   Git clone `git clone https://github.com/neymarjimoh/lanister-pay`
-   cd `lanister-pay`

#### Local setup

-   `npm install` to install dependencies
-   `cp .env.example .env` to create a **.env** file for environment variables
-   Update the .env file with the respective environment variables
-   `npm run dev` to start development server
-   On postman/postwoman/insomnia/etc, run the server endpoints, `http://localhost:8080/...`
- using the staging server on heroku `https://lannister-pay.herokuapp.com/...`
#### Using docker

-   Build the application by running the following command

```
  docker-compose build
```

-   Run your dockerized app, just execute the command below

```
  docker-compose up
```

-   The application should now be running on the `port 4040`
-   Navigate to postman to test the APIs out on `http://localhost:4040/api/v1/...`

## `.env` Credentials

Checkout the `.env.example` file and create a copy of it in a `.env` file, or reach out to [@me](mailto:jemohkunle2007@gmail.com) to get started.


## 🛠 Tools

-   Node JS
-   Redis
-   Express JS

## 📋 Documentation
Link [here](https://documenter.getpostman.com/view/8239792/UVeDsSxG)
