import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			new URL(
				"https://yecjjugxzbxgmjiwhzgt.supabase.co/storage/v1/object/public/cabin-images/**"
			),
		],
	},
};

export default nextConfig;
