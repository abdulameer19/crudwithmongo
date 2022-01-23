import Users from '../models/userModel.js';

// Create and Save a new user
const create = (req, res) => {
    // Validate request
    

    // Create a user
    const users = new Users({
        
        userId: req.body.userId, 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress
    });

    // Save user in the database
    users.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};
const findAll = (req, res) => {
    Users.find().sort({"userId":1})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};


const findOne = (req, res) => {
    Users.findOne({emailAddress:req.params.emailAddress})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};



// Update a user identified by the userId in the request
const update = (req, res) => {
  

    // Find user and update it with the request body
    Users.findByIdAndUpdate(req.params.userId, {
        userId: req.body.userId, 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};



const del = (req, res) => {
    Users.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};


export{create,findAll,findOne,update,del};