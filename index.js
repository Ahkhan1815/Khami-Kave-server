const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers

const gamePostsRouter = require("./routes/GamesPosts");
app.use("/gameposts", gamePostsRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
    app.listen(3002, () => {
        console.log("Server running on port 3002");
    });
});
