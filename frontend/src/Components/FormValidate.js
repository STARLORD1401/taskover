function validateForm(creds) {
  const errList = {};
  const regExpList = {
    email: "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$",
    username: "^[A-Za-z][A-Za-z0-9_]{7,29}$",
    password: "^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$",
  };
  for (const cred in creds) {
    console.log(cred);

    if (creds[cred].length <= 0) {
      errList[cred] = [true, `${cred} should be more than 0 letters`];
    } else {
      errList[cred] = [false, ""];
    }

    const regExp = new RegExp(regExpList[cred]);
    if (!regExp.test(creds[cred])) {
      errList[cred] = [true, `please enter a valid ${cred}`];
    } else {
      errList[cred] = [false, ""];
    }
  }
  if (creds.confirmPassword && creds?.password !== creds?.confirmPassword) {
    console.log(creds.confirmPassword);
    errList["password"] = [true, "Passwords do not match"];
    errList["confirmPassword"] = [true, "Passwords do not match"];
  }
  return errList;
}
export default validateForm;
