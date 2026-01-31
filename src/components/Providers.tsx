"use client";

import { ReactNode, useState, useEffect } from "react";
import { Connect } from "@stacks/connect-react";
import { UserSession, AppConfig } from "@stacks/connect";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    // Initialize UserSession only on client side
    const [userSession, setUserSession] = useState<UserSession | undefined>(undefined);

    useEffect(() => {
        const appConfig = new AppConfig(['store_write', 'publish_data']);
        const session = new UserSession({ appConfig });
        setUserSession(session);
    }, []);

    if (!userSession) {
        return null;
    }

    const authOptions = {
        appDetails: {
            name: "FundStx",
            icon: typeof window !== "undefined" ? window.location.origin + "/vercel.svg" : "",
        },
        redirectTo: "/",
        onFinish: () => {
            // Instead of reloading, we could just let the state update propagate if possible, 
            // but reloading is a safe reliable way to ensure all state is fresh from localStorage.
            // We can keep it for now.
            window.location.reload();
        },
        userSession,
    };

    return (
        <Connect authOptions={authOptions}>
            {children}
        </Connect>
    );
}
