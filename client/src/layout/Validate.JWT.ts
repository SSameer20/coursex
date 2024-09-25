import { jwtDecode, JwtPayload } from 'jwt-decode';


interface CustomJwtPayload extends JwtPayload {
    exp?: number;  // Expiration time (optional because it's not always included)
    iat?: number;  // Issued at time (optional)
    sub?: string;  // Subject (optional)
  }

export const validateJWT = (token: string | null): boolean => {
    if (!token) return false;
    try {
      const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        console.log("Token has expired");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid JWT", error);
      return false;
    }
};