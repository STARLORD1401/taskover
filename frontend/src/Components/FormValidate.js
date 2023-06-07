function validateForm(creds) {
  const errList = {};
  for (const cred in creds) {
    if (creds[cred].length <= 0) {
      errList[cred] = [true, `${cred} should be more than 0 letters`];
    } else {
      errList[cred] = [false, ""];
    }
  }
  return errList;
}
export default validateForm;
