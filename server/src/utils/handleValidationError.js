const handleValidationError = (error, res) => {
    if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(
            (item) => item.message
        );

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid data format",
            errors: [error.message]
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

export default handleValidationError;