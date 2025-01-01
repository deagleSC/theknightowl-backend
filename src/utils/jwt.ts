import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  // Make sure to set JWT_SECRET in your environment variables
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Generate token that expires in 24 hours
  return jwt.sign(payload, secret, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
