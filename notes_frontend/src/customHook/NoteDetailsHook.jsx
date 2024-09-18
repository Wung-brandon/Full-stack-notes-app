import { useEffect, useState } from "react";

const useNoteDetails = (url) => {
    const [noteDetails, setNoteDetails] = useState(null);
    const [error, setError] = useState(null); // Track errors

    useEffect(() => {
        const fetchNoteDetails = async () => {
            const tokenString = localStorage.getItem("authTokens");
            const token = tokenString ? JSON.parse(tokenString) : null;
            const accessToken = token ? token.access : null;

            if (!accessToken) {
                console.error("No access token available! User might not be logged in.");
                return;
            }

            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                // Check if the response is OK (status 200-299)
                if (!response.ok) {
                    throw new Error(`Failed to fetch note details: ${response.status} ${response.statusText}`);
                }

                // Check the content type to ensure it's JSON
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Received non-JSON response");
                }

                const data = await response.json();
                setNoteDetails(data);
            } catch (error) {
                console.log("Error fetching note details:", error);
                setError(error.message);
            }
        };

        if (url) {
            fetchNoteDetails();
        } else {
            console.error("URL is undefined. Ensure noteId is passed correctly.");
        }
    }, [url]);

    return {
        noteDetails,
        error
    };
};

export default useNoteDetails;
