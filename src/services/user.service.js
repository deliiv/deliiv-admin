import axios from "axios";
import authHeader from "./auth.header";
import qs from "qs";

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
  async getServiceCharge() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/get-service-charge", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async updateServiceCharge(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-service-charge", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async createServiceCharge(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/create-service-charge", data, config)
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
        .get("/admin/load-dashboard-data", config)
        // .get("/users/allUsers", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async getDashboardData() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/load-dashboard-data", config)
        // .get("/users/allUsers", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async fetchAvailableRegionData() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/get-all-region", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async fetchAvailableCategories() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/get-available-category", config)
        .then((response) => {
          console.log("KKKKKKKKK: ", response)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async fetchAllUsers() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/all-users", config)
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

  async addServicemen(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/servicemen/add", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getAllSellers() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/get-all-sellers", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async addSeller(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/register-seller", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async addProductByAdmin(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/product-request", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async uploadProductImage(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/upload-product-image", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async uploadCategoryImage(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/upload-category-image", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async updateProduct(data) {
    const config = await authHeader();

    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-product", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async deleteProductImage(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post(`/admin/delete-product-pic/${id}`,null, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async updateSellerInfo(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post(`/admin/update-seller-info`,data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async getSellerProduct(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/admin/get-product/${data}`, config)
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
        .get(`/servicemen/serviceman/${id}`, config)
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
    // return new Promise((resolve, reject) => {
    //   axios
    //     .get("/service", config)
    //     .then((response) => {
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }

  async addCategory(body) {
    const config = await authHeader();

    let data = qs.stringify(body);

    return new Promise((resolve, reject) => {
      axios
        .post("/admin/create-category", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async updateService(body, id) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let data = qs.stringify(body);

    return new Promise((resolve, reject) => {
      axios
        .put(`/service/${id}`, data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async deleteService(id) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .delete(`/service/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getPartsCategory() {
    const config = await authHeader();
    // return new Promise((resolve, reject) => {
    //   axios
    //     .get("/part/getAllPartCategory", config)
    //     .then((response) => {
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }

  async getAllSubpartCategoryWithId(id) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .get(`/part/getAllSubpartCategory/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async addSubPartCategory(body) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let data = qs.stringify(body);

    return new Promise((resolve, reject) => {
      axios
        .post("/part/addSubpartCategory", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async addPartCategory(body) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let data = qs.stringify(body);

    return new Promise((resolve, reject) => {
      axios
        .post("/part/addPartCategory", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getParts(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/part/allParts/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async addPart(body) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let data = qs.stringify(body);

    return new Promise((resolve, reject) => {
      axios
        .post("/part/addPart", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async updatePart(body, id) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let data = qs.stringify(body);

    return new Promise((resolve, reject) => {
      axios
        .put(`/part/updatePart/${id}`, data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async deletePart(body, id) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let data = qs.stringify(body);

    return new Promise((resolve, reject) => {
      axios
        .delete(`/part/getOne/${id}`, data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getSellerDetails(id) {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // };

    const config = await authHeader();


    return new Promise((resolve, reject) => {
      axios
        .get(`/admin/get-seller-details/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
//getRegions
export default new UserService();
