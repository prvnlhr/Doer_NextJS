const maskEmail = (email) => {
  if (!email) {
    return "You Email address";
  }
  const [username, domain] = email.split("@");
  const maskedUsername = `${username.charAt(0)}***${username.charAt(
    username.length - 1
  )}`;
  return `${maskedUsername}@${domain}`;
};
