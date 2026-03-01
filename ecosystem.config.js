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
        JWT_EXPIRES_IN: "1h",
        // AWS S3 credentials
        AWS_ACCESS_KEY_ID: "AKIATNLGZDRPUEGJZBND",
        AWS_SECRET_ACCESS_KEY: "Canteo@95",
        AWS_REGION: "ap-southeast-2",
        AWS_S3_BUCKET: "my-frontend-angular"
      },
       post_update: [
        "npm install",
        "npm run build",
        "npx prisma migrate deploy"
      ],



    }
  ]
};
