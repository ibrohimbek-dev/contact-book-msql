// Select all delete buttons
const deleteContacts = document.querySelectorAll(".delete-contact");

deleteContacts.forEach((button) => {
	button.addEventListener("click", async (event) => {
		const contactId = button.dataset.id; // Get the contact ID from data attribute

		// Show confirmation dialog
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "This action cannot be undone!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		});

		// If the user confirmed the deletion
		if (result.isConfirmed) {
			try {
				// Call your delete function (assuming you have a deleteContact function)
				await deleteContact(contactId);
				Swal.fire("Deleted!", "Contact has been deleted.", "success");
				window.location.reload();

				// Optionally, remove the contact from the DOM
				button.closest("tr").remove(); // Remove the contact row from the table
			} catch (error) {
				console.error("Error deleting contact:", error);
				Swal.fire(
					"Error!",
					"There was a problem deleting the contact.",
					"error"
				);
			}
		}
	});
});

// Example deleteContact function
async function deleteContact(contactId) {
	const response = await axios.delete(`/delete/${contactId}`);
	return response.data;
}
