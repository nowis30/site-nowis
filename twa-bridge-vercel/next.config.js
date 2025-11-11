/**
 * Bridge app: serves /.well-known/assetlinks.json, static /icons and /manifest.webmanifest
 * Locally. All other unmatched routes proxy (rewrite) to the existing app
 * at client-jeux-millionnaire.vercel.app. We use afterFiles so real static files
 * are served BEFORE rewrites (évite 401 sur /icons/icon.svg).
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          source: "/:path*",
          destination: "https://client-jeux-millionnaire.vercel.app/:path*",
        }
      ],
      fallback: []
    };
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
