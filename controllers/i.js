import Ishchi from '../models/i.js'
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export const GetAllISh = async (_, res) => {
  try {
    const ISh = await Ishchi.find()
    return res.json({
      data: ISh
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const IShCreateOne = async (req, res) => {
  try {
    const { type, name, price, count } = req.body
    const newISh = new ISh({
      type,
      name,
      price,
      count
    })
    newISh.save()
    return res.status(201).json({
      data: newISh
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.D')
  }
}

export const UpdateISh = async (req, res) => {
  const IShId = req.params.id
  const { type, name, price, count } = req.body
  try {
    const updatedISh = {
      type,
      name,
      price,
      count
    }

    const ISh = await ISh.findByIdAndUpdate(IShId, updatedISh, {
      new: true,
      runValidators: true
    })

    if (!ISh) {
      return sendErrorResponse(res, 404, 'Bu tavar topilmadi !')
    }

    return res.status(200).json({ data: ISh })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const GetOneISh = async (req, res) => {
  const IShId = req.params.id
  try {
    const ISh = await ISh.findById(IShId)
    if (!ISh) {
      return sendErrorResponse(res, 409, 'Tavar topilmadi!')
    }
    return res.status(201).json({ data: ISh })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const DeleteISh = async (req, res) => {
  const { id } = req.params

  try {
    const deletedISh = await ISh.findByIdAndDelete(id)
    if (!deletedISh) {
      return sendErrorResponse(res, 404, 'Tavar topilmadi!')
    }
    return res.status(200).json({ message: 'Tavar olib tashlandi' })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.C')
  }
}
