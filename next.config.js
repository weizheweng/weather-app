/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true, // 設定路徑是否要加上尾端的斜線
    reactStrictMode: true, // 啟用 React 嚴格模式
    images: {
        unoptimized: true,
    },
};


module.exports = nextConfig
