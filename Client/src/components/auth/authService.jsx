
export const emailValidation = (email)=>{
    const emailRegex = /^[^@]{3,20}@gmail\.com$/;
    return emailRegex.test(email);
}
export const passwordValidation = (password)=>{
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])/)) {
        return "Password must contain lowercase letter and uppercase letter";
      } else if (!password.match(/^(?=.*[0-9])/)) {
        return "Password must contain at least one digit";
      } else if (!password.match(/^(?=.*[!@#$%^&*])/)) {
        return "Password must contain at least one special character";
      } else if (password.length < 8) {
        return "Password must be at least 8 characters";
      }else if (password.length > 20) {
        return "Password can be maximum of 20 characters";
      } else {
        return null;
      }
}
export const codeValidation = (code)=>{
    let foundNonNumber = code.find((element) => isNaN(element*1));
    return code.indexOf('') === -1 && !foundNonNumber;
}

export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
