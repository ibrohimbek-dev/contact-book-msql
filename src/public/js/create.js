const createContact = document.getElementById("create-contact");
const contactList = document.getElementById("contact-list");

const createName = document.getElementById("create-name");
const createPhone = document.getElementById("create-phone");
const createEmail = document.getElementById("create-email");
const createAddress = document.getElementById("create-address");

// ==========================================================

const contactTemplate = (contact) => {
	return `<tr key="contact-${contact?.id}" id="${contact?.id}" class="hover:bg-gray-50">
						<td class="border-b p-2">${contact.name}</td>
						<td class="border-b p-2">${contact.phone}</td>
						<td class="border-b p-2">${contact.email}</td>
						<td class="border-b p-2">${contact.address}</td>
						<td class="border-b p-2">
							<button
								data-modal-target="#contact-modal-${contact?.id}"
								data-id="${contact.id}"
								class="bg-yellow-500 cursor-pointer contact-modal-trigger text-white p-1 rounded hover:bg-yellow-600 transition duration-200"
							>
								Edit
							</button>
							<button
								id="delete-contact"
								data-id="${contact.id}"
								class="bg-red-500 delete-contact text-white p-1 rounded hover:bg-red-600 transition duration-200"
							>
								Delete
							</button>
						</td>
					</tr>`;
};

// FRONTEND => BACKEND => DATABASE => BACKEND => FRONTEND

// Function to validate input fields
function validateInputs() {
	let isValid = true; // Assume valid initially

	// Check if each field is empty and provide feedback using Swal.fire
	if (!createName.value.trim()) {
		isValid = false;
		Swal.fire({
			title: "Name is required.",
			icon: "warning",
			confirmButtonText: "Okay",
		});
	}

	if (!createPhone.value.trim()) {
		isValid = false;
		Swal.fire({
			title: "Phone number is required.",
			icon: "warning",
			confirmButtonText: "Okay",
		});
	}

	if (!createEmail.value.trim()) {
		isValid = false;
		Swal.fire({
			title: "Email is required.",
			icon: "warning",
			confirmButtonText: "Okay",
		});
	}

	if (!createAddress.value.trim()) {
		isValid = false;
		Swal.fire({
			title: "Address is required.",
			icon: "warning",
			confirmButtonText: "Okay",
		});
	}

	return isValid; // Return true if all fields are valid
}

// Create Contact
createContact.addEventListener("submit", async (event) => {
	event.preventDefault();

	if (!validateInputs()) {
		return;
	}

	const createdContact = {
		name: createName.value.trim(),
		phone: createPhone.value.trim(),
		email: createEmail.value.trim(),
		address: createAddress.value.trim(),
	};

	try {
		const response = await axios.post("/create", createdContact);
		const contactElement = document.createElement("tr");
		contactElement.innerHTML = contactTemplate(response.data);
		contactList.insertAdjacentElement("beforeend", contactElement);

		if (response.status === 201) {
			Swal.fire({
				title: "Contact created successfully!",
				icon: "success",
				confirmButtonText: "Okay",
      });
      window.location.reload();
			createContact.reset();
		}
	} catch (err) {
		console.error("Error occurred while creating contact:", err);
		Swal.fire({
			title: "Error creating contact.",
			text: "Please try again later.",
			icon: "error",
			confirmButtonText: "Okay",
		});
	}
});