import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

export const protectRoute = async (req, res, next) => {
  const { access_token, refresh_token } = req.cookies;

  if (!access_token && !refresh_token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No Tokens Provided" });
  }

  try {
    // ✅ Verify access token
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
    req.user = await User.findById(decoded.user_id).select("-password");
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError" && refresh_token) {
      try {
        // ✅ Verify refresh token
        const decodedRefresh = jwt.verify(
          refresh_token,
          process.env.REFRESH_TOKEN
        );

        // 🔄 Issue new access token
        const newAccessToken = jwt.sign(
          { user_id: decodedRefresh.user_id },
          process.env.ACCESS_TOKEN,
          { expiresIn: "15m" }
        );

        res.cookie("access_token", newAccessToken, {
          maxAge: 15 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV !== "development",
        });

        req.user = await User.findById(decodedRefresh.user_id).select(
          "-password"
        );
        return next();
      } catch {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid Refresh Token" });
      }
    }

    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};
