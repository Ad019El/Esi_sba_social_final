const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

var cors = require("cors");
app.use(cors());
// Connect mongoDB

connectDB();

// Init express Middleware

app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/users", require("./routes/users2"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/request", require("./routes/request"));
app.use("/requests", require("./routes/requests"));
app.use("/api/meeting", require("./routes/meeting"));
app.use("/notifications", require("./routes/notifications"));
app.use("/budget", require("./routes/budget"));

//new routes
const chapitreRouter = require("./routes/chapitres");
const sous_chapitreRouter = require("./routes/sous_chapitres");
const articleRouter = require("./routes/articles");
const offreRouter = require("./routes/offres");

app.use("/chapitres", chapitreRouter);
app.use("/sous_chapitres", sous_chapitreRouter);
app.use("/articles", articleRouter);
app.use("/offres", offreRouter);
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started, port: ${PORT}`));
