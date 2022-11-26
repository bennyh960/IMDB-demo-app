import emailjs from "emailjs-com";

export const sendMail = (
  user_email: string,
  password: string | undefined | null,
  user_name: string | undefined | null
) => {
  const templateParams = {
    user_email,
    password: password !== undefined ? password : "123",
    user_name,
  };

  if (!password) throw new Error("Somthing went wrong, please contact us.");
  emailjs
    // @ts-ignore
    .send(process.env.REACT_APP_EMAIL_SERVICE, "template_nzhcldw", templateParams, process.env.REACT_APP_EMAIL_KEY)
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.log("FAILED...", err);
        throw new Error(err);
      }
    );
};
