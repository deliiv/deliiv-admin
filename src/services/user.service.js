import axios from "axios";
import authHeader from "./auth.header";
import qs from "qs";

class UserService {
  async getOrders() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/all-orders", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async updateOrderStatus(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-order", data, config)
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
  async getAllAgencies() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/get-agencies", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async getAllActiveRiders() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/active-riders", config)
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
  async changeJobRider(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/change-job-rider", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  //*************STORE PRODUCT */

  async createStoreProduct(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/create-store-product", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  async updateStoreProductImage(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/upload-store-product-image", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async deleteStoreProductImage(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post(`/admin/delete-store-product-pic/${id}`,null, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async cancelJob(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post(`/admin/cancel-job/${id}`,null, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  async updateStoreProduct(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-store-product", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /****************CATEGORY**************/
  async updateCategory(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-category", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async uploadDocument(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/rider/upload/admin-upload", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async uploadReceiptDocument(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/rider/upload/payment-receipt", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async createAdmin(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/create-admin", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async updateAdmin(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-admin", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async updateSystemConfig(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-system-config", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async updateSystemBonus(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .put("/admin/update-system-bonus", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async allAdmin() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/all-admin",config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async searchRider(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/search-rider", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async sendPushNotification(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/send-push-notification", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async searchRiderDocs(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/search-rider-docs", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async updateWithdrawalRequest(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("admin/update-withdrawal-request", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async verifyRider(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/verify-rider", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async changeActiveStatus(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/change-rider-status", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  async createRegion(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/add-region", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async deleteDoc(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/delete-doc", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  async updateRegion(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-region", data, config)
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
  async createServiceChargePrice(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/create-service-charge-price", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async updateServiceChargePriceRange(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-service-charge-price", data, config)
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
  async getAllStoreProducts() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/all-store-product", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async getAllTransaction() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/fetch-transactions", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async getAllPayment() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/get-all-withdrawal-request", config)
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

  async fetchAvailableCategories() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/get-available-category", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async fetchAllBanners() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/fetch-all-banners", config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async createBanner(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/create-banner", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async uploadBannerImage(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/upload-banner-image", data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async uploadBannerTitle(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/update-banner-title", data, config)
        .then((response) => {
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
  async fetchAllRiders() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/get-riders", config)
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
        .get(`/admin/get-user-details/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async getSingleOrderDetails(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/admin/order/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async getSingleRider(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/admin/get-rider-details/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async getSingleAgency(id) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get(`/admin/get-agency-details/${id}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  async registerAdmin(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/register-admin", data, config)
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
  async allProducts() {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .get("/all-products", config)
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
  async addSellerAddress(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post("/admin/create-seller-address", data, config)
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
  async updateUserInfo(data) {
    const config = await authHeader();
    return new Promise((resolve, reject) => {
      axios
        .post(`/admin/update-user-info`,data, config)
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

  async getCategory(id) {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // };    return new Promise((resolve, reject) => {
    //   axios
    //     .get(`/admin/get-category/${id}`, config)
    //     .then(response => {
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       console.log('ERR: ', error.response)
    //       reject(error);
    //     });
    // });

    var data = JSON.stringify({
      "name": "master"
    });

    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/admin/get-category/3',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
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
  async getUserDetails(id) {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // };

    const config = await authHeader();


    return new Promise((resolve, reject) => {
      axios
        .get(`/admin/get-user-details/${id}`, config)
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
