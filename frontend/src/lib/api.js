export async function fetchAuctions(path) {
    const backendUrl = process.env.AUCTION_SYSTEM_BACKEND_URL
    const res = await fetch(`${backendUrl}${path}`);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
} 