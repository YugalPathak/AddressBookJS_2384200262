class AddressBook {
    constructor() {
        // Initialize an empty array to store contacts
        this.contacts = [];
    }

    // Adds a new contact to the address book.
    addContact(firstName, lastName, address, city, state, zip, phone, email) {
        // Create a contact object with the provided details
        const contact = {
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            phone,
            email
        };

        // Add the new contact to the contacts array
        this.contacts.push(contact);

        // Log a success message
        console.log("Contact added successfully.");
    }
}

// Example Usage
const myAddressBook = new AddressBook();

// Add a new contact to the address book
myAddressBook.addContact(
    "John", "Doe", "123 Main St", "New York", "NY", "10001", "123-456-7890", "john.doe@example.com"
);