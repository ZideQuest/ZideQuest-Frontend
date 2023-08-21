import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function sendLoginData(username, password) {
  // try {
  //   const res = await axios.get(`${BASE_URL}/${username}`)
  //   console.log(res)
  //   return res.data
  // } catch (e) {
  //   console.error(e)
  // }

  if (username === "admin") {
    return {
      token: "ayojwthere123456789",
      isAdmin: true,
      username: "adminThe1st",
      message: "logged in successfully",
      status: 200,
    };
  }
  if (username === "user") {
    return {
      token: "ayonormaluserhere23948123",
      isAdmin: false,
      username: "userThe2nd",
      message: "logged in successfully",
      status: 200,
    };
  }

  return {
    message: "failed to login",
    status: 401,
  };
}
