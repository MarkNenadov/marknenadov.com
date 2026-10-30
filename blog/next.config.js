/** @type {import('next').NextConfig} */
const nextConfig = {
    // The repo root is a separate app with its own lockfile, so don't let Next infer it as the workspace root.
    turbopack: {
        root: __dirname,
    },
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
              },
              {
                key: 'X-Permitted-Cross-Domain-Policies',
                value: 'none',
              },
              {
                key: 'X-Frame-Options',
                value: 'DENY',
              },
              {
                key: 'Cross-Origin-Opener-Policy',
                value: 'same-origin',
              },
            ],
          },
        ]
    }
}

module.exports = nextConfig
