declare namespace Express {
  export interface Request {
    user?: any; // You can make this more specific based on your JWT payload type
  }
}
