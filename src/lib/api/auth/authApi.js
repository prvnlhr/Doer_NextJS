const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function signUp(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`SignIn error ${response}`);
    }
  } catch (error) {
    console.log(error);
    throw new Error(`SignIn error: ${error}`);
  }
}

export async function signIn(email) {
  console.log(email);
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`SignIn error ${response}`);
    }
  } catch (error) {
    throw new Error(`SignIn error: ${error}`);
  }
}
