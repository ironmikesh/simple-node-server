const Product = require('./product.model.js');

// CREATE NEW PRODUCT

exports.create = (req, res) => {
    //request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    //Create a product
    const product = new Product(
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            company: req.body.company
        }
    );

    //Save the product to the database
    product.save().then(data => {
        console.log('saving data: ', data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Product saving went horribly wrong."
        });
    });
};

//RETRIEVE ALL PRODUCTS from the database

exports.findAll = (req, res) => {
    Product.find().then(products => {
        console.log('finding all products:', products);
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Whoa, product retrieving screwed up big time"
        });
    });
};

//Find a SINGLE PRODUCT with the product ID

exports.findOne = (req, res) => {
    Product.findById(req.params.productId).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        //otherwise...
        console.log('the single product is: ', product);
        res.send(product);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product so not found with id " + req.params.productId
            });  
        }
        return res.status(500).send(
            {
                message: "Something wrong retrieving product with id " + req.params.productId
            }
        );
    });
};

// UPDATE a SINGLE PRODUCT:

exports.update = (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, {
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {
        new: true
    }).then(product => {
        if (!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.productId
        });
    });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send({ message: "Product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
};