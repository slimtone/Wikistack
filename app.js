const express = require("express");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const models = require("./models");
const Page = models.Page;
const User = models.User;


const app = express();
const wikiRouter = require("./routes/wiki");


nunjucks.configure("views", {noCache: true});
app.set("view engine", "html");
app.engine("html", nunjucks.render);



app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use("/wiki", wikiRouter);

app.get("/", (req, res) => {
	res.render("index");
});

app.use( (err, req, res, next) => {
	console.error(err);
	res.status(500).send(err.message);
});

User.sync()
	.then( () =>{
		return Page.sync();
	})
	.then( () => {
		app.listen(3000, () => {
			console.log("Server is up and running on port 3000");
		});
});
