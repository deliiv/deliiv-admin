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

  async addService(body) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let data = qs.stringify(body);

    return new Promise((resolve, reject) => {
      axios
        .post("/service/add", data, config)
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
    return new Promise((resolve, reject) => {
      axios
        .get("/part/getAllPartCategory", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
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
}

export default new UserService();
