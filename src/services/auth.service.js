import axios from "axios";
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
        // .catch((error) => {
        //   console.log('==||===', error)
        //   reject(error);
        // });
    });
  }
}

export default new AuthService();

export function Logout(from = "/") {
  ExpirySession.clear();
  const location = {
    pathname: "/",
    state: { from },
  };
  Navigation.push(location);
  window.location.reload();
}
