import { Request, Response } from "express";
import ContactModel from "../models/contactModel";
import { T } from "../libs/types/common";
import { Contact, UpdateContact } from "../libs/types/contact";

const contactController: T = {};

// Create
contactController.prepareNewContact = (req: Request, res: Response): void => {
	res.render("createContact"); // Render the form for creating a contact
};

// Create
contactController.createNewContact = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const req_data = req.body;
		const contactModel = new ContactModel();
		const createdContact: Contact = await contactModel.createNewContact(
			req_data
		);
		res.status(201).json(createdContact);
	} catch (err: any) {
		console.error("Error on contactController.createNewContact =>", err);
		res.status(500).send(err.message);
	}
};

// Read
contactController.getAllContacts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const contactModel = new ContactModel();
		const contacts = await contactModel.getAllContacts();
		res.render("contacts", { contacts }); // Pass the contact data to the view
	} catch (err: any) {
		console.log("Error on contactController.getAllContacts =>", err);
		res.status(500).send("Error on contactController.getAllContacts");
	}
};

contactController.getContact = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const targetId = req.params.id;
		const contactModel = new ContactModel();
		const targetContact: Contact = await contactModel.getContact(targetId);
		res.status(200).json(targetContact);
	} catch (err: any) {
		console.log("Error on contactController.getContact =>", err);
		res.status(500).send("Error on contactController.getContact");
	}
};

// Update
contactController.updateContact = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const contactId = req.params.id;
		const req_data = req.body;
		const contactModel = new ContactModel();
		const updatedContact: UpdateContact = await contactModel.updateContact(
			contactId,
			req_data
		);		
		res.status(200).json(updatedContact);
	} catch (err: any) {
		console.error("Error on contactController.updateContact =>", err);
		res.status(500).send(err.message);
	}
};

// Delete
contactController.deleteContact = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const contactId = req.params.id;
		const contactModel = new ContactModel();
		const deletedContact: Contact | null = await contactModel.deleteContact(
			contactId
		);		
		if (deletedContact) {			
			res.status(200).json(deletedContact); // Respond with the deleted contact
		} else {
			res.status(404).send("Contact not found."); // Handle not found case
		}
	} catch (err: any) {
		console.error("Error on contactController.deleteContact =>", err);
		res.status(500).send("Error on contactController.deleteContact");
	}
};

export default contactController;
