import jwt from 'jsonwebtoken'

const generateJWT = () => {
  return jwt.sing({ id }, process.env.JWT_SECRET, {
    expressIn: "30d",
  });

}

export default generateJWT
