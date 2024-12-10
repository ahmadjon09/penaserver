import Gish from '../models/g.js';

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// Get all Gish items
export const GetAllGish = async (_, res) => {
  try {
    const allGish = await Gish.find().sort({ createdAt: -1 });
    return res.json({ data: allGish });
  } catch (error) {
    console.error('Error fetching all Gish:', error);
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.');
  }
};

// Create a new Gish item
export const GishCreateOne = async (req, res) => {
  try {
    const { type, count } = req.body;
    const newGish = new Gish({ type, count });
    await newGish.save();
    return res.status(201).json({ data: newGish });
  } catch (error) {
    console.error('Error creating Gish:', error);
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.');
  }
};

// Update a Gish item
export const UpdateGish = async (req, res) => {
  const { id } = req.params;
  const { type, count } = req.body;
  try {
    const updatedGish = await Gish.findByIdAndUpdate(
      id,
      { type, count },
      { new: true, runValidators: true }
    );

    if (!updatedGish) {
      return sendErrorResponse(res, 404, 'Bu tavar topilmadi!');
    }

    return res.status(200).json({ data: updatedGish });
  } catch (error) {
    console.error('Error updating Gish:', error);
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.');
  }
};

// Get a single Gish item by ID
export const GetOneGish = async (req, res) => {
  const { id } = req.params;
  try {
    const gish = await Gish.findById(id);
    if (!gish) {
      return sendErrorResponse(res, 404, 'Tavar topilmadi!');
    }
    return res.status(200).json({ data: gish });
  } catch (error) {
    console.error('Error fetching Gish by ID:', error);
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.');
  }
};

// Delete a Gish item by ID
export const DeleteGish = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGish = await Gish.findByIdAndDelete(id);
    if (!deletedGish) {
      return sendErrorResponse(res, 404, 'Tavar topilmadi!');
    }
    return res.status(200).json({ message: 'Tavar olib tashlandi' });
  } catch (error) {
    console.error('Error deleting Gish:', error);
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.');
  }
};
