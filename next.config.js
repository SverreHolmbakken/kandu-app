/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'hjojgyofdixsdnxbualg.supabase.co',
				port: '',
			},
		],
	},
	experimental: {
		swcPlugins: [["@swc-jotai/react-refresh", {}]],
	},
};

module.exports = nextConfig;
