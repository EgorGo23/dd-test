const byField = (field, type) => {
    return (a, b) => {
        if (type === 'string') {
            let firstStr = String(a[field]).toLowerCase(),
                secondStr = String(b[field]).toLowerCase();
            
            if (firstStr > secondStr) return 1;
            if (firstStr < secondStr) return -1;
            return 0;
        }

        if (type === 'number') {
            return +a[field] > +b[field] ? 1 : -1;
        }
    }
}

export default byField;