var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var Article = require("./models/Article.js");
var Note = require("./models/Note.js");
var app = express();
app.use(logger("dev"));
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));
mongoose.Promise = Promise;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/nytreact");
}
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.get("/", function(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", function(req, res) {
  console.log("fired server get api");
  Article.find({}).sort([
    ["date", "descending"]
  ]).limit(5).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("doc=", doc);
      res.send(doc);
    }
  });
});


// app.post("/api", function(req, res) {
// 	console.log("fired server post api");
// 	Article.create({
// 		title: "Test Title Post",
// 		date: Date.now()
// 	}, function(err){
// 		if (err){
// 			console.log(err);
// 		} else {
// 			res.send("Saved Test Title 2");
// 		}
// 	});
// });


// app.get("/scrape", function(req, res) {
//   request("http://www.kentucky.com/latest-news/", function(error, response, html) {
//     var $ = cheerio.load(html);
//     $("article h4").each(function(i, element) {
//       var result = {};
//       result.title = $(this).children("a").text();
//       result.link = $(this).children("a").attr("href");
//       var entry = new Article(result);
//       entry.save(function(err, doc) {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           console.log(doc);
//         }
//       });
//     });
//   });
//   res.send("Scrape Complete");
// });

// app.get("/articles", function(req, res) {
//   Article.find({}, function(error, doc) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(doc);
//     }
//   });
// });

// app.get("/articles/:id", function(req, res) {
//   Article.findOne({ "_id": req.params.id })
//   .populate("note")
//   .exec(function(error, doc) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(doc);
//     }
//   });
// });

// app.post("/articles/:id", function(req, res) {
//   var newNote = new Note(req.body);
//   newNote.save(function(error, doc) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
//       .exec(function(err, doc) {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           res.send(doc);
//         }
//       });
//     }
//   });
// });

app.listen(PORT, function() {
  console.log("Server running, port = " + PORT);
});
