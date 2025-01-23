import { Contact, UpdateContact } from "../libs/types/contact";
import MySql from "./mySql";

class ContactModel {
	private db: MySql;

	constructor() {
		this.db = new MySql();
	}

	// Create
	public async createNewContact(data: Contact): Promise<Contact> {
		try {
			const createdContact: Contact = await this.db.createNewContact(data);
			return createdContact;
		} catch (err: any) {
			console.error("ERROR ::: ContactModel.createNewContact", err);
			throw err;
		}
	}

	// Read
	public async getAllContacts(): Promise<Contact[]> {
		try {
			const contacts = await this.db.getAllContacts();
			return contacts;
		} catch (err: any) {
			console.error("Error on ContactModel.getAllContacts =>", err);
			throw err;
		}
	}

	public async getContact(targetId: string): Promise<Contact> {
		try {
			const targetContact: Contact = await this.db.getContact(targetId);
			return targetContact;
		} catch (err: any) {
			console.error("Error on ContactModel.getContact =>", err);
			throw err;
		}
	}

	// Update
	public async updateContact(
		id: string,
		data: UpdateContact
	): Promise<UpdateContact> {
		try {
			const updatedContact: UpdateContact = await this.db.updateContact(
				id,
				data
			);
			return updatedContact;
		} catch (err: any) {
			console.error("ERROR ::: ContactModel.updateContact", err);
			throw err;
		}
	}

	// Delete
	public async deleteContact(id: string): Promise<Contact | null> {
		try {
			return await this.db.deleteContact(id);
		} catch (err: any) {
			console.error("ERROR ::: ContactModel.deleteContact", err);
			throw err;
		}
	}

	// Example method with a delay (for testing purposes)
	public onDelay(): Promise<string> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("How are you!");
			}, 3000);
		});
	}
}

export default ContactModel;
