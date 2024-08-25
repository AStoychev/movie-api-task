export const formatGenres = (data) => {
    if (Array.isArray(data)) {
        return data.join(' | ');
    }
    if (typeof data === 'string') {
        return data.split(',').map(item => item.trim()).join(' | ');
    }
    return data;
}