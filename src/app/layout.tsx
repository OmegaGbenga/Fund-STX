import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "FundStx | Next-Gen Crowdfunding",
  description: "Launch your dreams with stablecoin liquidity on Stacks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} antialiased selection:bg-black selection:text-white`}
      >
        <Providers>
          <Navbar />
          <main className="pt-24 min-h-screen px-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}


