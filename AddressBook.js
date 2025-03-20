class AddressBook {
    constructor() {
        this.contacts = [];
    }

    validateContact(firstName, lastName, address, city, state, zip, phone, email) {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
        const addressPattern = /^.{4,}$/;
        const zipPattern = /^[0-9]{5,6}$/;
        const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!namePattern.test(firstName)) throw new Error("Invalid First Name!");
        if (!namePattern.test(lastName)) throw new Error("Invalid Last Name!");
        if (!addressPattern.test(address)) throw new Error("Invalid Address!");
        if (!addressPattern.test(city)) throw new Error("Invalid City!");
        if (!addressPattern.test(state)) throw new Error("Invalid State!");
        if (!zipPattern.test(zip)) throw new Error("Invalid Zip Code!");
        if (!phonePattern.test(phone)) throw new Error("Invalid Phone Number!");
        if (!emailPattern.test(email)) throw new Error("Invalid Email Address!");
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

    // Search Person in a Particular City or State
    searchByCity(city) {
        return this.contacts.filter(contact => contact.city === city);
    }

    searchByState(state) {
        return this.contacts.filter(contact => contact.state === state);
    }

    // View Persons by City or State
    viewPersonsByCity(city) {
        console.log(`Persons in ${city}:`);
        this.contacts.forEach(contact => {
            if (contact.city === city) console.log(`${contact.firstName} ${contact.lastName}`);
        });
    }

    viewPersonsByState(state) {
        console.log(`Persons in ${state}:`);
        this.contacts.forEach(contact => {
            if (contact.state === state) console.log(`${contact.firstName} ${contact.lastName}`);
        });
    }

    // Count Persons by City or State
    countByCity(city) {
        const count = this.contacts.filter(contact => contact.city === city).length;
        console.log(`Number of contacts in ${city}: ${count}`);
        return count;
    }

    countByState(state) {
        const count = this.contacts.filter(contact => contact.state === state).length;
        console.log(`Number of contacts in ${state}: ${count}`);
        return count;
    }

    // Sort Contacts Alphabetically by First Name, then Last Name
    sortContactsByName() {
        this.contacts.sort((a, b) => {
            if (a.firstName !== b.firstName) {
                return a.firstName.localeCompare(b.firstName);
            }
            return a.lastName.localeCompare(b.lastName);
        });

        console.log("\nSorted Contacts:");
        this.contacts.forEach(contact => console.log(`${contact.firstName} ${contact.lastName}`));
    }

    // Sort Contacts by City
    sortContactsByCity() {
        this.contacts.sort((a, b) => a.city.localeCompare(b.city));

        console.log("\nSorted Contacts by City:");
        this.contacts.forEach(contact => console.log(`${contact.firstName} ${contact.lastName} - ${contact.city}`));
    }

    // Sort Contacts by State
    sortContactsByState() {
        this.contacts.sort((a, b) => a.state.localeCompare(b.state));

        console.log("\nSorted Contacts by State:");
        this.contacts.forEach(contact => console.log(`${contact.firstName} ${contact.lastName} - ${contact.state}`));
    }

    // Sort Contacts by Zip Code
    sortContactsByZip() {
        this.contacts.sort((a, b) => a.zip.localeCompare(b.zip));

        console.log("\nSorted Contacts by Zip Code:");
        this.contacts.forEach(contact => console.log(`${contact.firstName} ${contact.lastName} - Zip: ${contact.zip}`));
    }
}

// Example Usage
const myAddressBook = new AddressBook();

// Add Contacts
myAddressBook.addContact("John", "Doe", "123 Main St", "New York", "New York", "10001", "123-456-7890", "john.doe@example.com");
myAddressBook.addContact("Emma", "Johnson", "789 Park Ave", "Los Angeles", "California", "90002", "222-333-4444", "emma.johnson@email.com");
myAddressBook.addContact("Michael", "Smith", "321 Oak St", "New York", "New York", "10003", "555-666-7777", "michael.smith@email.com");
myAddressBook.addContact("Alice", "Brown", "555 Elm St", "San Francisco", "California", "94101", "777-888-9999", "alice.brown@email.com");

// Sort contacts alphabetically
myAddressBook.sortContactsByName();

// Sort by City
myAddressBook.sortContactsByCity();

// Sort by State
myAddressBook.sortContactsByState();

// Sort by Zip
myAddressBook.sortContactsByZip();

// Search by City
console.log("Searching for contacts in New York:", myAddressBook.searchByCity("New York"));

// Search by State
console.log("Searching for contacts in California:", myAddressBook.searchByState("California"));

// View Persons by City
myAddressBook.viewPersonsByCity("New York");

// View Persons by State
myAddressBook.viewPersonsByState("California");

// Count Persons by City
myAddressBook.countByCity("New York");

// Count Persons by State
myAddressBook.countByState("California");

// Count Contacts
myAddressBook.countContacts();

// Edit Contact
myAddressBook.editContact("John", "Doe", { address: "456 Updated St", phone: "999-888-7777" });

// Find Contact
myAddressBook.findContact("John", "Doe");

// Delete Contact
myAddressBook.deleteContact("Emma", "Johnson");

// Count Contacts Again
myAddressBook.countContacts();