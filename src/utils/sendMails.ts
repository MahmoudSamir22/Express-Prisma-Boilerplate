import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export default async (data: any) => {
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: data.to, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `${data.message}`, // plain text body
    html: `<b>${data.message}</b>`, // html body
  });
  
};
