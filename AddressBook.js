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

    // UC8: Search Person in a Particular City or State
    searchByCity(city) {
        return this.contacts.filter(contact => contact.city === city);
    }

    searchByState(state) {
        return this.contacts.filter(contact => contact.state === state);
    }

    // UC9: View Persons by City or State
    viewPersonsByCity(city) {
        const persons = this.searchByCity(city).map(contact => `${contact.firstName} ${contact.lastName}`);
        console.log(`Persons in ${city}:`, persons.length ? persons : "No contacts found.");
        return persons;
    }

    viewPersonsByState(state) {
        const persons = this.searchByState(state).map(contact => `${contact.firstName} ${contact.lastName}`);
        console.log(`Persons in ${state}:`, persons.length ? persons : "No contacts found.");
        return persons;
    }
}

// Example Usage
const myAddressBook = new AddressBook();

// Add Contacts
myAddressBook.addContact("John", "Doe", "123 Main St", "New York", "New York", "10001", "123-456-7890", "john.doe@example.com");
myAddressBook.addContact("Emma", "Johnson", "789 Park Ave", "Los Angeles", "California", "90002", "222-333-4444", "emma.johnson@email.com");
myAddressBook.addContact("Michael", "Smith", "321 Oak St", "New York", "New York", "10003", "555-666-7777", "michael.smith@email.com");

// UC8: Search by City
console.log("Searching for contacts in New York:", myAddressBook.searchByCity("New York"));

// UC8: Search by State
console.log("Searching for contacts in California:", myAddressBook.searchByState("California"));

// UC9: View Persons by City
myAddressBook.viewPersonsByCity("New York");

// UC9: View Persons by State
myAddressBook.viewPersonsByState("California");

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