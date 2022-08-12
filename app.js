const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    User = require("./database/mongomodels/user.js"),
    request = require('request'),
    cheerio = require('cheerio');
require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(require('express-session')({
    secret: "RSquare Corporation will be there soon",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(__dirname + '/styles'));
app.use(morgan('combined'));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.get("/signup", function (req, res) {
    res.render("register", { CurrentUser: req.user });
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
            console.log(err);
            return res.render("index");
        }
        res.redirect("/");
    });
});

// login route
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/india"
}), function (req, res) {

});

app.post("/checkEligibility", function (req, res) {
    console.log(req.body, req.query.id);
    // res.redirect("/")
});

// logout route
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

app.get("/", async function (req, res) {
    var scholarship = await db.collection('scholarships').find({}).toArray();
    const op = scholarship.slice(0, 8);
    res.render("index", { CurrentUser: req.user, scholarships: op });
});

app.get("/scholarships", async function (req, res) {
    var allscholarships = await db.collection('scholarships').find({}).toArray();
    res.render("scholarships", { CurrentUser: req.user, allscholarships: allscholarships });
});

app.get("/viewscholarship", async function (req, res) {

    var scholarship = await db.collection('scholarships').find({ "id": req.query.id }).toArray();

    scholarship[0].docrequired = scholarship[0].docrequired.split("<p>").join(`<i class="fas fa-arrow-right prefix mr-1"></i>&nbsp<span>`);
    scholarship[0].docrequired = scholarship[0].docrequired.split("</p>").join(`</span><br>`);

    if (req.user) {
        res.render("viewscholarship", { id: req.query.id, CurrentUser: req.user, scholarship: scholarship });
    } else {
        res.render("viewscholarship", { id: req.query.id, CurrentUser: 'idea', scholarship: scholarship });
    }
});

app.get("/newsupdate", function (req, res) {
    var temp = "";
    var url = "https://scholarships.gov.in/";
    request(url, function (err, response, html) {
        if (!err) {
            var $ = cheerio.load(html);
            var a = $("marquee").eq('0').text().trim();
            var jsonData = {};
            jsonData['data'] = a;
            res.send(jsonData);
        }
    });
});

app.get("/dashboard", function (req, res) {
    res.render("dashboard", { CurrentUser: req.user });
})

app.get("/chatbot", function (req, res) {
    res.render("chatbot", { CurrentUser: req.user });
})

app.post('/getFilters', async function (req, res) {
    var allscholarships = [];
    if (Array.isArray(req.body.authority)) {
        for (let i = 0; i < req.body.authority.length; i++) {
            let arr = (await db.collection('scholarships').find({ "authority": req.body.authority[i], "category": req.body.category }).toArray());

            for (let j = 0; j < arr.length; j++) {
                allscholarships.push(arr[j]);
            }
        }
    }
    else {
        allscholarships = await db.collection('scholarships').find({ "authority": req.body.authority }).toArray();
    }
    res.render("scholarships", { CurrentUser: req.user, allscholarships: allscholarships });
});

app.post("/uploaddata", async (req, res) => {
    await db.collection('scholarships').insertOne(req.body);

    var scholarship = await db.collection('scholarships').find({}).toArray();
    const op = scholarship.slice(0, 8);
    res.render("index", { CurrentUser: req.user, scholarships: op });
});
app.listen(process.env.PORT, process.env.IP, function (req, res) {
    console.log("server started at : ", process.env.PORT);
});