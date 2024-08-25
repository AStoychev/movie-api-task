export const convertToArray = (data) => {
    if (Array.isArray(data)) {
        // If data is already an array, return it.
        return data;
    } else if (typeof data === 'string') {
        // Ensure the string is split correctly by ' | ' and handle extra spaces.
        return data.split('|').map(item => item.trim()).filter(item => item !== '');
    } else {
        // Handle unexpected types.
        console.error('Input data must be a string or an array.');
        return [];
    }
};