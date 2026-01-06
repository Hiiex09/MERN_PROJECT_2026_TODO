import jwt from "jsonwebtoken";

export const generateToken = (user_id, res) => {
  const access_token = jwt.sign({ user_id }, process.env.ACCESS_TOKEN, {
    expiresIn: "15mins",
  });

  const refresh_token = jwt.sign({ user_id }, process.env.REFRESH_TOKEN, {
    expiresIn: "7days",
  });

  res.cookie("access_token", access_token, {
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.cookie("refresh_token", refresh_token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return { access_token, refresh_token };
};
