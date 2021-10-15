import path from 'path'
import fs from 'fs'
import { getRepository } from 'typeorm'

import uploadConfig from '../config/upload'

import User from '../models/User'
import AppError from '../errors/AppError'

interface RequestUpdateUserAvatarDTO {
  user_id: string
  avatarFilename?: string
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: RequestUpdateUserAvatarDTO): Promise<User> {
    if (!avatarFilename) {
      throw new AppError('Invalid avatar image')
    }
    const userRepository = getRepository(User)

    const user = await userRepository.findOne(user_id)
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename
    await userRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService