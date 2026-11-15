import Address from "../models/Address.js";

// Add new address
export const addAddress = async (req, res) => {
    try {
        const {
            fullName,
            phone,
            addressLine1,
            addressLine2,

            city,
            state,
            postalCode,
            country,
            addressType,
            isDefault,
        } = req.body;

        const userId = req.user._id;

        const address = await Address.create({
            user: userId,
            fullName,
            phone,
            addressLine1,
            addressLine2,

            city,
            state,
            postalCode,
            country,
            addressType,
            isDefault,
        });

        return res.status(201).json({
            success: true,
            message: "Address added successfully.",
            address,
        });
    } catch (error) {
        console.error("Add address error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add address.",
            error: error.message,
        });
    }
};

// Get all Addresses
export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({
            user: req.user._id,
            // isDefault: -1 puts the default address first.
            // createdAt: -1 sorts newer addresses first.
        }).sort({ isDefault: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: addresses.length,
            addresses,
        });
    } catch (error) {
        console.error("Get addresses error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch addresses.",
        });
    }
}

// Update address
export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found.",
            });
        };

        return res.status(200).json({
            success: true,
            message: "Address updates successfully.",
            address,
        });

    } catch (error) {
        console.error("Update address error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update address.",
        });
    }
};

// delete address
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found.",
            });
        };

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully.",
        });
    } catch (error) {
        console.error("Delete address error:", error);
        return res.status(500).json({
            success: false,
            message: "Failde to delete address.",
        });
    }

}

// set default address
export const setDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const address = await Address.findOne({
            _id: id,
            user: userId,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found.",
            });
        }

        // Remove default status from other addresses
        await Address.updateMany(
            { user: userId },
            { $set: { isDefault: false } }
        );

        // set selected address as default
        address.isDefault = true,
            await address.save();

        return res.status(200).json({
            success: true,
            message: "Set default address successfully.",
            address,
        });

    } catch (error) {
        console.error("Set default address error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to set default address.",
        });
    }
}

// Get single address by ID
export const getAddressById = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found.",
            });
        }

        return res.status(200).json({
            success: true,
            address,
        });
    } catch (error) {
        console.error("Get address error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch address.",
        });
    }
};