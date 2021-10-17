const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

router.get(`/`, async (req, res) => {
	const userList = await User.find().select("-phone");

	if (!userList) {
		res.status(500).json({
			success: false,
		});
	}
	res.send(userList);
});

router.get(`/:id`, async (req, res) => {
	let id = req.params.id;
	const userList = await User.findById(id).select("name email phone");

	if (!userList) {
		res.status(500).json({
			success: false,
		});
	}
	res.send(userList);
});

router.post("/", async (req, res) => {
	let pwrd = bcrypt.hashSync(req.body.password, 10);

	let user = new User({
		name: req.body.name,
		email: req.body.email,
		passwordHarsh: pwrd,
		phone: req.body.phone,
		isAdmin: req.body.isAdmin,
		street: req.body.street,
		apartment: req.body.apartment,
		city: req.body.city,
		zip: req.body.zip,
		country: req.body.country,
	});

	users = await user.save();

	if (!users) {
		return res
			.status(500)
			.json({
				error: error,
				success: false,
			})
			.send("user not created");
	}
	res.status(201).json(users).send(users);
});

router.post("/login", async (req, res) => {
    let emailing = req.body.email;

    
	const user = await User.findOne({
		email:emailing
	});
const secret = process.env.secret
	if (!user) {
		return res.status(400).send("user not found");
	}

	if (user) {
 


        if (bcrypt.compareSync(req.body.password, user.passwordHarsh)){

const token = jwt.sign({
data : user.id
},
secret,
{expiresIn: '1w'});

             res.status(200).send({user: user.email, token:token});
        }
        else {
            return res
                .status(400)
                .send(`hello seems like your password is not correct`);
        }
	
	} 
});
module.exports = router;
