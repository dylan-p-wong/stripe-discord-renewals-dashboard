# Stripe + Discord Renewals
[![Product Name Screen Shot][product-screenshot]](https://ibb.co/G3MX0pN)
## About
Allows a server owner to charge members on a subsciption basis using Stripe. Usefel template for paid groups.

## Getting Started

### Installation
1. Create a Discord account, create a bot, create a server and obtain information below.
2. Create a Stripe account, obtains api keys and create a subsciption plan.
3. Clone the repo
```sh
git clone https://github.com/dylan-p-wong/stripe-discord-renewals-dashboard.git
```
4. Install NPM packages
```sh
cd backend
```
```sh
npm install
```
```sh
cd ../client
```
```sh
npm install
```
5. Add ENV Variables
In a file called ```.env``` in the ```backend``` folder
```sh
MONGO_URI=<ENTER YOURS>
DISCORD_TOKEN=<ENTER YOURS>
REDIRECT_URI=<ENTER YOURS>
STRIPE_SECRET_KEY=<ENTER YOURS>
CLIENT_ID=<ENTER YOURS>
CLIENT_SECRET=<ENTER YOURS>
```
6. Add backend config
In a file called ```config.json``` in the ```backend``` folder
 ```
 {
    "stripe": {
        "planID": 'ENTER YOURS'
    },
    "discord": {
        "serverID": 'ENTER YOURS',
        "roleID": 'ENTER YOURS',
        "prefix": '?' // Can Change
    }
}
 ```
7. Add client config
In a file called ```config.json``` in the ```client/src``` folder
```
{
    "SERVER_JOIN_LINK": 'ENTER YOURS',
    "LOGIN_LINK": 'ENTER YOURS', // Would be http://localhost:1812/auth/login for development
    "STRIPE_PUBLIC_KEY": 'ENTER YOURS'
}
```
8. 
In ```backend```
```
npm run dev
```
In ```client```
```
npm start
```
