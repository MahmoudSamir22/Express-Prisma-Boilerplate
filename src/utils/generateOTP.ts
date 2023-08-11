import crypto from 'crypto'

const encrypt = (code: string) => {
  return crypto
    .createHash('sha256')
    .update(code)
    .digest("hex");
}

const generateOTP = () => {
  const otpExpiration = new Date(Date.now() + 10 * 60 * 1000)
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOTP = encrypt(otp.toString());
  return { otp, hashedOTP, otpExpiration};
};

export default generateOTP
export { encrypt }