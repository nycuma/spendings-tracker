import uuidv4 from 'uuid/v4';
import addMonths from 'date-fns/add_months';
import { endOfMonth, isBefore, endOfWeek, addWeeks, endOfYear, addYears, 
    isSameDay, isSameWeek, isSameMonth, isSameYear } from 'date-fns';

// Used for generating some random spendings
const TEMPLATES = {
    food: { 
        share: 0.25,
        items: [
            { comment: 'Groceries', min: 3, max: 100 },
            { comment: 'Drinks', min: 2, max: 30 },
            { comment: 'Döner', min: 2.50, max: 5 }
        ]
    },
    coffeeshop: { 
        share: 0.2,
        items: [
            { comment: 'Coffee', min: 1, max: 2.50 },
            { comment: 'Coffee & cake', min: 4, max: 8 },
            { comment: 'Capuccino', min: 2.50, max: 3.50 },
            { comment: 'Drink at bar', min: 3, max: 10 }
        ]
    },
    household: { 
        share: 0.2,
        items: [
            { comment: 'Bicycle repair', min: 50, max: 100 },
            { comment: 'Vacuum cleaner bags', min: 5, max: 20 },
            { comment: 'Detergents', min: 1, max: 10 },
            { comment: 'Bed linen', min: 10, max: 50 },
            { comment: 'Cosmetics', min: 0.5, max: 10 },
            { comment: 'Toothbrush', min: 1, max: 3 },
            { comment: 'Bank fees', min: 1, max: 5 }
        ]
    },
    culture: { 
        share: 0.1,
        items: [
            { comment: 'Book', min: 2, max: 25 },
            { comment: 'Cinema', min: 5, max: 9 },
            { comment: 'Theater', min: 8, max: 40 },
            { comment: 'Library membership', min: 10, max: 15 }
        ]
    },
    clothes: {
        share: 0.05,
        items: [
            { comment: 'Pants', min: 20, max: 100 },
            { comment: 'Socks', min: 5, max: 20 },
            { comment: 'T-Shirt', min: 10, max: 20 }
        ]
    },
    transport: {
        share: 0.15,
        items: [
            { comment: 'Public transport ticket', min: 1.30, max: 5.40 },
            { comment: 'Train ticket', min: 5, max: 70 },
            { comment: 'Flight', min: 30, max: 100 },
            { comment: 'Petrol', min: 10, max: 50 }
        ]
    },
    gifts: {
        share: 0.05,
        items: [
            { comment: 'Present', min: 5, max: 50 },
            { comment: 'Donation', min: 5, max: 50 }
        ]
    }
};

