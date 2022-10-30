/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    grantType: "authorization_code",
    clientId: 9923,
    clientSecret: "QaBd9YgsrcQUREZXcyhKeZZ3tIQk6gazg4qf8jsS",
    redirectURI: "http://localhost:3000",
  },
};

module.exports = nextConfig;
