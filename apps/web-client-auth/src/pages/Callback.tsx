import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

export default function Callback() {
    const [params] = useSearchParams();
    const code = params.get("code");
    const navigate = useNavigate();
    const setTokens = useAuth((s) => s.setTokens);

    useEffect(() => {
        const codeVerifier = localStorage.getItem("pkce_code_verifier");
        if (!code || !codeVerifier) return;

        const data = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET, // <- aqui
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier,
        });

        fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data.toString(),
        })
            .then((res) => res.json())
            .then((tokens) => {
                console.log("Tokens recebidos:", tokens);
                setTokens(tokens.access_token, tokens.id_token);
                navigate("/");
            })
            .catch((err) => {
                console.error("Erro ao trocar o código por tokens:", err);
            });
    }, [code, setTokens, navigate]);

    return <p>Carregando autenticação...</p>;
}