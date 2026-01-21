"use client";

import { ReactNode } from "react";
import { Connect } from "@stacks/connect-react";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const authOptions = {
        appDetails: {
            name: "FundStx",
            icon: typeof window !== "undefined" ? window.location.origin + "/vercel.svg" : "",
        },
        redirectTo: "/",
        onFinish: () => {
            window.location.reload();
        },
        userSession: undefined, // Let it default or manage via context
    };

    return (
        <Connect authOptions={authOptions}>
            {children}
        </Connect>
    );
}
