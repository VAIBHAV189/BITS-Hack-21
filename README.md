# <p align="center"> Creator Bonanza </p>

## Table of contents

- [About](#about-project)
- [Getting Started](#getting-started)
- [Functionalities](#functionalities)
- [Future Scope](#future-scope)
- [Technology Stack](#technology-stack)

## About Project
The project aims at solving the problem of managing deals & projects, accepting & managing payments, managing invoices, accepting tips from fans, and many more.
<br>
We have developed a solution for the creator economy which helps to manage their day-to-day task  and makes their life a lot simpler. Hosted at https://creator-bonanza.herokuapp.com

## Getting Started

To get started simply:

1. Install dependencies packages: <br>
   `cd server` <br>
   `npm install`

2. Set up your local mongodb server on port 27017 and run <br>
   `mongod`

3. Build the dist folder <br>
   `yarn build`

4. Run server <br>
   `yarn dev`

5. Server is fired up on port 6071


## Functionalities
This project Consists of multiple functionalities
1. Created the login and signup portals for both Promoters and Creators
2. The creator has a dashboard where he/she can view the status of tasks and manage various projects efficiently.
3. Promoters can send requests to the creator, and the creator has the choice to accept/reject the request.
4. Provided a feature to link youtube channels with the creator’s dashboard to manage the payments and gather other intel from youtube analytics such as Views and Subscriber count.
5. Automated Mail Support for the Promoters to keep them updated about the Acceptance/Rejection of their request. Invoices of payments are also sent via mail.

## Future Scope

1. A Payments Dashboard where a creator can view the details of all the payments.
2. A Paytm payment gateway integrated with the Payments Dashboard which will be used to manage the donations.
3. A chatting window for creator and promoter to have their queries resolved.

## Technology Stack
1. HBS
2. CSS
3. JavaScript
4. Node js
5. Express
6. Bcrypt
7. Node Mailer
8. MongoDB
9. Adsense API
10. Youtube Analytics API

