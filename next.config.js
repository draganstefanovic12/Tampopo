/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    grantType: "autorization_code",
    clientId: 9875,
    clientSecret: "G0rVHCB3BJ22OlzMwGCyDm9y6E7lSxhpUIsUnsHx",
    redirectURI: "http://localhost:3000",
  },
};

module.exports = nextConfig;
