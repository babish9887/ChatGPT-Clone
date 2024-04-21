/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'links.papareact.com',
          pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'static.vecteezy.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'static.vecteezy.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**',
          },
      ],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
};

export default nextConfig;
