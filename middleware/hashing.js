const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

exports.hashing = (pwd)=>{
    return bcrypt.hashSync(pwd, salt)
}

exports.unHashing = (pwd, hash)=>{
    return bcrypt.compareSync(pwd, hash)
}

