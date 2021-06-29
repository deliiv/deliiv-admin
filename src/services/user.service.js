import axios from "axios";
import authHeader from "./auth.header";

class UserService {
  async getOrders() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/order", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getSingleOrder(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/order/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getCustomers() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/users/allUsers", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getSingleCustomer(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/users/userdetails/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getServicemen() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/servicemen", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getServiceman(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/servicemen/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getServices() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/service", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new UserService();
