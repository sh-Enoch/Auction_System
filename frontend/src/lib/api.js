export async function fetchAuctions() { // Changed to named export
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined. Please set NEXT_PUBLIC_API_URL environment variable.");
    throw new Error("API configuration error. Please contact support.");
  }

  try {
    const res = await fetch(`${apiUrl}/auctions/`); // Ensure trailing slash if your API needs it
    
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
    
    const auctions = await res.json();
    return auctions;

  } catch (error) {
    // This will catch network errors or errors from parsing res.json() if res.ok was true but content was malformed
    // It also catches errors thrown from the !res.ok block.
    console.error("Fetch Operation Error:", error);
    // Avoid exposing raw error messages if they might contain sensitive info.
    // The error thrown from !res.ok block is already specific. If it's a different error, provide a generic one.
    if (error.message.startsWith("Could not fetch auctions")) {
      throw error; // Re-throw the specific error from the !res.ok block
    }
    throw new Error("An unexpected error occurred while fetching auctions. Please try again later.");
  }
}