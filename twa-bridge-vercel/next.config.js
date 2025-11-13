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
      beforeFiles: [
        // Routes de conformité Play (pages statiques hébergées sur site-nowis)
        {
          source: "/privacy",
          destination: "https://www.nowis.store/privacy.html",
        },
        {
          source: "/privacy.html",
          destination: "https://www.nowis.store/privacy.html",
        },
        {
          source: "/delete-account",
          destination: "https://www.nowis.store/delete-account.html",
        },
        {
          source: "/delete-account.html",
          destination: "https://www.nowis.store/delete-account.html",
        },
        // Proxy API calls to the backend if the frontend uses relative URLs (optional safety net)
        {
          source: "/api/:path*",
          destination: "https://server-jeux-millionnaire.onrender.com/api/:path*",
        },
        {
          source: "/_next/:path*",
          destination: "https://client-jeux-millionnaire.vercel.app/_next/:path*",
        },
        {
          source: "/favicon.ico",
          destination: "/icons/icon-192.png",
        }
      ],
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
