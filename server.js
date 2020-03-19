// Dependendencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// set up Express App
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Table (DATA)
// ===================================
var tables = [
    {
    routeName: "johnsmith",
    name: "John Smith",
    partySize: 4,
    phoneNum: 5127398301,
    email: "johnS@gmail.com",
    },
    {
    routeName: "mikejones",
    name: "Mike Jones",
    partySize: 2,
    phoneNum: 5127716131,
    email: "mikeJ@gmail.com",
    },
    {
    routeName: "rickross",
    name: "Rick Ross",
    partySize: 14,
    phoneNum: 5127812231,
    email: "rickR@gmail.com",
    },
    {
    routeName: "barrackobama",
    name: "Barrack Obama",
    partySize: 2,
    phoneNum: 5127014200,
    email: "barrackO@gmail.com",
    }
];

var waitlist =[
    {
    routeName: "riffraff",
    name: "Riff Raff",
    partySize: 10,
    phoneNum: 5121234567,
    email: "riffR@gmail.com",
    }
]

// Basic route for home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/routes/index.html"));
});

// sends user to the Add reservation page
app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "/routes/add.html"));
});

// Sends user to the view reservation page
app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "/routes/view.html"));
});

// Displays all Tables up to 5
app.get("/api/tables", function(req, res) {
    return res.json(tables);
})

// Displays waitlist only full if tables are all full or 5+
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
})

// Displays a single Table or returns false
app.get("/api/tables/:table", function(req, res) {
    var tableId = req.params.table;
    // logs the table 'id'
    console.log(tableId);

    for (var i = 0; i < tables.length; i++) {
        if (tableId === tables[i].routeName) {
          return res.json(tables[i]);
        };
    };
    
    return res.json(false);
})

// Displays a single Table from waitlist
app.get("/api/waitlist/:table", function(req, res) {
    var tableId = req.params.table;
    // logs the table 'id'
    console.log(tableId);

    for (var i = 0; i < waitlist.length; i++) {
        if (tableId === waitlist[i].routeName) {
          return res.json(waitlist[i]);
        };
    };
    
    return res.json(false);
})


// creates new Table - takes in json input
app.post("/api/tables", function(req, res) {
    var newTable = req.body;

    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
    // Add ne table to the waitlist if the tables length is greater then 5
    if (tables.length >= 5) {
        console.log(newTable.name + " Has been added to the waitlist.");
        waitlist.push(newTable);
        
    }
    // if the tables length is less then 5 it will be added to the tables array.
    else {
        console.log(newTable.name  + " Has been seated.");
        tables.push(newTable);
    };
    res.json(newTable);
})



// ================================================
// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("app is now listening at http://localhost:" + PORT);
});