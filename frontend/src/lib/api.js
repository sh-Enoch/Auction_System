export async function fetchAuctions() {
    const res = await fetch("http://localhost:8000/api/auctions/");

// export async function fetchAuctions() { // Changed to named export
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!apiUrl) {
//     console.error("API URL is not defined. Please set NEXT_PUBLIC_API_URL environment variable.");
//     throw new Error("API configuration error. Please contact support.");
//   }


    
    if (!res.ok) {
      // Attempt to get more error details from the response body
      let errorDetails = `Status: ${res.status}`;
      try {
        const errorData = await res.json();
        errorDetails += `, Message: ${errorData.message || JSON.stringify(errorData)}`;
      } catch (e) {
        // If response is not JSON or body is empty
        errorDetails += `, ${res.statusText || 'Failed to fetch data'}`;
      }
      console.error("API Error:", errorDetails);
      throw new Error(`Could not fetch auctions. ${errorDetails}. Please try again later.`);
    }
    return res.json();
} 

