export default async function fetchAuctions() {
    const res = await fetch("localhost:8000/api/auctions/");
    const auctions = await res.json();

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return auctions;
} 