import { ClerkProvider } from "@clerk/nextjs";
import { JetBrains_Mono } from "next/font/google";
import '../globals.css';


export const metadata = {
    title: "Threads",
    description: "Generated by create next app",
}

const JET = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${JET.className} bg-dark-1`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}

