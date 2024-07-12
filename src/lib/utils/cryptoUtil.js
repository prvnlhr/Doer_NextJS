import CryptoJS from "crypto-js";

export const decryptEmail = (ciphertext) => {
  try {
    // Decode base64 if necessary
    const decryptedBytes = CryptoJS.AES.decrypt(
      CryptoJS.enc.Base64.parse(ciphertext), // Parse base64-encoded ciphertext
      "fdkndknknk"
    );
    const decryptedEmail = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedEmail;
  } catch (error) {
    console.error("Decryption error:", error.message);
    return null; // Handle decryption failure gracefully
  }
};
export const encryptEmail = (email) => {
  const ciphertext = CryptoJS.AES.encrypt(email, "fdkndknknk").toString();
  return ciphertext;
};
