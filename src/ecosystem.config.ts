module.exports = {
  apps: [
    {
      name: "myBackendNestjs",
      script: "dist/src/main.js",
      env: {
        DATABASE_URL: "postgresql://user:password@host:5432/dbname"
      }
    }
  ]
};
