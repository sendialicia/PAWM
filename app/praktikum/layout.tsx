import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Praktikum - Lab Biomedis",
  description: "Praktikum Teknik Biomedis",
};

export default function PraktikumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
