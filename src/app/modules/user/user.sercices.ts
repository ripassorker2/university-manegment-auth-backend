import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUserDB = async (user: IUser): Promise<IUser | null> => {
  // increamental id number
  const userId = await generateUserId()

  user.id = userId

  // create default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user....!!!')
  }
  return createdUser
}

export const UserServices = {
  createUserDB,
}
