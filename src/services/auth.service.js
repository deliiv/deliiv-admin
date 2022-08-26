import axios from "axios";
import LocalStorage from "src/utils/localstorage";
import ExpirySession from "../utils/expirysession";
import Navigation from "./navigation.service";

class AuthService {
  async doLogin(data) {
    return new Promise((resolve, reject) => {
      axios
        .post("admin/login", data)
        .then((response) => {
          console.log('====',response)
          resolve(response);
        })
        .catch(err=>{
          reject(err)
        })
    });
  }
}

export default new AuthService();

export function Logout(from = "/") {
  ExpirySession.clear();
  LocalStorage.clear('user_data')
  LocalStorage.clear('token')
  const location = {
    pathname: "/",
    state: { from },
  };
  Navigation.push(location);
  window.location.reload();
}
