import crypto from 'crypto'

const generateOTP = () => {
  const otpExpiration = new Date(Date.now() + 10 * 60 * 1000)
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOTP = crypto
    .createHash('sha256')
    .update(otp.toString())
    .digest("hex");
  return { otp, hashedOTP, otpExpiration};
};

export default generateOTP