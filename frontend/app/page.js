"use client";
import { useState } from "react";

export default function Home() {
    const [trackId, setTrackId] = useState("");
    const [trackData, setTrackData] = useState(null);

    const handleSearch = async () => {
        if (!trackId) return;
        
        try {
            const response = await fetch(`/api/spotify?trackId=${trackId}`);
            const data = await response.json();
            setTrackData(data);
        } catch (error) {
            console.error("Error fetching track details:", error);
        }
    };

    console.log(trackData)

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🎵 NextJam - AI Music Recommender</h1>
            <input
                type="text"
                placeholder="Enter Spotify Track ID"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                style={{ padding: "10px", width: "300px" }}
            />
            <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "10px" }}>
                Search
            </button>

            {trackData && (
                <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
                    <h2>{trackData.name}</h2>
                    <p><strong>Artist:</strong> {trackData.artists?.map(artist => artist.name).join(", ")}</p>
                    <p><strong>Album:</strong> {trackData.album?.name}</p>
                    <p><strong>Popularity:</strong> {trackData.popularity}</p>
                    {trackData.album?.images?.[0]?.url && (
                        <img src={trackData.album.images[0].url} alt="Album Cover" width="200px" />
                    )}
                </div>
            )}
        </div>
    );
}
