class AddressBookSystem {
    constructor() {
        // Stores multiple address books
        this.addressBooks = {};
    }

    /**
     * Creates a new Address Book with a unique name.
     * @param {string} bookName - Name of the new address book
     */
    createAddressBook(bookName) {
        if (this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" already exists.`);
        } else {
            this.addressBooks[bookName] = [];
            console.log(`Address Book "${bookName}" created successfully.`);
        }
    }

    /**
     * Validates the contact details before adding.
     * Throws an error if validation fails.
     */
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

    /**
     * Adds a new contact to a specific address book.
     * @param {string} bookName - Name of the address book
     * @param {string} firstName - First name of the contact
     * @param {string} lastName - Last name of the contact
     * @param {string} address - Street address of the contact
     * @param {string} city - City of the contact
     * @param {string} state - State of the contact
     * @param {string} zip - ZIP code of the contact
     * @param {string} phone - Phone number of the contact
     * @param {string} email - Email address of the contact
     */
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

    /**
     * Displays all contacts from a specific Address Book.
     * @param {string} bookName - Name of the address book
     */
    displayContacts(bookName) {
        if (!this.addressBooks[bookName]) {
            console.log(`Address Book "${bookName}" does not exist.`);
            return;
        }

        console.log(`Contacts in Address Book "${bookName}":`);
        console.table(this.addressBooks[bookName]);
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

// Display Contacts
mySystem.displayContacts("Family");
mySystem.displayContacts("Work");