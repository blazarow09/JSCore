class Organization{
    constructor(name, budget){
        this.name = name;
        this.budget = budget;
        this.employees = [];
        this.dept = {
            marketing : this.budget * 0.4,
            finance : this.budget * 0.25,
            production : this.budget * 0.35
        }
    }

    get departmentsBudget () {
        return this.dept;
    }

    add(employeeName, department , salary) {
        let isValidDepartment;
        if(department === 'marketing' || department === 'finance' || department === 'production') {
            isValidDepartment = true;
        }

        if(isValidDepartment && this.departmentsBudget[`${department}`] - salary >= 0){

            this.dept[department] -= salary;

            let emp = {
                employeeName: employeeName,
                department: department,
                salary: salary
            };

            this.employees.push(emp);

            return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`
        } else {
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departmentsBudget[`${department}`]}.`
        }
    }

    employeeExists(name){
        let employees = this.employees;
        let isExists = employees.some(e => e.employeeName === name);

        let emp = employees.filter((emp) => emp['employeeName'] === name);

        if(isExists){
            return `Mr./Mrs. ${name} is part of the ${emp[0]['department']} department.`
        } else {
            return `Mr./Mrs. ${name} is not working in ${this.name}.`
        }
    }

    leaveOrganization(name) {
        let employees = this.employees;

        let isExists = employees.some(e => e.employeeName === name);

        if(isExists){
            let emp = employees.filter((emp) => emp['employeeName'] === name);
            let salary = emp[0]['salary'];
            let dept = emp[0]['department'];
            let index = employees.findIndex(x => x.employeeName === name);

            this.employees.splice(index, 1);

            this.departmentsBudget[`${dept}`] += +salary;

            return `It was pleasure for ${this.name} to work with Mr./Mrs. ${name}.`
        } else {
            return `Mr./Mrs. ${name} is not working in ${this.name}.`
        }
    }

    status() {
        let employees = this.employees;
        let status = '';

        status += `${this.name.toLocaleUpperCase()} DEPARTMENTS:`;

        let marketing = employees.filter((emp) => emp['department'] === 'marketing');
        let sortedMarketing = marketing.sort(function(a, b) {
            return Number(b.salary) - Number(a.salary);
        });

        if(sortedMarketing.length !== 0) {
            status += `\nMarketing | Employees: ${sortedMarketing.length}: `;

            for (let i = 0; i < sortedMarketing.length; i++){
                let emp = sortedMarketing[i];
                if(i === sortedMarketing.length - 1) {
                    status += `${emp['employeeName']} `

                } else {
                    status += `${emp['employeeName']}, `
                }
            }

            status += `| Remaining Budget: ${this.departmentsBudget['marketing']}`;
        }

        let finance = employees.filter((emp) => emp['department'] === 'finance');
        let sortedFinance = finance.sort(function(a, b) {
            return Number(b.salary) - Number(a.salary);
        });

        if(sortedFinance.length !== 0) {
            status += `\nFinance | Employees: ${sortedFinance.length}: `;

            for (let i = 0; i < sortedFinance.length; i++){
                let emp = sortedFinance[i];
                if(i === sortedFinance.length - 1) {
                    status += `${emp['employeeName']} `

                } else {
                    status += `${emp['employeeName']}, `
                }
            }

            status += `| Remaining Budget: ${this.departmentsBudget['finance']}`;
        }

        let production = employees.filter((emp) => emp['department'] === 'production');
        let sortedProduction = production.sort(function(a, b) {
            return Number(b.salary) - Number(a.salary);
        });

        if(sortedProduction.length !== 0) {
            status += `\nProduction | Employees: ${sortedProduction.length}: `;

            for (let i = 0; i < sortedProduction.length; i++){
                let emp = sortedProduction[i];
                if(i === sortedProduction.length - 1) {
                    status += `${emp['employeeName']} `

                } else {
                    status += `${emp['employeeName']}, `
                }
            }

            status += `| Remaining Budget: ${this.departmentsBudget['production']}`;

            return status;
        }
    }
}


let org = new Organization('Bobi', 1000);

// org.add('pesho', 'marketing', 100);
// org.add('tosho', 'marketing', 110);
console.log(org.departmentsBudget);
// org.add('tishi', 'production', 100);
console.log(org.add('misho', 'production', 325));
console.log(org.departmentsBudget);
// org.add('visho', 'marketing', 120);
// org.add('chiso', 'finance', 100);
// org.add('bisho', 'finance', 100);






