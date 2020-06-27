const { v4: uuidv4 } = require('uuid');

const addId = (arr) => arr.reduce((acc, element) => {
    if (!element.id) {
        element.id = uuidv4();
        acc.push(element);
    } else {
        acc.push(element);
    }
    
    return acc;
}, []);

module.exports = addId;