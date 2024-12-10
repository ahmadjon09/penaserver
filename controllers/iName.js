import WorkerName from '../models/iName.js';

// Helper function for error response
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// Get all worker names
export const GetAllWorkerName = async (_, res) => {
  try {
    const workers = await WorkerName.find();
    return res.status(200).json({ data: workers });
  } catch (error) {
    console.error('Error fetching workers:', error);
    return sendErrorResponse(res, 500, 'Server Error while fetching workers.');
  }
};

// Create a new worker
export const WorkerNameCreateOne = async (req, res) => {
  const { name, phoneNumber, g } = req.body;

  try {
    // Check if a worker with the same phone number already exists
    const existingWorker = await WorkerName.findOne({ phoneNumber });
    if (existingWorker) {
      return sendErrorResponse(res, 400, 'Worker with this phone number already exists!');
    }

    const newWorker = new WorkerName({ name, phoneNumber, g });
    await newWorker.save();

    return res.status(201).json({ data: newWorker });
  } catch (error) {
    console.error('Error creating worker:', error);
    return sendErrorResponse(res, 500, 'Server Error while creating worker.');
  }
};

// Update a worker's name
export const UpdateWorkerName = async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, g } = req.body;

  try {
    const updatedWorker = await WorkerName.findByIdAndUpdate(
      id,
      { name, phoneNumber, g },
      { new: true, runValidators: true }
    );

    if (!updatedWorker) {
      return sendErrorResponse(res, 404, 'Worker not found!');
    }

    return res.status(200).json({ data: updatedWorker });
  } catch (error) {
    console.error('Error updating worker:', error);
    return sendErrorResponse(res, 500, 'Server Error while updating worker.');
  }
};

// Get one worker by ID
export const GetOneWorkerName = async (req, res) => {
  const { id } = req.params;

  try {
    const worker = await WorkerName.findById(id);
    if (!worker) {
      return sendErrorResponse(res, 404, 'Worker not found!');
    }

    return res.status(200).json({ data: worker });
  } catch (error) {
    console.error('Error fetching worker:', error);
    return sendErrorResponse(res, 500, 'Server Error while fetching worker.');
  }
};

// Delete a worker
export const DeleteWorkerName = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorker = await WorkerName.findByIdAndDelete(id);
    if (!deletedWorker) {
      return sendErrorResponse(res, 404, 'Worker not found!');
    }

    return res.status(200).json({ message: 'Worker successfully deleted.' });
  } catch (error) {
    console.error('Error deleting worker:', error);
    return sendErrorResponse(res, 500, 'Server Error while deleting worker.');
  }
};
