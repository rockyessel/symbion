/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "avatars.githubusercontent.com" },
            { hostname: "images2.imgbox.com" },
            { hostname: "lh3.googleusercontent.com" },
            { hostname: "media.licdn.com" },
            { hostname: "source.unsplash.com" },
            { hostname: "localhost" },
            { hostname: "local.com" },
            { hostname: "app.local.com" },
            { hostname: "cdn.sanity.io" },
            { hostname: "lootrush-website-assets.s3.us-east-1.amazonaws.com" },
            { hostname: "pbs.twimg.com" },
            { hostname: "import.cdn.thinkific.com" },
            { hostname: "encrypted-tbn0.gstatic.com" },
            { hostname: "vara.network" },
            { hostname: "ipfs.io" }
        ]
    },
};

export default nextConfig;
