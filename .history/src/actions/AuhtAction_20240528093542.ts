import axios from "axios";

/**
 * The function `register` sends a POST request to a specified API endpoint with user registration data
 * and returns the response data.
 * @param {any} previousState - The `previousState` parameter in the `register` function is likely used
 * to store the previous state of the hook useFormState. This parameter is not directly used
 * @param {FormData} formData - The `formData` parameter in the `register` function is of type
 * `FormData`, which is typically used to represent a set of key/value pairs representing form fields
 * and their values. In this case, the `formData` object likely contains user input data such as
 * username, first name, last name,
 * @returns The `register` function is returning the data received from the response of the POST
 * request made to "http://localhost:3000/api/auth/signup". This data is accessed using
 * `response.data`.
 */
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
