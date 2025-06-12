import { withNetlify } from '@netlify/next';

export default withNetlify({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
});
