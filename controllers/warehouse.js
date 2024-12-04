import Warehouse from '../models/warehouse.js';

// Helper function for error responses
const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

// Get all warehouses
export const GetAllWarehouse = async (_, res) => {
    try {
        const warehouses = await Warehouse.find();
        return res.status(200).json({
            data: warehouses,
        });
    } catch (error) {
        return sendErrorResponse(res, 500, `Internal server error: ${error.message}`);
    }
};

// Create a new warehouse
export const WarehouseCreateOne = async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;
        const newWarehouse = new Warehouse({
            name,
            phoneNumber,
        });

        // Await the save operation
        await newWarehouse.save();
        return res.status(201).json({
            message: "Warehouse created successfully",
            data: newWarehouse,
        });
    } catch (error) {
        return sendErrorResponse(res, 500, `Internal server error: ${error.message}`);
    }
};

// Update an existing warehouse by ID
export const UpdateWarehouse = async (req, res) => {
    const warehouseId = req.params.id;
    const { name, phoneNumber } = req.body;

    try {
        const updatedWarehouse = { name, phoneNumber };
        
        // Find the warehouse by ID and update it
        const warehouse = await Warehouse.findByIdAndUpdate(warehouseId, updatedWarehouse, {
            new: true,
            runValidators: true,
        });

        if (!warehouse) {
            return sendErrorResponse(res, 404, "Warehouse not found!");
        }

        return res.status(200).json({
            message: "Warehouse updated successfully",
            data: warehouse,
        });
    } catch (error) {
        return sendErrorResponse(res, 500, `Internal server error: ${error.message}`);
    }
};

// Get a single warehouse by ID
export const GetOneWarehouse = async (req, res) => {
    const warehouseId = req.params.id;

    try {
        const warehouse = await Warehouse.findById(warehouseId);

        if (!warehouse) {
            return sendErrorResponse(res, 404, "Warehouse not found!");
        }

        return res.status(200).json({
            data: warehouse,
        });
    } catch (error) {
        return sendErrorResponse(res, 500, `Internal server error: ${error.message}`);
    }
};

// Delete a warehouse by ID
export const DeleteWarehouse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWarehouse = await Warehouse.findByIdAndDelete(id);

        if (!deletedWarehouse) {
            return sendErrorResponse(res, 404, "Warehouse not found!");
        }

        return res.status(200).json({
            message: "Warehouse deleted successfully",
        });
    } catch (error) {
        return sendErrorResponse(res, 500, `Internal server error: ${error.message}`);
    }
};
