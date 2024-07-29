import Interseption from "../utils/intreceptors/Interecepter";
const Api = Interseption;
export async function AdminData(userData) {
    console.log(userData);
    try {
        const response = await Api.post("/register", userData);
        console.log(response.data);
        return response.data;
      } catch (err) {
        console.error("Error in UserData:", err);
        throw err;
      }
  }

  
export async function LoginData(userData) {
    try {
      const response = await Api.post("/login", userData);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error in UserData:", err);
      throw err;
    }
  }

  export async function EmployeeData(Data) {
    try {
      console.log(Data,'dddd');
      const response = await Api.post("/addEmployee", Data ,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error in UserData:", err);
      throw err;
    }
  }
  export async function getData(Data) {
    try {
      console.log(Data,'dddd');
      const response = await Api.get("/getEmployees");
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error in UserData:", err);
      throw err;
    }
  }
  export async function UpdateEmployeeData(Data) {
    try {
      console.log(Data,'dddd');
      const response = await Api.put("/edit",Data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error in UserData:", err);
      throw err;
    }
  }
  export async function deleteEmployee(id) {
    try {
      console.log(id,'dddd');
      const response = await Api.put(`/delete/${id}`)
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error in UserData:", err);
      throw err;
    }
  }
