function checkIfGraded(obj) {
    if (obj['ungradeable'] || obj['diabetic-retinopathy']) {
        return true;
    }
    return false;
}

export default checkIfGraded;

