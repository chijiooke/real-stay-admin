import { redirect } from "next/navigation";
import { Suspense } from "react";

const url = process.env.NEXT_PUBLIC_BASE_URL;
export const metadata = {
  title: "Real Stay | real estate simplified",
  description:
    "Get access to properties, share properties for sale, rent or lease, and get access to real estate agents",
  openGraph: {
    title: "Real Stay | real estate simplified",
    description:
      "Get access to properties, share properties for sale, rent or lease, and get access to real estate agents",
    url,
    type: "website",
    images: [
      {
        url: `${url}/blue-logo.svg`,
        width: 600,
        height: 600,
        alt: "real stay logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Stay | real estate simplified",
    description:
      "Get access to properties, share properties for sale, rent or lease, and get access to real estate agents",
    images: [`${url}/blue-logo.svg`],
  },
};

export default function Home() {
  
  redirect("/sign-in");
}
