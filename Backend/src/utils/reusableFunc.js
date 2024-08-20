import { findUserById } from "../model/User.model.js";

const validateAccessToken =async (accessToken) => {
    const incomingAccessToken = accessToken;
    if (!incomingAccessToken) {
        return false
    }

    try {
        const decodedToken = jwt.verify(
            incomingAccessToken,
            process.env.ACCESS_TOKEN_SECRET
        );
        const user = await findUserById(decodedToken.id);

        if (!user) {
            return false
        }

        return true
    } catch (error) {
        return false
    }
};
export {validateAccessToken}