const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
	logging: false
});

const Page = db.define("page", {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM("open", "closed")
	}
}, {
	hooks: {
		beforeValidate: (page) => {
			if(page.title){
				page.urlTitle = page.title.replace(/\s+/g, "_").replace(/\W/g, "");
			}
		}
	},
	getterMethods: {
		route: function() {
			return "/wiki/" + this.urlTitle;
		}
	}
});


const User = db.define("user", {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	}
});

module.exports = {
	Page,
	User
};
