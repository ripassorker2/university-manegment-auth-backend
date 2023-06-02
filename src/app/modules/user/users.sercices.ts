import config from '../../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

export const createUserDB = async (user: IUser): Promise<IUser | null> => {
  // increamental id number
  const userId = await generateUserId()
  user.id = userId

  // create default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('Faild to create user.....')
  }
  return createdUser
}
