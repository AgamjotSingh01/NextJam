import { NextResponse } from "next/server";
import axios from "axios";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
    try {
        const response = await axios.post("https://accounts.spotify.com/api/token", 
            new URLSearchParams({ grant_type: "client_credentials" }), 
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error.response?.data || error.message);
        return null;
    }
};

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const trackId = searchParams.get("trackId");

    if (!trackId) {
        return NextResponse.json({ error: "Track ID is required" }, { status: 400 });
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
        return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
    }

    try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Error fetching track details:", error.response?.data || error.message);
        return NextResponse.json({ error: "Failed to fetch track details" }, { status: 500 });
    }
}
