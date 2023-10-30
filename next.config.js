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

}

module.exports = nextConfig
