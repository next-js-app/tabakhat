import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.themealdb.com', 'picsum.photos'],
  },
};

export default withFlowbiteReact(nextConfig);