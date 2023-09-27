const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const user = {
  name: "John",
  age: 18,
  nationality: "Ukrainian",
};

app.use(cors({ origin: "http://localhost:5501", credentials: true }));
// Устанавливаем доверие к прокси
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());

// Маршрут для установки данных в сессию
app.post("/set-session", (req, res) => {
  const { data } = req.body;
  req.session.data = data || "";
  req.session.save();
  console.log("/set-session", req.session);
  return res.json({ data: req.session.data });
});

// Маршрут для получения данных из сессии
app.get("/get-session", (req, res) => {
  console.log("/get-session", req.session);
  return res.json({ data: req.session.data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
