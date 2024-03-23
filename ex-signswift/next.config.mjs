/** @type {import('next').NextConfig} */
const nextConfig = {
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
