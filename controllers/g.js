import Gish from '../models/g.js'
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export const GetAllGish = async (_, res) => {
  try {
    const Gish = await Gish.find().sort({ createdAt: -1 })
    return res.json({
      data: Gish
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const GishCreateOne = async (req, res) => {
  try {
    const { type, count } = req.body
    const newGish = new Gish({
      type,
      count
    })
    newGish.save()
    return res.status(201).json({
      data: newGish
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.D')
  }
}

export const UpdateGish = async (req, res) => {
  const GishId = req.params.id
  const { type, count } = req.body
  try {
    const updatedGish = {
      type,
      count
    }

    const Gish = await Gish.findByIdAndUpdate(GishId, updatedGish, {
      new: true,
      runValidators: true
    })

    if (!Gish) {
      return sendErrorResponse(res, 404, 'Bu tavar topilmadi !')
    }

    return res.status(200).json({ data: Gish })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const GetOneGish = async (req, res) => {
  const GishId = req.params.id
  try {
    const Gish = await Gish.findById(GishId)
    if (!Gish) {
      return sendErrorResponse(res, 409, 'Tavar topilmadi!')
    }
    return res.status(201).json({ data: Gish })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const DeleteGish = async (req, res) => {
  const { id } = req.params

  try {
    const deletedGish = await Gish.findByIdAndDelete(id)
    if (!deletedGish) {
      return sendErrorResponse(res, 404, 'Tavar topilmadi!')
    }
    return res.status(200).json({ message: 'Tavar olib tashlandi' })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.C')
  }
}
