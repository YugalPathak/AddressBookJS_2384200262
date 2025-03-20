class AddressBook {
    constructor() {
        this.contacts = [];
    }

    /**
     * Validates the contact details before adding.
     * Throws an error if validation fails.
     */
    validateContact(firstName, lastName, address, city, state, zip, phone, email) {
        // Regular expressions for validation
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/; // Starts with capital, min 3 characters
        const addressPattern = /^.{4,}$/; // Min 4 characters
        const zipPattern = /^[0-9]{5,6}$/; // 5 or 6 digit zip code
        const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/; // Format: 123-456-7890
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email format

        if (!namePattern.test(firstName)) {
            throw new Error("Invalid First Name! Should start with a capital letter and have at least 3 characters.");
        }
        if (!namePattern.test(lastName)) {
            throw new Error("Invalid Last Name! Should start with a capital letter and have at least 3 characters.");
        }
        if (!addressPattern.test(address)) {
            throw new Error("Invalid Address! Should have at least 4 characters.");
        }
        if (!addressPattern.test(city)) {
            throw new Error("Invalid City! Should have at least 4 characters.");
        }
        if (!addressPattern.test(state)) {
            throw new Error("Invalid State! Should have at least 4 characters.");
        }
        if (!zipPattern.test(zip)) {
            throw new Error("Invalid Zip Code! Should be 5 or 6 digits.");
        }
        if (!phonePattern.test(phone)) {
            throw new Error("Invalid Phone Number! Use format: 123-456-7890.");
        }
        if (!emailPattern.test(email)) {
            throw new Error("Invalid Email Address! Should be in a valid format.");
        }
    }

    /**
     * Adds a new contact after validation.
     */
    addContact(firstName, lastName, address, city, state, zip, phone, email) {
        try {
            this.validateContact(firstName, lastName, address, city, state, zip, phone, email);

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

            this.contacts.push(contact);
            console.log("Contact added successfully.");
        } catch (error) {
            console.error(error.message);
        }
    }
}

// Example Usage
const myAddressBook = new AddressBook();

// Valid Contact
myAddressBook.addContact(
    "John", "Doe", "123 Main St", "New York", "NY", "10001", "123-456-7890", "john.doe@example.com"
);

// Invalid Contact (Fails Validation)
myAddressBook.addContact(
    "jo", "doe", "123", "NY", "NY", "100", "1234567890", "johndoe.com"
);