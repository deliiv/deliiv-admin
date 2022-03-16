import ExpirySession from "../utils/expirysession";

export default async function authHeader() {
  const accessToken = await ExpirySession.get("access");
  let config = {
    headers: {
      Authorization: `${accessToken}`,
    },
  };
  return new Promise((resolve) => {
    resolve(config);
  });
}
