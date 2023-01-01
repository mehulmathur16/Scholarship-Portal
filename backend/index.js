const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportLocalMongoose = require('passport-local-mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    User = require("./database/mongomodels/user.js"),
    request = require('request'),
    cheerio = require('cheerio');
cors = require('cors');
require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

    if (!err) {
        console.log("MongoDB connected successfully.");
    }
    else {
        console.log("Error in DB connection : ", err);
    }
})
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var userLoggedIn = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(require('cookie-session')({
    secret: "RSquare Corporation will be there soon",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

app.use(express.static(__dirname + '/styles'));
app.use(morgan('combined'));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.get("/getCurrentLoggedInUser", function (req, res) {
    res.status(200).send({ CurrentUser: userLoggedIn });
})

app.get("/signup", function (req, res) {
    res.status(200).send({ CurrentUser: userLoggedIn });
});

// register route 
app.post("/register", function (req, res) {
    User.register(new User({
        fullname: req.body.name,
        username: req.body.id,  //email
        category: req.body.category,
        spass10: req.body.ssc,
        spass12: req.body.hsc,
        spassgrad: req.body.graduation,
        state: req.body.state,
        branch: req.body.branch,
        income: req.body.income
    }), req.body.password, async function (err, user) {
        if (err) {
            res.send("error");
        }
        res.send("ok");
    });
});

app.post("/login", function (req, res) {
    if (!req.body.username) {
        res.json({ success: false, message: "Username was not given" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
    }
    else {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                res.send({ success: false, message: err + "Hello" });
            }
            else {
                if (!user) {
                    res.send({ success: false, message: "username or password incorrect" });
                }
                else {
                    userLoggedIn = user.username;
                    res.send({ success: true, message: "Authentication successful", user: user.username });
                }
            }

        })(req, res);
    }
});

// logout route
app.get("/logout", function (req, res) {
    userLoggedIn = null;
});

app.get("/", async function (req, res) {

    await db.collection('scholarships').find({}).toArray()
        .then((scholarship) => {
            const op = scholarship.slice(0, 8);

            var objToBeSent = {
                CurrentUser: userLoggedIn,
                scholarships: op,
            }

            res.status(200).send(objToBeSent);
        })
});

app.get("/scholarships", async function (req, res) {
    await db.collection('scholarships').find({}).toArray()
        .then((allscholarships) => {
            var objToBeSent = {
                CurrentUser: userLoggedIn,
                allscholarships: allscholarships,
            }

            res.status(200).send(objToBeSent);
        })
});

app.get("/viewscholarship/:id", async function (req, res) {
    const { id } = req.params;
    await db.collection('scholarships').find({ "id": id }).toArray()
        .then((scholarship) => {
            scholarship[0].docrequired = scholarship[0].docrequired.split("<p>").join(`<i class="fas fa-arrow-right prefix mr-1"></i>&nbsp<span>`);
            scholarship[0].docrequired = scholarship[0].docrequired.split("</p>").join(`</span><br>`);

            if (userLoggedIn) {
                var objToBeSent = {
                    CurrentUser: userLoggedIn,
                    scholarship: scholarship,
                }

                res.status(200).send(objToBeSent);
            } else {
                var objToBeSent = {
                    CurrentUser: null,
                    scholarship: scholarship,
                }

                res.status(200).send(objToBeSent);
            }
        })
});

app.get("/newsupdate", function (req, res) {
    var url = "https://scholarships.gov.in/";

    request(url, function (err, response, html) {
        if (!err) {
            var $ = cheerio.load(html);
            var a = $("marquee").eq('0').text().trim();
            var jsonData = {};
            jsonData['data'] = a;
            res.status(200).send(jsonData);
        }
    });
});

app.post('/getFilters', async function (req, res) {
    var allscholarships = [];
    if (Array.isArray(req.body.authority)) {
        for (let i = 0; i < req.body.authority.length; i++) {
            await db.collection('scholarships').find({ "authority": req.body.authority[i], "category": req.body.category }).toArray()
                .then((arr) => {
                    for (let j = 0; j < arr.length; j++) {
                        allscholarships.push(arr[j]);
                    }
                    res.status(200).send({ CurrentUser: userLoggedIn, allscholarships: allscholarships });
                })
        }
    }
    else {
        await db.collection('scholarships').find({ "authority": req.body.authority }).toArray()
            .then((allscholarships) => {
                res.status(200).send({ CurrentUser: userLoggedIn, allscholarships: allscholarships });
            })
    }
});

app.post("/uploaddata", async (req, res) => {
    await db.collection('scholarships').insertOne(req.body);

    await db.collection('scholarships').find({}).toArray()
        .then((scholarship) => {
            const op = scholarship.slice(0, 8);

            var obj = { CurrentUser: userLoggedIn, scholarships: op }

            res.status(200).send(obj);
        })
});

app.listen(process.env.PORT, process.env.IP, function (req, res) {
    console.log("server started at : ", process.env.PORT);
});

module.exports = app;