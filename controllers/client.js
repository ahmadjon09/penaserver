import Client from "../models/client.js";

// Helper function for error response
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// Create a new client
export const ClientCreate = async (req, res) => {
  const { name, count, price, type, phoneNumber } = req.body;

  // Validate the input fields
  if (!name || !count || !price || !type || !phoneNumber) {
    return sendErrorResponse(res, 400, "Барча майдонларни тўлдиринг.");
  }

  try {
    const newClient = new Client({ name, count, price, type, phoneNumber });
    await newClient.save();
    return res.status(201).json({
      message: "Янги мижоз муваффақиятли яратилди!",
      data: newClient,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Ички сервер хатоси.create client err.");
  }
};

// Get all clients with pagination (if needed)
export const GetAllClients = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10
  const skip = (page - 1) * limit;

  try {
    const clients = await Client.find()
      .skip(skip)
      .limit(Number(limit));

    const totalClients = await Client.countDocuments();

    return res.json({
      totalClients,
      totalPages: Math.ceil(totalClients / limit),
      currentPage: Number(page),
      data: clients,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Ички сервер хатоси.");
  }
};

// Update a client
export const UpdateClient = async (req, res) => {
  const userId = req.params.id;
  const { name, count, price, type, phoneNumber } = req.body;

  // Validate the input fields
  if (!name || !count || !price || !type || !phoneNumber) {
    return sendErrorResponse(res, 400, "Барча майдонларни тўлдиринг.");
  }

  try {
    const existingClient = await Client.findById(userId);
    if (!existingClient) {
      return sendErrorResponse(res, 404, "Мижоз топилмади.");
    }

    const updatedClient = await Client.findByIdAndUpdate(
      userId,
      { name, count, price, type, phoneNumber },
      { new: true }
    );

    return res.status(200).json({
      message: "Мижоз маълумотлари муваффақиятли янгиланди.",
      data: updatedClient,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Ички сервер хатоси.");
  }
};

// Get one client
export const GetOneClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const client = await Client.findById(clientId);
    if (!client) {
      return sendErrorResponse(res, 404, "Мижоз топилмади.");
    }
    return res.status(200).json({ data: client });
  } catch (error) {
    return sendErrorResponse(res, 500, "Ички сервер хатоси. Get one client");
  }
};

// Delete a client
export const DeleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return sendErrorResponse(res, 404, "Мижоз топилмади.");
    }
    return res.status(200).json({ message: "Мижоз муваффақиятли ўчирилди." });
  } catch (error) {
    return sendErrorResponse(res, 500, "Ички сервер хатоси.");
  }
};
