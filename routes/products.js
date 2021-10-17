const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
	let filter = {};
	if (req.query.categories) {
		filter = { category: req.query.categories.split(",") };
	}
	const productL = await Product.find(filter).populate("category"); //! populate fils the sub category.  the request name

	if (productL) {
		res.send(productL);
	} else {
		res.status(500).json({
			success: false,
			message: "cant sync from backend",
		});
	}
});

router.post(`/`, async (req, res) => {
	category = await Category.findById(req.body.category);

	if (!category) {
		return res.status(400).send("invalid category");
	}

	let product = new Product({
		name: req.body.name,
		describe: req.body.describe,
		description: req.body.description,
		richDescription: req.body.richDescription,
		image: req.body.image,
		brand: req.body.brand,
		price: req.body.price,
		category: req.body.category,
		countInStock: req.body.countInStock,
		rating: req.body.rating,
		numReviews: req.body.numReviews,
		isFeatured: req.body.isFeatured,
	});
	products = await product.save();

	if (!products) {
		res.status(500).json({
			success: false,
			message: "product not created",
			error: error,
		});
	}

	res.status(201).send(products).json({
		success: true,
		message: "product created successfully",
	});
});

router.put(`/:id`, async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		res.status(400).json({
			success: false,
			message: "invalid  id",
			error: err,
		});
	}

	category = await Category.findById(req.body.category);

	if (!category) {
		return res.status(400).send("invalid category");
	}

	product = await Product.findByIdAndUpdate(
		req.product.id,
		{
			name: req.body.name,
			describe: req.body.describe,
			description: req.body.description,
			richDescription: req.body.richDescription,
			image: req.body.image,
			brand: req.body.brand,
			price: req.body.price,
			category: req.body.category,
			countInStock: req.body.countInStock,
			rating: req.body.rating,
			numReviews: req.body.numReviews,
			isFeatured: req.body.isFeatured,
		},
		{ new: true }
	);
	products = product.save();

	if (!products) {
		res.status(500).json({
			success: false,
			message: "product not created",
			error: error,
		});
	}

	res.status(201).send(products).json({
		success: true,
		message: "product created successfully",
	});
});

router.delete("/:id", async (req, res) => {
	let product = await Product.findByIdAndDelete(req.params.id);

	if (!product) {
		res,
			status(500).json({
				success: false,
				message: "product not deleted",
				error: err,
			});
	} else {
		res.status(200).json({
			success: true,
			message: "successful delete",
		});
	}
});

//? remember this is for specific param on the table

router.get(`/specific`, async (req, res) => {
	const productL = await Product.find().select("name image -_id"); //! minus id removes the id it means remove that category

	if (productL) {
		res.send(productL);
	} else {
		res.status(500).json({
			success: false,
			message: "cant sync from backend",
		});
	}
});

//! get specifics by id
router.get(`/:id`, async (req, res) => {
	let prod = req.params.id;
	const productL = await Product.findById(req.params.id).populate("category"); //! .populate () fetching all data from category

	if (productL) {
		res.send(productL);
	} else {
		res.status(500).json({
			success: false,
			message: "cant sync from backend",
		});
	}
});

router.get("/get/count", async (req, res) => {
	productCount = await Product.countDocuments((count) => count);

	if (!productCount) {
		res.status(500).json({
			success: false,
			message: "no product count",
			error: err,
		});
	} else {
		res.send(productCount);
	}
});

//  router.get('/get/featured/:count', async(req, res)=>{

//    const productCount = await Product.find({isFeatured:true }).limit(+count)

//     if(!productCount){
//         res.status(500).json({
//             success:false,
//             message: 'no product count',
//             error: err
//         })
//     }
//     else{res.send(productCount)}
//      })

router.get("/get/featured/:count", async (req, res) => {
	const count = req.params.count ? req.params.count : 0;

	await Product.find({ isFeatured: true })
		.limit(+count)
		.then((products) => {
			if (products) {
				return res.send(products);
			} else {
				return res.status(404).json({
					success: false,
					message: " not found",
				});
			}
		})
		.catch((err) => {
			res.status(400).json({
				success: false,
				error: err,
			});
		});
});


module.exports = router;
