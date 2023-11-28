import express from "express";
import getLocaleStringDay from "./lib/localeStringDay";

const monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];

const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();

const app = express();
const port = process.env.PORT ?? 3000;

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