import IshName from '../models/iName.js'
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export const GetAllIshName = async (_, res) => {
  try {
    const IshName = await IshName.find()
    return res.json({
      data: IshName
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const IshNameCreateOne = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body
    const newIshName = new IshName({
      name,
      phoneNumber
    })
    newIshName.save()
    return res.status(201).json({
      data: newIshName
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.D')
  }
}

export const UpdateIshName = async (req, res) => {
  const IshNameId = req.params.id
  const { name, phoneNumber } = req.body
  try {
    const updatedIshName = {
      name,
      phoneNumber
    }

    const IshName = await IshName.findByIdAndUpdate(IshNameId, updatedIshName, {
      new: true,
      runValidators: true
    })

    if (!IshName) {
      return sendErrorResponse(res, 404, 'Bu tavar topilmadi !')
    }

    return res.status(200).json({ data: IshName })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const GetOneIshName = async (req, res) => {
  const IshNameId = req.params.id
  try {
    const IshName = await IshName.findById(IshNameId)
    if (!IshName) {
      return sendErrorResponse(res, 409, 'Tavar topilmadi!')
    }
    return res.status(201).json({ data: IshName })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.')
  }
}

export const DeleteIshName = async (req, res) => {
  const { id } = req.params

  try {
    const deletedIshName = await IshName.findByIdAndDelete(id)
    if (!deletedIshName) {
      return sendErrorResponse(res, 404, 'Tavar topilmadi!')
    }
    return res.status(200).json({ message: 'Tavar olib tashlandi' })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Ички сервер хатоси.C')
  }
}
