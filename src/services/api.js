// src/services/api.js

const BASE_URL =
  "https://internshala.com/hiring/search";

const PROXY_URL =
  `https://api.allorigins.win/raw?url=${encodeURIComponent(BASE_URL)}`;

export async function fetchInternships() {
  try {
    const response = await fetch(PROXY_URL);

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data?.internships_meta) {
      throw new Error(
        "Unexpected API response structure"
      );
    }

    return Object.values(data.internships_meta);

  } catch (error) {
    console.error(
      "Failed to fetch internships:",
      error.message
    );

    throw error;
  }
}