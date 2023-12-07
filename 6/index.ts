import express from "express";
import getLocaleStringDay from "./lib/localeStringDay";
import jwt from "jsonwebtoken";
import cors from "cors";

const monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];

const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();

const app = express();
const port = process.env.PORT ?? 3000;

interface User {
    id: number;
    username: string;
    password: string;
    creditCard: number;
}

const userDb: User[] = [
    { id: 0, username: "kej", password: "nn123", creditCard: 1234123412341234 },
    { id: 0, username: "ivan", password: "nasdf3", creditCard: 4321432143214321 },
    { id: 0, username: "safffsa", password: "afffas", creditCard: 7412741274127412 },
    { id: 0, username: "tadumtsas", password: "lol1234", creditCard: 1111222233334444 },
    { id: 0, username: "pechy", password: "ABCabc123", creditCard: 1111222233334444 }
]

app.use(cors(
    { origin: "http://localhost:8000" }
), (req, res, next) => {
    res.setHeader("Content-type", "application/json");
    next();
}, express.json())

app.post("/auth/login", (req, res) => {
    const { username, password } = req.body
    for (const user of userDb) {
        if (user.username == username) {
            if (user.password == password) {
                const data = {
                    id: user.id,
                    username,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 60 * 10
                }

                const token = jwt.sign(data, "fvkjtvdr")
                res.send(JSON.stringify({ token, username }))
            }
            else {
                res.status(401);
                res.send(JSON.stringify("Bad password"))
            }
        }
    }
    res.status(401)
    res.send(JSON.stringify("Unknown user"))
}, express.json())


app.use("/user/*", (req, res, next) => {
    const token = req.headers.authorization as unknown as string
    jwt.verify(token, "fvkjtvdr", (error, data: any) => {
        if (error) {
            res.status(400)
            res.send()
        }
        res.locals.data = data;
    })
    next()
})

app.get("/user/card", (req, res, next) => {
    const { username } = res.locals.data;
    const user = userDb.filter((user) => user.username == username)[0];
    res.send(JSON.stringify({ cardNumber: user.creditCard }));
});

app.get("/", (req, res) => {
    res.send('Hello world');
});

app.get("/day", (req, res) => {
    res.send(getLocaleStringDay(new Date().getDay()));
});

app.get("/day/:day", (req, res) => {
    const day = req.params.day as unknown as number;
    res.send(getLocaleStringDay(day));
})

app.get("/month", (req, res) => {
    res.send(monthNames[month]);
})

app.get("/month/:month", (req, res) => {
    const monthEx = req.params.month as unknown as number;
    res.send(monthNames[monthEx]);
})

app.get("/year", (req, res) => {
    res.send("" + year);
})

app.get("/date", (req, res) => {
    res.send(date.getDate() + ". " + monthNames[month] + " " + year);
})

app.get("/date/:day/:month/:year", (req, res) => {
    const dayEx = req.params.day as unknown as number;
    const monthEx = req.params.month as unknown as number;
    const yearEx = req.params.year as unknown as number;
    res.send(dayEx + ". " + monthNames[monthEx] + " " + yearEx);
})

app.listen(port, () => {
    console.log(`Web started on http://localhost:${port}`)
});