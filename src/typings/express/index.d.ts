declare namespace Express {
  interface Request {
    userType: "ADMINISTRATOR" | "WAREHOUSE" | "FINANCIAL" | "SELLER";
    userId: number;
    userStatus: "ACTIVE" | "INACTIVE";
  }

  interface Response {
    data: any;
  }
}
