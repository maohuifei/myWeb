import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config();

// 密钥（secret）  
const secret = 'JWThuafeng991((!'; // 在实际应用中，这应该是一个保密的密钥  

// 选项  
const options = {
  expiresIn: '1h' // 设置令牌有效期为 1 小时  
};

export function signToken(id: number, username: string, password: string) {

  // 负载（payload）  
  const payload = { id: id, username: username,password:password };

  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}