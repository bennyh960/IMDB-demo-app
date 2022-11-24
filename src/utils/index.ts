import React from "react";

export async function findAsync(arr: any[], asyncCallback: any) {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex((result) => result);
  return arr[index];
}

export const passwordStrength = (
  password: string,
  password2: string,
  passLength: number,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (document.activeElement?.id === "password") {
    if (password.length < passLength) {
      setMessage(() => `Minimum length of ${passLength} characters`);
      return false;
    } else if (!password.match(/(?=.*[a-z])/gm)) {
      setMessage(() => "Must contain lower case letter");
      return false;
    } else if (!password.match(/(?=.*[A-Z])/gm)) {
      setMessage(() => "Must contain upper case letter");
      return false;
    } else if (!password.match(/(?=.*\d)/gm)) {
      setMessage(() => "Must contain number");
      return false;
    } else if (password === password2 && password.length >= passLength) {
      return true;
    } else setMessage(() => "");
  }

  const checkPassword2 = isValidConfirmPassword(password, password2, setMessage);
  if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/gm) && checkPassword2 && password.length > 5) return true;

  return undefined;
};

function isValidConfirmPassword(
  password: string,
  password2: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>
): boolean {
  if (document.activeElement?.id === "password2" && password !== password2) {
    setMessage(() => "Not match.");
    return false;
  } else setMessage(() => "");
  if (password === password2) return true;
  else return false;
}

// ? required do same almost
// export function isValidUserName(userName: string, setMessage: React.Dispatch<React.SetStateAction<string>>): boolean {
//   if (document.activeElement?.id === "userName" && userName.length < 2) {
//     setMessage(() => "*username must contain at least 2 characters");
//     return false;
//   } else setMessage(() => "");
//   if (userName.length >= 2) return true;
//   else return false;
// }

//? Same as type=email
// export function isValidEmail(email: string, setMessage: React.Dispatch<React.SetStateAction<string>>): boolean {
//   if (document.activeElement?.id === "email" && email.length > "a@b.c".length && !email.match(/^\S+@\S+\.\S+$/gm)) {
//     setMessage(() => "Make sure email is valid email form.");
//     return false;
//   } else setMessage(() => "");
//   if (email.length > "a@b.c".length && email.match(/^\S+@\S+\.\S+$/gm)) return true;
//   else return false;
// }
