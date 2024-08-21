import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000"
});

export async function checkout(data) {
  console.log(data, 'dddd');
  
  try {
    const response = await userApi.post("/checkout", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}