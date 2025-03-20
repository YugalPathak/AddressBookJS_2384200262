class AddressBook {
    constructor() {
        this.contacts = [];
    }

    validateContact(firstName, lastName, address, city, state, zip, phone, email) {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/; // First letter capital, min 3 characters
        const addressPattern = /^.{4,}$/; // Min 4 characters
        const zipPattern = /^[0-9]{5,6}$/; // 5-6 digit zip code
        const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/; // Format: 123-456-7890
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email format

        if (!namePattern.test(firstName)) throw new Error("Invalid First Name! Should start with a capital letter and have at least 3 characters.");
        if (!namePattern.test(lastName)) throw new Error("Invalid Last Name! Should start with a capital letter and have at least 3 characters.");
        if (!addressPattern.test(address)) throw new Error("Invalid Address! Should have at least 4 characters.");
        if (!addressPattern.test(city)) throw new Error("Invalid City! Should have at least 4 characters.");
        if (!addressPattern.test(state)) throw new Error("Invalid State! Should have at least 4 characters.");
        if (!zipPattern.test(zip)) throw new Error("Invalid Zip Code! Should be 5 or 6 digits.");
        if (!phonePattern.test(phone)) throw new Error("Invalid Phone Number! Use format: 123-456-7890.");
        if (!emailPattern.test(email)) throw new Error("Invalid Email Address! Should be in a valid format.");
    }

    checkDuplicate(firstName, lastName) {
        return this.contacts.some(
            (contact) => contact.firstName === firstName && contact.lastName === lastName
        );
    }

    addContact(firstName, lastName, address, city, state, zip, phone, email) {
        if (this.checkDuplicate(firstName, lastName)) {
            console.log(`Duplicate Entry! Contact "${firstName} ${lastName}" already exists.`);
            return;
        }

        try {
            this.validateContact(firstName, lastName, address, city, state, zip, phone, email);
            const contact = { firstName, lastName, address, city, state, zip, phone, email };
            this.contacts.push(contact);
            console.log(`Contact added successfully: ${firstName} ${lastName}`);
        } catch (error) {
            console.error(error.message);
        }
    }

    findContact(firstName, lastName) {
        const contact = this.contacts.find(
            (c) => c.firstName === firstName && c.lastName === lastName
        );

        if (contact) {
            console.log("Contact Found:", contact);
            return contact;
        } else {
            console.log(`Contact "${firstName} ${lastName}" not found.`);
            return null;
        }
    }

    editContact(firstName, lastName, newDetails) {
        const contactIndex = this.contacts.findIndex(
            (c) => c.firstName === firstName && c.lastName === lastName
        );

        if (contactIndex !== -1) {
            try {
                this.validateContact(
                    newDetails.firstName || firstName,
                    newDetails.lastName || lastName,
                    newDetails.address || this.contacts[contactIndex].address,
                    newDetails.city || this.contacts[contactIndex].city,
                    newDetails.state || this.contacts[contactIndex].state,
                    newDetails.zip || this.contacts[contactIndex].zip,
                    newDetails.phone || this.contacts[contactIndex].phone,
                    newDetails.email || this.contacts[contactIndex].email
                );

                this.contacts[contactIndex] = {
                    ...this.contacts[contactIndex],
                    ...newDetails
                };

                console.log(`Contact "${firstName} ${lastName}" updated successfully.`);
            } catch (error) {
                console.error(error.message);
            }
        } else {
            console.log(`Contact "${firstName} ${lastName}" not found.`);
        }
    }

    deleteContact(firstName, lastName) {
        const contactIndex = this.contacts.findIndex(
            (c) => c.firstName === firstName && c.lastName === lastName
        );

        if (contactIndex !== -1) {
            this.contacts.splice(contactIndex, 1);
            console.log(`Contact "${firstName} ${lastName}" deleted successfully.`);
        } else {
            console.log(`Contact "${firstName} ${lastName}" not found.`);
        }
    }

    countContacts() {
        console.log(`Number of contacts: ${this.contacts.length}`);
        return this.contacts.length;
    }

    searchByCity(city) {
        const results = this.contacts.filter(contact => contact.city === city);
        if (results.length > 0) {
            console.log(`Contacts in ${city}:`, results.map(contact => `${contact.firstName} ${contact.lastName}`));
        } else {
            console.log(`No contacts found in ${city}.`);
        }
        return results;
    }

    searchByState(state) {
        const results = this.contacts.filter(contact => contact.state === state);
        if (results.length > 0) {
            console.log(`Contacts in ${state}:`, results.map(contact => `${contact.firstName} ${contact.lastName}`));
        } else {
            console.log(`No contacts found in ${state}.`);
        }
        return results;
    }
}

// Example Usage
const myAddressBook = new AddressBook();

// Add Contacts
myAddressBook.addContact("John", "Doe", "123 Main St", "New York", "New York", "10001", "123-456-7890", "john.doe@example.com");
myAddressBook.addContact("Emma", "Johnson", "789 Park Ave", "Los Angeles", "California", "90002", "222-333-4444", "emma.johnson@email.com");
myAddressBook.addContact("Michael", "Smith", "321 Oak St", "New York", "New York", "10003", "555-666-7777", "michael.smith@email.com");

// Search by City
myAddressBook.searchByCity("New York"); // Should list John Doe & Michael Smith

// Search by State
myAddressBook.searchByState("California"); // Should list Emma Johnson

// Count Contacts
myAddressBook.countContacts(); // Should print 3

// Edit Contact
myAddressBook.editContact("John", "Doe", { address: "456 Updated St", phone: "999-888-7777" });

// Find Contact
myAddressBook.findContact("John", "Doe");

// Delete Contact
myAddressBook.deleteContact("Emma", "Johnson");

// Count Contacts Again
myAddressBook.countContacts(); // Should print 2