const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export default function (req, res, next) {
  const { role } = req.userInfo;

  if (!role) {
    return sendErrorResponse(res, 409, "Access not allowed!😡");
  }
  if (role !== "admin") {
    return sendErrorResponse(res, 409, "You are CLient⛔");
  }
  next();
}
