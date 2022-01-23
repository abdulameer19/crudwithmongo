    import express from "express";
    const router = express.Router();
    import {create,findAll, findOne,update,del} from '../controllers/userController.js';

    // Create a new user
    router.route("/add").post(create);

    // Retrieve all user Sorted
    router.route("/findall").get(findAll);

    // Retrieve a single user with userId
    router.route("/findone/:emailAddress").get(findOne);

    // Update a Note with userId
    router.route("/update/:userId").put(update);

    // Delete a Note with userId
    router.route("/del/:userId").delete(del);

    export default router;
