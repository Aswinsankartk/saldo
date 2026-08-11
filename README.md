# Saldo

Saldo is a personal finance app I'm building on the side — mainly to get better at designing and building a full-stack application from scratch, rather than following a tutorial end to end.

Right now I'm heads-down on the backend: users, friends, groups, and getting the auth right before I touch anything else.

## What it does so far

- User registration and login
- Passwords hashed with bcrypt
- JWT-based auth
- Search for other users
- Send, accept, and reject friend requests
- Create and manage groups (with members)

It's a REST API built with Express, backed by MongoDB/Mongoose.

## Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

**Dev tooling:** Nodemon, dotenv, Git/GitHub

## How it's organized

```text
saldo/
└── server/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── app.js
    │   └── server.js
    │
    ├── .env.example
    ├── package.json
    └── package-lock.json
```

Nothing fancy — models hold the schemas, controllers handle the request logic, routes wire up the endpoints, middleware deals with auth/request processing, and services hold the reusable business logic. Config and utils do what you'd expect.

## Running it locally

You'll need Node.js, MongoDB, and Git installed.

```bash
git clone https://github.com/aswinsankartk/saldo.git
cd saldo/server
npm install
```

Then create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Swap in your own Mongo URI and JWT secret.

Start it up:

```bash
npm run dev     # development
npm start       # production
```

## Where it's at

Still very much a work in progress. I'm adding things feature by feature instead of trying to build everything at once — right now that means auth, users, friendships, and groups are working, but expenses aren't in yet.

Next up, roughly in order:

- Expense tracking
- Splitting expenses between people
- Debt tracking + settlements
- Better group management
- A frontend (currently backend-only)
- Proper validation and error handling
- Tests

## Why I'm building this

There's no shortage of expense-splitting apps out there — I'm not trying to compete with Splitwise. I'm building Saldo because I want to actually understand how these things work under the hood: the auth, the data modeling, how you'd structure debts between multiple people. Once the core is solid, the goal is to make it genuinely useful for splitting costs on trips or with roommates.

## Author

**Aswin Sankar TK**
GitHub: [@aswinsankartk](https://github.com/aswinsankartk)

---

Learning project, still under active development.
