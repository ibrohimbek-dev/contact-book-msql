import mysql from "mysql2/promise";
import moment from "moment";
import "moment-timezone";
import { Connection } from "mysql2";
import { Contact, UpdateContact } from "../libs/types/contact";
import { v4 } from "uuid";
moment.tz.setDefault("Asia/Seoul");

class MySql {
	private con: Connection | any;
	constructor() {
		this.con = null;
	}

	public async connection(): Promise<void> {
		this.con = await mysql.createConnection({
			host: process.env.MYSQLHOST,
			user: process.env.MYSQLUSER,
			password: process.env.MYSQLPASSWORD,
			port: process.env.MYSQLPORT ? Number(process.env.MYSQLPORT) : undefined,
			database: process.env.MYSQLDATABASE,
		});
	}

	public async createNewContact(data: Contact): Promise<Contact> {
		try {
			if (!this.con) await this.connection();
			const uniqueId: string = v4(); // Generate UUID here

			const sql =
				"INSERT INTO contacts (id, name, phone, email, address, created_at) VALUES (?, ?, ?, ?, ?, ?)";
			const createdAt: Date = new Date();

			const values = [
				uniqueId,
				data.name ?? null,
				data.phone ?? null,
				data.email ?? null,
				data.address ?? null,
				createdAt,
			];

			await this.con.execute(sql, values);

			// Construct and return the created contact object
			const createdContact: Contact = {
				id: uniqueId, // Use the generated UUID
				name: data.name ?? null,
				phone: data.phone ?? null,
				email: data.email ?? null,
				address: data.address ?? null,
				createdAt: createdAt, // Use the created timestamp
			};

			return createdContact; // Return the created contact object
		} catch (err) {
			console.error("ERROR ::: addContact", err);
			throw err;
		}
	}

	public async getAllContacts(): Promise<Contact[]> {
		try {
			if (!this.con) await this.connection();
			const query_result = await this.con.execute("SELECT * FROM contacts");
			return query_result[0];
		} catch (err: any) {
			console.error("Error on getAllContacts =>", err);
			throw err;
		}
	}

	public async getContact(targetId: string): Promise<Contact> {
		try {
			if (!this.con) await this.connection();
			const query_result = await this.con.execute(
				"SELECT * FROM contacts WHERE id = ?",
				[targetId]
			);
			return query_result[0][0] || null;
		} catch (err: any) {
			console.error("Error on getAllContacts =>", err);
			throw err;
		}
	}

	public async updateContact(
		id: string,
		data: UpdateContact
	): Promise<UpdateContact> {
		try {
			await this.connection();
			const fieldsToUpdate = [];
			const values = [];

			// Check each field and add it to the query and values if it is defined
			if (data.name !== undefined) {
				fieldsToUpdate.push("name = ?");
				values.push(data.name);
			}
			if (data.phone !== undefined) {
				fieldsToUpdate.push("phone = ?");
				values.push(data.phone);
			}
			if (data.email !== undefined) {
				fieldsToUpdate.push("email = ?");
				values.push(data.email);
			}
			if (data.address !== undefined) {
				fieldsToUpdate.push("address = ?");
				values.push(data.address);
			}

			// Ensure at least one field is provided
			if (fieldsToUpdate.length === 0) {
				throw new Error("No fields to update.");
			}

			const sql = `UPDATE contacts SET ${fieldsToUpdate.join(
				", "
			)} WHERE id = ?`;
			values.push(id); // Add the ID at the end for the WHERE clause

			// Execute the query
			await this.con.execute(sql, values);

			const updatedContact: UpdateContact = {
				name: data.name,
				phone: data.phone,
				email: data.email,
				address: data.address,
			};

			return updatedContact;
		} catch (err) {
			console.error("Error on updateContact =>", err);
			throw err;
		}
	}

	public async deleteContact(id: string): Promise<Contact | null> {
		try {
			if (!this.con) await this.connection();

			// Step 1: Retrieve the contact before deletion
			const [contactResult] = await this.con.execute(
				"SELECT * FROM contacts WHERE id = ?",
				[id]
			);
			const deletedContact: Contact | null = contactResult[0] || null;

			if (!deletedContact) {
				console.log("No contact found with the given ID.");
				return null; // Return null if no contact found
			}

			// Step 2: Delete the contact
			await this.con.execute("DELETE FROM contacts WHERE id = ?", [id]);

			// Step 3: Return the deleted contact
			return deletedContact;
		} catch (err) {
			console.error("Error on deleteContact =>", err);
			throw err; // Rethrow the error for handling upstream
		}
	}
}

export default MySql;
