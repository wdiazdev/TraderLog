import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  [key: string]: any;
}

export default function useJwtDecode(claimType: "role") {
  let claimData: string | undefined = undefined;

  const token = localStorage.getItem("user");
  if (token) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);

      claimData =
        decodedToken[
          `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/${claimType}`
        ];
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  return { claimData };
}
