export const limitValue = (val, min, max) => {
    if (val === null || val === undefined || val < min || val > max) {
        return 0
    }
    return val 
}