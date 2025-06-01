export default async function fetchAuctions() {
    const url = "http://localhost:8000/api/auctions/";
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch auctions: ${res.error}`);
        }
        const data = await res.json();
        return data;
        
    } catch (err) {
        return {
            error: err.message,
        };
    }
}