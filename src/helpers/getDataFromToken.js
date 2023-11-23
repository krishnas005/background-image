
import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    const TOKEN_SECRET = 'defaultsecret';
    try {
        const token = request.cookies.get('token')?. value || '';
        const decodedToken = jwt.verify(token,TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }
}