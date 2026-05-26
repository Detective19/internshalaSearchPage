// src/services/api.js

const BASE_URL = "https://internshala.com/hiring/search";
const PROXY_URL = `https://corsproxy.io/?url=${encodeURIComponent(BASE_URL)}`;

/**
 * Fetches internship listings from Internshala via a CORS proxy.
 *
 * The API does NOT return a plain array.
 * Internships live inside: data.internships_meta
 * Which is an object like: { "65532": { ... }, "65531": { ... } }
 * So we use Object.values() to convert it to an array.
 *
 * @returns {Promise<Array>} - Array of internship objects
 */
export async function fetchInternships() {
  try {
    const response = await fetch(PROXY_URL, {
      headers: {
        // Tell the server we accept JSON
        Accept: "application/json",
      },
    });

    // If HTTP status is not 2xx, throw an error
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Safety check — make sure the expected key exists
    if (!data?.internships_meta) {
      throw new Error("Unexpected API response structure");
    }

    // Convert object of objects → array of objects
    const internshipsArray = Object.values(data.internships_meta);

    return internshipsArray;

  } catch (error) {
    console.error("Failed to fetch internships:", error.message);
    // Re-throw so the calling component can handle the error state
    throw error;
  }
}