const Utils = {

    filterSpendingsByDay(spendings, day) {
        if(!spendings || !day) {
            return [];
        }

        return spendings.filter(item => isSameDay(new Date(item.day), day)); 
    },

    filterSpendingsByWeek(spendings, day) {
        if(!spendings || !day) {
            return [];
        }

        return spendings.filter(item => isSameWeek(new Date(item.day), day)); 
    },

    filterSpendingsByMonth(spendings, day) {
        if(!spendings || !day) {
            return [];
        }

        return spendings.filter(item => isSameMonth(new Date(item.day), day)); 
    },

    filterSpendingsByYear(spendings, day) {
        if(!spendings || !day) {
            return [];
        }

        return spendings.filter(item => isSameYear(new Date(item.day), day)); 
    },

    getSpendingsBetween(spendings, dateStart, dateEnd, category) {
        if(!spendings || (!dateStart && !dateEnd)) { 
            return []; 
        }

        let filteredSpendings = spendings;
    
        if(dateStart) {
            filteredSpendings = filteredSpendings.filter(item => new Date(item.day) >= dateStart);
        }
    
        if(dateEnd) {
            filteredSpendings = filteredSpendings.filter(item => new Date(item.day) <= dateEnd);
        }
    
        if(category) {
            filteredSpendings = filteredSpendings.filter(item => item.cat === category);
        }
    
        return filteredSpendings;
    },

    /**
     * Filters array of spending positions by their category.
     * @param {Array} spendings objects with spending positions
     * @param {String} category 
     */
    filterSpendingsByCategory(spendings, category) {
        if(!spendings || spendings.length === 0) {
            return [];
        }
        return spendings.filter(item => item.cat === category); 
    },

    calculateTotalAmountByCategory(spendings, category) {
        if(!spendings || spendings.length === 0) {
            return 0;
        }

        return spendings.filter(item => item.cat === category)
                        .map(item => item.amount)
                        .reduce((prevAmount, nextAmount) => prevAmount + nextAmount, 0);  
    },

    calculateTotalAmountsByCategories(spendings, categories) {
        if(!categories || !spendings) {
            return [];
        }

        return categories.map(cat => {
            let amountByCat = this.calculateTotalAmountByCategory(spendings, cat.value);
            return {
                cat: cat.value,
                amount: Math.round(amountByCat)
            };
        });
    },

    calculateSumOfSpendings(spendings) {
        if(!spendings || spendings.length === 0) {
            return 0;
        }
        return spendings.map(item => item.amount).reduce((prev, next) => prev + next, 0);
    },

    dateInEachWeek(dateFrom, dateTo) {
        let dates = [];
        let dateToEnd = endOfWeek(dateTo);
        while(isBefore(dateFrom, dateToEnd)) {
            dates.push(dateFrom);
            dateFrom = addWeeks(dateFrom, 1);
        }
        return dates;
    },

    dateInEachMonth(dateFrom, dateTo) {
        let dates = [];
        let dateToEnd = endOfMonth(dateTo);
        while(isBefore(dateFrom, dateToEnd)) {
            dates.push(dateFrom);
            dateFrom = addMonths(dateFrom, 1);
        }
        return dates;
    },

    dateInEachYear(dateFrom, dateTo) {
        let dates = [];
        let dateToEnd = endOfYear(dateTo);
        while(isBefore(dateFrom, dateToEnd)) {
            dates.push(dateFrom);
            dateFrom = addYears(dateFrom, 1);
        }
        return dates;
    },

    /**
     * Generates and returns random spendings within a given time span.
     * Currently works only with default categories!
     * 
     * // TODO generalise code for any categories
     * 
     * @param {Number} count number of spendings to be generated
     * @param {Date} startDate start of time span
     * @param {Date} endDate end of time span
     */
    generateRandomData(count, startDate, endDate) {
        let randomSpendings = [];
        for(let i = 0; i < count; i++) {
            const rand = Math.random();
            const catKeys = Object.keys(TEMPLATES);
            let accumulatedProb = 0; // accumulate shares of categories

            for(let j = 0; j < catKeys.length; j++) {
                accumulatedProb += TEMPLATES[catKeys[j]].share;
                if(rand < accumulatedProb) {
                    // generate spending for current category
                    randomSpendings.push(this.createRandomSpending(catKeys[j], startDate, endDate));
                    break;
                }   
            }
        }
        return randomSpendings;
    },

    /**
     * Calculates and returns a random date in a given time span.
     * @param {Date} start earlierst date of time span
     * @param {Date} end latest date of time span
     */
    getRandomDate(start, end) {
        return new Date(+start + Math.random() * (end - start));
    },

    /**
     * Generates and returns random array index 
     * (= an integer form 0 to arrray.length).
     * @param {Number} length of array
     */
    getRandomIndex(length) {
        return Math.floor(Math.random() * length);
    },

    /**
     * Generates random decimal number between min and max.
     * @param {Number} min 
     * @param {Number} max 
     */
    getRandomAmount(min, max) {
        return (Math.random() * (max - min)) + min;
    },

    createRandomSpending(category, startDate, endDate) {
        let index = this.getRandomIndex(TEMPLATES[category].items.length);
        let item = TEMPLATES[category].items[index];
        return {
            id: uuidv4(),
            day: this.getRandomDate(startDate, endDate),
            cat: category,
            amount: this.getRandomAmount(TEMPLATES[category].items[index].min, TEMPLATES[category].items[index].max),
            comment: item.comment,
            dateAdded: new Date()
        };
    }
};

export default Utils;