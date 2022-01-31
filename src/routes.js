import feeRoutes from "./api/v1/fees";
// other routes go here for proper organisation

// other routes will be added here
const routes = [feeRoutes];

export default (app) => {
  routes.forEach((element) => {
    app.use(element);
  });
  return app;
};
