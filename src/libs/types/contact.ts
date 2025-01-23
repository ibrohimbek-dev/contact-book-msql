export interface Contact {
	id?: string;
	name: string;
	phone: string;
	email: string;
	address: string;
	createdAt: Date;
}

export interface UpdateContact {
	name?: string;
	phone?: string;
	email?: string;
	address?: string;
}
