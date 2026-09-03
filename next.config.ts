import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "yecjjugxzbxgmjiwhzgt.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/cabin-images/**",
			},
			{
				protocol: "https",
				hostname: "flagcdn.com",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
	cacheComponents: true,
	cacheLife: {
		cabins: {
			stale: 86400,
			revalidate: 3600,
			expire: 604800,
		},
	},
};

export default nextConfig;
