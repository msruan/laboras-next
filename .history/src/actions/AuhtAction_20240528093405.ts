import axios from "axios";

export async function register(previousState: any, formData: FormData) {
  const { username, first_name, last_name, email, password } =
    Object.fromEntries(formData);
  const newUser = {
    username: username,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  };
  const response = await axios.post(
    "http://localhost:3000/api/auth/signup",
    newUser
  );
  console.log(response);
  return response.data;
}
