const parseArrayField = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) {
        return value;
    }

    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

export default parseArrayField;