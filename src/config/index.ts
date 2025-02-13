export const config = {
  app: {
    name: "Silk Road",
    description: "Decentralized marketplace for real-world assets",
  },
  web3: {
    supportedChains: ["ethereum", "polygon"],
    rpcUrls: {
      ethereum: process.env.VITE_ETH_RPC_URL,
      polygon: process.env.VITE_POLYGON_RPC_URL,
    },
  },
  api: {
    baseUrl: process.env.VITE_API_URL || "http://localhost:3000",
  },
};
