module.exports = {
  apps: [
    {
      name: "myBackendNestjs",
      script: "dist/src/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "700M",
      env_production: {
        DATABASE_URL: "mysql://admin:Cantrinh1995@database-c.c5iggco2eked.ap-southeast-2.rds.amazonaws.com:3306/can_database",
        JWT_SECRET: "hskhsierihn3759kfjjruiurkfur",
        JWT_EXPIRES_IN: "1h"
      },
       post_update: [
        "npm install",
        "npm run build",
        "npx prisma migrate deploy"
      ]

    }
  ]
};
