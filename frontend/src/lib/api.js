export async function fetchAuctions() {
    const res = await fetch("http://localhost:8000/api/auctions/");

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
} 