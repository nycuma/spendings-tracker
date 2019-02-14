import isLeapYear from 'date-fns/is_leap_year';
import uuidv4 from 'uuid/v4';
import { saveSpendings } from './LocalStore';

// Used for generating some random spendings
const TEMPLATES = {
    food: { 
        shareUpper: 0.3,
        items: [
            { comment: 'Groceries', min: 3, max: 100 },
            { comment: 'Drinks', min: 2, max: 30 },
            { comment: 'Döner', min: 2.50, max: 5 }
        ]
    },
    coffeeshop: { 
        shareUpper: 0.5,
        items: [
            { comment: 'Coffee', min: 1, max: 2.50 },
            { comment: 'Coffee & cake', min: 4, max: 8 },
            { comment: 'Capuccino', min: 2.50, max: 3.50 },
            { comment: 'Drink at bar', min: 3, max: 10 }
        ]
    },
    household: { 
        shareUpper: 0.7,
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
        shareUpper: 0.85,
        items: [
            { comment: 'Book', min: 2, max: 25 },
            { comment: 'Cinema', min: 5, max: 9 },
            { comment: 'Theater', min: 8, max: 40 },
            { comment: 'Library membership', min: 10, max: 15 }
        ]
    },
    transport: {
        shareUpper: 0.95,
        items: [
            { comment: 'Public transport ticket', min: 1.30, max: 5.40 },
            { comment: 'Train ticket', min: 5, max: 70 },
            { comment: 'Flight', min: 30, max: 100 },
            { comment: 'Petrol', min: 10, max: 50 }
        ]
    },
    gifts: {
        shareUpper: 1,
        items: [
            { comment: 'Present', min: 5, max: 50 },
            { comment: 'Donation', min: 5, max: 50 }
        ]
    }
};

let Utils = {

    getNumDaysOfMonth(date) {
        let numDays;
        switch(date.getMonth()) {
            case 0: case 2: case 4: case 6: case 7: case 9: case 11:
                numDays = 31;
                break;
            case 3: case 5: case 8: case 10:
                numDays = 30;
                break;
            case 1: 
                numDays = isLeapYear(date) ? 29 : 28;
                break;
            default:
                numDays = 31;
        }
        return numDays;
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

    calculateSumOfSpendings(spendings) {
        if(!spendings || spendings.length === 0) {
            return 0;
        }
        return spendings.map(item => item.amount).reduce((prev, next) => prev + next, 0);
    },

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() 
                && date1.getMonth() === date2.getMonth()
                && date1.getDate() === date2.getDate();
    },

    /**
     * Generates and saves random spendings within a given time span.
     * Currently works only with default categories!
     * 
     * // TODO generalise code for any categories
     * // TODO Save data in state/global store
     * 
     * @param {Number} count number of spendings to be generated
     * @param {Date} startDate start of time span
     * @param {Date} endDate end of time span
     */
    generateRandomData(count, startDate, endDate) {
        let randomSpendings = [];
        for(let i = 0; i < count; i++) {
            const rand = Math.random();

            if(rand < TEMPLATES.food.shareUpper) {
                // generate spending for category Food
                randomSpendings.push(this.createRandomSpending('food', startDate, endDate));

            } else if(rand >= TEMPLATES.food.shareUpper && rand < TEMPLATES.coffeeshop.shareUpper) {
                // generate spending for category Coffeeshop
                randomSpendings.push(this.createRandomSpending('coffeeshop', startDate, endDate));

            } else if(rand >= TEMPLATES.coffeeshop.shareUpper && rand < TEMPLATES.household.shareUpper) {
                // generate spending for category Household
                randomSpendings.push(this.createRandomSpending('household', startDate, endDate));
                
            } else if(rand >= TEMPLATES.household.shareUpper && rand < TEMPLATES.culture.shareUpper) {
                // generate spending for second category Culture
                randomSpendings.push(this.createRandomSpending('culture', startDate, endDate));

            } else if(rand >= TEMPLATES.culture.shareUpper && rand < TEMPLATES.transport.shareUpper) {
                // generate spending for second category Transport
                randomSpendings.push(this.createRandomSpending('transport', startDate, endDate));

            } else if(rand >= TEMPLATES.transport.shareUpper) {
                // generate spending for second category Gifts
                randomSpendings.push(this.createRandomSpending('gifts', startDate, endDate));

            } 
        }

        // save in local storage
        saveSpendings(randomSpendings);
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