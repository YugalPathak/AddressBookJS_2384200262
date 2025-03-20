import { AddressBook } from './AddressBook.js';

class Employee {
    constructor(id, salary, gender, startDate) {
        const idRegex = /^[1-9]\d*$/;  // Positive non-zero number
        const salaryRegex = /^[1-9]\d*$/;  // Positive non-zero number
        const genderRegex = /^[MF]$/;  // Gender must be 'M' or 'F'
        const today = new Date();
        const empDate = new Date(startDate);

        try {
            if (!idRegex.test(id.toString())) throw new Error("Employee ID must be a positive non-zero number.");
            if (!salaryRegex.test(salary.toString())) throw new Error("Salary must be a positive non-zero number.");
            if (!genderRegex.test(gender)) throw new Error("Gender must be 'M' or 'F'.");
            if (empDate > today) throw new Error("Start date cannot be in the future.");

            this.id = id;
            this.salary = salary;
            this.gender = gender;
            this.startDate = empDate.toISOString().split('T')[0]; // YYYY-MM-DD format
            this.addressBook = new AddressBook(); // Each employee has an AddressBook
        } catch (error) {
            console.log("Error:", error.message);
        }
    }

    toString() {
        return `Employee ID: ${this.id}, Salary: ${this.salary}, Gender: ${this.gender}, Start Date: ${this.startDate}`;
    }
}

// Example Usage
try {
    let emp1 = new Employee(101, 30000, "M", "2024-01-15");
    console.log(emp1.toString());

    let emp2 = new Employee(0, -5000, "X", "2026-01-01"); // Invalid Case

} catch (error) {
    console.log("Error:", error.message);
}

class EmployeeWage {
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

    let empWage = new EmployeeWage();
    empWage.calculateWages();
    empWage.showDailyWage();

    console.log("\nTotal Employee Wage:", empWage.totalWage);
    console.log("\nDays with Full Time Wage (₹160):", empWage.findFullTimeWageDays());
    console.log("\nFirst occurrence of Full Time Wage:", empWage.findFirstFullTimeWage());
    console.log("\nAll full-time wages are ₹160:", empWage.checkAllFullTimeWage());
    console.log("\nDoes the employee have Part Time Wage?:", empWage.hasPartTimeWage());
    console.log("\nTotal working Days:", empWage.getWorkingDays());

} catch (error) {
    console.log("Error:", error.message);
}

export { Employee , EmployeeWage };