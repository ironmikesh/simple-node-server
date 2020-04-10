const Application = require('./application.model.js');

// CREATE NEW application

exports.create = (req, res) => {
    //request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Application content cannot be empty"
        });
    }

    //Create an application
    const application = new Application(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date,
            email: req.body.email
        }
    );

    //Save the application to the database
    application.save().then(data => {
        console.log('saving data: ', data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "application saving went horribly wrong."
        });
    });
};

//RETRIEVE ALL APPLICATIONS from the database

exports.findAll = (req, res) => {
    Application.find().then(applications => {
        console.log('finding all applications:', applications);
        res.send(applications);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Whoa, application retrieving screwed up big time"
        });
    });
};

//Find a SINGLE APPLICATION with the application ID

exports.findOne = (req, res) => {
    Application.findById(req.params.applicationId).then(application => {
        if (!application) {
            return res.status(404).send({
                message: "application not found with id " + req.params.applicationId
            });
        }
        //otherwise...
        console.log('the single application is: ', application);
        res.send(application);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "application so not found with id " + req.params.applicationId
            });  
        }
        return res.status(500).send(
            {
                message: "Something wrong retrieving application with id " + req.params.applicationId
            }
        );
    });
};

// UPDATE a SINGLE Application:

exports.update = (req, res) => {
    Application.findByIdAndUpdate(req.params.applicationId, {
        first_name: req.body.first_name || "No First Name",
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        email: req.body.email
    }, {
        new: true
    }).then(application => {
        if (!application) {
            return res.status(404).send({
                message: "application not found with id " + req.params.applicationId
            });
        }
        res.send(application);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "application not found with id " + req.params.applicationId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.applicationId
        });
    });
};


// Delete an application with the specified applicationId in the request
exports.delete = (req, res) => {
    Application.findByIdAndRemove(req.params.applicationId)
        .then(application => {
            if (!application) {
                return res.status(404).send({
                    message: "application not found with id " + req.params.applicationId
                });
            }
            res.send({ message: "application deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "application not found with id " + req.params.applicationId
                });
            }
            return res.status(500).send({
                message: "Could not delete application with id " + req.params.applicationId
            });
        });
};