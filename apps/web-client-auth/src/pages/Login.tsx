import { useEffect, useState } from "react";
import { generatePKCE } from "../auth/pkceUtils";

const CLIENT_ID = "<SEU_CLIENT_ID_GOOGLE>";
const REDIRECT_URI = "http://localhost:5173/callback";
const SCOPE = "openid email profile";

export default function Login() {
    const [pkce, setPkce] = useState<{ codeVerifier: string; codeChallenge: string } | null>(null);

    useEffect(() => {
        generatePKCE().then((result) => {
            setPkce(result);
            localStorage.setItem("pkce_code_verifier", result.codeVerifier);
        });
    }, []);

    const loginWithGoogle = () => {
        if (!pkce) return;

        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: "code",
            scope: SCOPE,
            code_challenge: pkce.codeChallenge,
            code_challenge_method: "S256",
            access_type: "offline",
            prompt: "consent",
        });

        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    };

    return <button onClick={loginWithGoogle}>Login com Google</button>;
}