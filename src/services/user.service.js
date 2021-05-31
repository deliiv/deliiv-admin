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

  async getPromos() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/promo/all", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getAvailablePromos() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/promo/getAllAvailablePromo", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getPromoProducts(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/promo/getPromoProducts/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async newProduct(data) {
    const config = await authHeader();
    return axios.post("/new_product", data, config);
  }

  async uploadProductImage(data) {
    const config = await authHeader();
    return axios.post("/new_product/updateImage", data, config);
  }

  async editProduct(data) {
    const config = await authHeader();
    return axios.post("/new_product/edit", data, config);
  }

  async markForPromo(data) {
    const config = await authHeader();
    return axios.post("/promo/markForPromo", data, config);
  }

  async deleteProductImage(data) {
    const config = await authHeader();
    return axios.post("/new_product/deleteImage", data, config);
  }

  async addProject(data) {
    const config = await authHeader();
    return axios.post("/project/", data, config);
  }
}

export default new UserService();
