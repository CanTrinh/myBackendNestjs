module.exports = {
  apps: [
    {
      name: "myBackendNestjs",
      script: "dist/src/main.js",
      env: {
        DATABASE_URL: "mysql://admin:Saostar1995@mydatabase.c5iggco2eked.ap-southeast-2.rds.amazonaws.com:3306/mydatabase",
        JWT_SECRET: "hskhsierihn3759kfjjruiurkfur",
        JWT_EXPIRES_IN: "1h"
      }
    }
  ]
};
