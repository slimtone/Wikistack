const express = require("express");
const router = express.Router();
const models = require("../models");
const Page = models.Page;
module.exports = router;

router.get("/", (req, res, next) =>{

	Page.findAll({})
		.then( (thePages) => {
			res.render("index", {
				pages: thePages
			});
		})
		.catch(next);
});

router.post("/", (req, res, next) => {
	const newPage = Page.build(req.body);

	newPage.save()
		.then( (page) => {
			res.redirect(page.route);
		})
		.catch(next);
});

router.get("/add", (req, res) => {
	res.render("addpage");
});

router.get("/:urlTitle", (req, res, next) => {
	const urlTitleOfAPage = req.params.urlTitle;

	Page.find({
		where: {
			urlTitle: urlTitleOfAPage
		}
	})
		.then( (page) => {
			if(page === null){
				return next(new Error("That page was not found"));
			}
			res.render("wikipage", {
				page: page
			});
		})
		.catch( (err) => {
			next(err);
		});
});
