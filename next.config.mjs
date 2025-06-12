import pkg from "@netlify/next";
const { withNetlify } = pkg;

export default withNetlify({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
});
