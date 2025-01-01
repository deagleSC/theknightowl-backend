import swaggerJsdoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My TypeScript Express API",
      version: "1.0.0",
      description: "A simple Express API with TypeScript and Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update with your server URL
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
