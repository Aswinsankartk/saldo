# Saldo

Saldo (it means "balance" in a bunch of languages, seemed fitting) is a personal finance / expense-splitting app I'm building on the side. Not really trying to make the next Splitwise — I just wanted to actually build something full-stack myself instead of following along with another tutorial.

Backend only for now. I'm being stubborn about getting auth, users, friends and groups solid before I even think about a frontend.

## What's working right now

- Register / login
- Passwords hashed with bcrypt (obviously not rolling my own)
- JWT auth
- Search for other users
- Friend requests — send, accept, reject
- Groups — create them, add members, leave, transfer ownership, join via invite code

It's a REST API, Express + MongoDB/Mongoose behind it.

## Stack

Node, Express 5, MongoDB/Mongoose, JWT, bcrypt. Nodemon + dotenv for dev.

I picked Express 5 mostly because I wanted to see what changed from v4 — some of the async error handling is nicer.

## Structure

```
saldo/
└── server/
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        ├── services/
        ├── utils/
        ├── app.js
        └── server.js
```

Fairly standard MVC split — models are the schemas, controllers handle the actual request logic, routes just wire things to controllers, middleware does auth/validation/error stuff, services hold logic I didn't want sitting inside a controller (mostly the friend-request stuff right now).

## Running it

You'll need Node and a MongoDB instance (Atlas works fine, that's what I use).

```bash
git clone https://github.com/aswinsankartk/saldo.git
cd saldo/server
npm install
```

Make a `.env` in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev    # nodemon
npm start
```

## Where this is going

Auth, users, friends, groups — done. Expenses are not in yet, which is kind of the whole point of the app, so that's next. Roughly in this order:

- Expense tracking
- Splitting logic (equal splits first, probably custom splits later)
- Debts / settle-up
- A frontend, eventually
- Actual input validation instead of hoping people send the right shape of JSON
- Tests (I know, I know)

## Why

Mostly just wanted to understand how an app like this is actually put together — the auth, the data modeling for who-owes-who, all of it — rather than just consuming an app that already does this. If it ends up being something I can actually use to split rent or trip costs with friends, even better.

---

Aswin Sankar TK · [@aswinsankartk](https://github.com/aswinsankartk)
