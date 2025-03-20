import { AddressBook } from './AddressBook.js';
class Employee {
    constructor() {
        this.dailyWageArray = [];
        this.fullTimeWageArray = [];
        this.partTimeWageArray = [];
        this.totalWage = 0;
        this.workingDays = 0;
    }

    calculateWages() {
        const EMP_RATE_PER_HOUR = 20;
        const FULL_DAY_HOURS = 8;
        const PART_TIME_HOURS = 4;
        const MAX_DAYS = 20;
        const MAX_HOURS = 160;

        let totalHours = 0;
        let day = 1;

        while (day <= MAX_DAYS && totalHours <= MAX_HOURS) {
            let workHours = Math.random() < 0.5 ? PART_TIME_HOURS : FULL_DAY_HOURS;
            let dailyWage = workHours * EMP_RATE_PER_HOUR;
            totalHours += workHours;

            this.dailyWageArray.push({ day, dailyWage });
            if (workHours === FULL_DAY_HOURS) this.fullTimeWageArray.push(dailyWage);
            else this.partTimeWageArray.push(dailyWage);

            day++;
        }

        this.totalWage = this.dailyWageArray.reduce((total, wage) => total + wage.dailyWage, 0);
        this.workingDays = this.dailyWageArray.length;
    }

    showDailyWage() {
        console.log("Daily Wage Details:");
        this.dailyWageArray.forEach(entry => console.log(`Day ${entry.day}: ₹${entry.dailyWage}`));
    }

    findFullTimeWageDays() {
        return this.dailyWageArray.filter(entry => entry.dailyWage === 160).map(entry => entry.day);
    }

    findFirstFullTimeWage() {
        return this.dailyWageArray.find(entry => entry.dailyWage === 160);
    }

    checkAllFullTimeWage() {
        return this.fullTimeWageArray.every(wage => wage === 160);
    }

    hasPartTimeWage() {
        return this.partTimeWageArray.length > 0;
    }

    getWorkingDays() {
        return this.workingDays;
    }
}

// Example Usage
try {
    let emp1 = new Employee(101, 30000, "M", "2024-01-15");
    console.log(emp1.toString());

    let empWage = new Employee();
    empWage.calculateWages();
    empWage.showDailyWage();

    console.log("\nTotal Employee Wage:", empWage.totalWage);
    console.log("\nDays with Full Time Wage (₹160):", empWage.findFullTimeWageDays());
    console.log("\nFirst occurrence of Full Time Wage:", empWage.findFirstFullTimeWage());
    console.log("\nAll full-time wages are ₹160:", empWage.checkAllFullTimeWage());
    console.log("\nDoes the employee have Part Time Wage?:", empWage.hasPartTimeWage());
    console.log("\nTotal working Days:", empWage.getWorkingDays());

    console.log("\nAdding Contacts to Employee's Address Book...");
    let contact1 = new Contact("John", "Doe", "Pakistan", "Bhutan", "California", "211010", "1234567890", "john@gmail.com");
    let contact2 = new Contact("Marry", "Das", "New York", "New York", "New York", "281406", "9876543210", "marry@gmail.com");

    emp1.addressBook.addContact(contact1);
    emp1.addressBook.addContact(contact2);

    console.log("\nDisplaying Employee's Address Book:");
    emp1.addressBook.displayContacts();
} catch (error) {
    console.log("Error:", error.message);
}

export { Employee };