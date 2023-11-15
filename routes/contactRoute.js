import express from "express";
// Controller
import {
  deleteContactById,
  getContact,
  getContactById,
  postContact,
  updateContactById,
} from "../controllers/index.js";
import validateToken from "../middleware/validateToken.js";

const contactRoute = express.Router();
// BaseUrl = /api/contact

// All routes are protected soo we are going to use a middleware for checing jwt token
contactRoute.use(validateToken);

// Access url: /api/contact
contactRoute.route("/").get(getContact).post(postContact);

// Access url: /api/contact/:id
contactRoute
  .route("/:id")
  .get(getContactById)
  .put(updateContactById)
  .delete(deleteContactById);

export default contactRoute;
