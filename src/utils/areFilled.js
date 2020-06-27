const areFilled = (elementFields) => {
    if (!elementFields.name || !elementFields.date || !elementFields.days || !elementFields.mission) {
        return true;
    } else {
        return false;
    }
}

export default areFilled;