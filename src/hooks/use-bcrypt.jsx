import bcrypt from 'bcryptjs-react'

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8))
export const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash)