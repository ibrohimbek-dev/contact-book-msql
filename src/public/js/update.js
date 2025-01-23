const editName = document.getElementById("update-name");
const editPhone = document.getElementById("update-phone");
const editEmail = document.getElementById("update-email");
const editAddress = document.getElementById("update-address");

// ==============================================
// MODAL
document.querySelectorAll(".contact-modal-trigger").forEach((button) => {
	button.addEventListener("click", () => {
		const modalId = button.getAttribute("data-modal-target");

		const modal = document.getElementById(modalId.slice(1));
		modal.style.display = "block";
	});
});

document.querySelectorAll(".contact-modal-close").forEach((button) => {
	button.addEventListener("click", () => {
		const modal = button.closest(".contact-modal");
		modal.style.display = "none";
	});
});

// =========================================
// UPDATE LOGIC
document.querySelectorAll("#save-changes").forEach((button) => {
	button.addEventListener("click", () => {
		const modal = button.closest(".contact-modal");
		const contactId = modal.getAttribute("data-contact-id");

		// Capture input values
		const name = modal.querySelector("#update-name").value;
		const phone = modal.querySelector("#update-phone").value;
		const email = modal.querySelector("#update-email").value;
		const address = modal.querySelector("#update-address").value;

		updateContact(contactId, { name, phone, email, address });

		// Close the modal
		modal.style.display = "none";
	});
});

function prefillModal(contactId) {
	// Fetch the current contact data (this could be from a global state, API, etc.)
	// Example:
	const contact = getContactById(contactId); // Implement this function based on your data source

	if (contact) {
		document.querySelector(`#contact-modal-${contactId} #update-name`).value =
			contact.name;
		document.querySelector(`#contact-modal-${contactId} #update-phone`).value =
			contact.phone;
		document.querySelector(`#contact-modal-${contactId} #update-email`).value =
			contact.email;
		document.querySelector(
			`#contact-modal-${contactId} #update-address`
		).value = contact.address;
	}
}

const updateContact = async (contactId, updatedData) => {
	// Example: Get the existing contact data for comparison
	const existingContact = await getContactById(contactId); // Implement this function based on your data source

	// Check for empty fields
	if (
		!updatedData.name ||
		!updatedData.phone ||
		!updatedData.email ||
		!updatedData.address
	) {
		Swal.fire({
			title: "Warning!",
			text: "Please fill in all fields.",
			icon: "warning",
			confirmButtonText: "OK",
		});
		return; // Exit the function if validation fails
	}

	if (
		updatedData.name === existingContact.name &&
		updatedData.phone === existingContact.phone &&
		updatedData.email === existingContact.email &&
		updatedData.address === existingContact.address
	) {
		Swal.fire({
			title: "Info!",
			text: "No changes detected. Please modify the fields to update.",
			icon: "info",
			confirmButtonText: "OK",
		});
		return; // Exit the function if no changes are detected
	}

	try {
		// Proceed with the update if validation passes
		const response = await axios.put(`/update/${contactId}`, updatedData);
		const contactElement = document.createElement("tr");
		contactElement.innerHTML = contactTemplate(response.data);
		contactList.insertAdjacentElement("beforeend", contactElement);

		if (response.status === 200) {
			Swal.fire({
				title: "Contact updated successfully!",
				icon: "success",
				confirmButtonText: "Okay",
			});
			window.location.reload();
		}
	} catch (error) {
		console.error("There was a problem with the update:", error);

		// Show error alert
		Swal.fire({
			title: "Error!",
			text: "There was a problem updating the contact.",
			icon: "error",
			confirmButtonText: "Try Again",
		});
	}
};

// Example function to simulate fetching a contact by ID
const getContactById = async (contactId) => {
	return await axios
		.get(`/${contactId}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error("There was a problem fetching the contact:", error);
			return null;
		});
};
