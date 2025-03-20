class AddressBookSystem {
    constructor() {
        this.addressBooks = {}; // Stores multiple address books
    }

    createAddressBook(bookName) {
        if (this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" already exists.`);
        } else {
            this.addressBooks[bookName] = [];
            console.log(`Address Book "${bookName}" created successfully.`);
        }
    }

    validateContact(firstName, lastName, address, city, state, zip, phone, email) {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/; // Starts with capital, min 3 characters
        const addressPattern = /^.{4,}$/; // Min 4 characters
        const zipPattern = /^[0-9]{5,6}$/; // 5 or 6 digit zip code
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

    addContact(bookName, firstName, lastName, address, city, state, zip, phone, email) {
        if (!this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" does not exist. Create it first.`);
            return;
        }

        try {
            this.validateContact(firstName, lastName, address, city, state, zip, phone, email);
            const contact = { firstName, lastName, address, city, state, zip, phone, email };
            this.addressBooks[bookName].push(contact);
            console.log(`Contact added to "${bookName}" successfully.`);
        } catch (error) {
            console.error(error.message);
        }
    }

    findContact(bookName, firstName, lastName) {
        if (!this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" does not exist.`);
            return null;
        }

        const contact = this.addressBooks[bookName].find(
            (c) => c.firstName === firstName && c.lastName === lastName
        );

        if (contact) {
            console.log("Contact Found:", contact);
            return contact;
        } else {
            console.log(`Contact "${firstName} ${lastName}" not found in "${bookName}".`);
            return null;
        }
    }

    editContact(bookName, firstName, lastName, newDetails) {
        if (!this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" does not exist.`);
            return;
        }

        const contactIndex = this.addressBooks[bookName].findIndex(
            (c) => c.firstName === firstName && c.lastName === lastName
        );

        if (contactIndex !== -1) {
            try {
                this.validateContact(
                    newDetails.firstName || firstName,
                    newDetails.lastName || lastName,
                    newDetails.address || this.addressBooks[bookName][contactIndex].address,
                    newDetails.city || this.addressBooks[bookName][contactIndex].city,
                    newDetails.state || this.addressBooks[bookName][contactIndex].state,
                    newDetails.zip || this.addressBooks[bookName][contactIndex].zip,
                    newDetails.phone || this.addressBooks[bookName][contactIndex].phone,
                    newDetails.email || this.addressBooks[bookName][contactIndex].email
                );

                this.addressBooks[bookName][contactIndex] = {
                    ...this.addressBooks[bookName][contactIndex],
                    ...newDetails
                };

                console.log(`Contact "${firstName} ${lastName}" updated successfully in "${bookName}".`);
            } catch (error) {
                console.error(error.message);
            }
        } else {
            console.log(`Contact "${firstName} ${lastName}" not found in "${bookName}".`);
        }
    }

    deleteContact(bookName, firstName, lastName) {
        if (!this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" does not exist.`);
            return;
        }

        const contactIndex = this.addressBooks[bookName].findIndex(
            (c) => c.firstName === firstName && c.lastName === lastName
        );

        if (contactIndex !== -1) {
            this.addressBooks[bookName].splice(contactIndex, 1);
            console.log(`Contact "${firstName} ${lastName}" deleted successfully from "${bookName}".`);
        } else {
            console.log(`Contact "${firstName} ${lastName}" not found in "${bookName}".`);
        }
    }

    displayContacts(bookName) {
        if (!this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" does not exist.`);
            return;
        }

        console.log(`Contacts in Address Book "${bookName}":`);
        console.table(this.addressBooks[bookName]);
    }

    /**
     * Counts the number of contacts in a given address book.
     * @param {string} bookName - Name of the address book
     */
    countContacts(bookName) {
        if (!this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" does not exist.`);
            return 0;
        }

        const count = this.addressBooks[bookName].length;
        console.log(`Number of contacts in "${bookName}": ${count}`);
        return count;
    }
}

// Example Usage
const mySystem = new AddressBookSystem();

// Create Address Books
mySystem.createAddressBook("Family");
mySystem.createAddressBook("Work");

// Add Contacts to Address Books
mySystem.addContact("Family", "John", "Doe", "123 Main St", "New York", "New York", "10001", "123-456-7890", "john.doe@example.com");
mySystem.addContact("Work", "Alice", "Smith", "456 Office Rd", "Los Angeles", "California", "90002", "987-654-3210", "alice.smith@workmail.com");

// Count Contacts
mySystem.countContacts("Family"); // Should print 1
mySystem.countContacts("Work");   // Should print 1

// Add another contact and count again
mySystem.addContact("Family", "Emma", "Johnson", "789 Park Ave", "Chicago", "Ireland", "60007", "222-333-4444", "emma.johnson@email.com");
mySystem.countContacts("Family"); // Should print 2

// Display Contacts
mySystem.displayContacts("Family");

// Delete a contact and count again
mySystem.deleteContact("Family", "John", "Doe");
mySystem.countContacts("Family"); // Should print 1