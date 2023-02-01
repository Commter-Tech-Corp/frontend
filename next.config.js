/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	images: {
		domains: [
			'yurr-photo.s3.amazonaws.com',
		],
	},
};

module.exports = nextConfig;
