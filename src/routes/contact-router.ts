import contactController from "../controllers/contactController";
import express from "express";
const contactRouter = express.Router();

// CRUD OPERATIONS BY MYSQLS DATABASE

contactRouter.get("/prepare", contactController.prepareNewContact);

// Create
contactRouter.post("/create", contactController.createNewContact);
// Read
contactRouter.get("/", contactController.getAllContacts);
contactRouter.get("/:id", contactController.getContact);
// Update
contactRouter.put("/update/:id", contactController.updateContact);
// Delete
contactRouter.delete("/delete/:id", contactController.deleteContact);

export default contactRouter;
