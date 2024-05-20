/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    GOOGLE_CLIENT_ID:
      "56946012782-4fos0hcshm0n4jrfs9h3e5ril1hma1up.apps.googleusercontent.com",
    GOOLE_CLIENT_SECRET: "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",

    NEXTAUTH_SECRET:
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMDc1NDg0NywiaWF0IjoxNzEwNzU0ODQ3fQ.9n-x_Zw4syq4hv_IqtQE8S1KhxdNoRfwLUj7kA_Ublo",
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    // config.module.rules.push({
    //   test: /\.pdf$/,
    //   use: {
    //     loader: "file-loader",
    //     options: {
    //       name: "[path][name].[ext]",
    //     },
    //   },
    // });
    config.module.rules.push({
      test: /\.(pdf)$/,
      type: "asset/resource",
    });

    return config;
  },
  reactStrictMode: false,
};

export default nextConfig;
