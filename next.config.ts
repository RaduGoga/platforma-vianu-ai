import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // notebook-urile se descarcă ca fișier, cu tipul pe care îl așteaptă Jupyter
        source: "/notebooks/:file*",
        headers: [
          { key: "Content-Type", value: "application/x-ipynb+json" },
          { key: "Content-Disposition", value: "attachment" },
        ],
      },
    ];
  },
};

export default nextConfig;
