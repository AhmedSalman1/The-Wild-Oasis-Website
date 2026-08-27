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
		],
	},
	cacheComponents: true,
};

export default nextConfig;
