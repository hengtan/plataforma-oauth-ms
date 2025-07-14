export async function generatePKCE() {
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);

    const codeVerifier = btoa(String.fromCharCode(...randomBytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const base64Url = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    return {
        codeVerifier,
        codeChallenge: base64Url,
    };
}