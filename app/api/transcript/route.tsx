import { NextResponse } from 'next/server';
import axios from 'axios';

const SCRAPE_CREATORS_API_KEY = process.env.SCRAPE_CREATORS_API_KEY;
const API_BASE_URL = 'https://api.scrapecreators.com/v1/youtube/video';

// Helper function to validate YouTube URL
function isValidYouTubeUrl(url: string) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
}

// Helper function to extract video ID
function getYouTubeVideoId(url: string) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!SCRAPE_CREATORS_API_KEY) {
      console.error('SCRAPE_CREATORS_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const { url } = await request.json();

    // Validate URL
    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    if (!isValidYouTubeUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL format' },
        { status: 400 }
      );
    }

    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: 'Could not extract YouTube video ID' },
        { status: 400 }
      );
    }

    // Call ScrapeCreators API using axios
    const { data } = await axios.get(
      `${API_BASE_URL}?url=${encodeURIComponent(url)}&get_transcript=get_transcript`,
      {
        headers: {
          'x-api-key': SCRAPE_CREATORS_API_KEY
        }
      }
    );

    if (!data || !data.transcript_only_text) {
      throw new Error('No transcript data received');
    }

    console.log('Successfully fetched transcript for video:', videoId);

    return NextResponse.json({
      transcript: data.transcript_only_text,
      videoDetails: {
        title: data.title || 'Untitled Video',
        viewCount: data.viewCountInt || 0,
        publishDate: data.publishDate || new Date().toISOString(),
        channel: data.channel?.title || 'Unknown Channel'
      }
    });

  } catch (error) {
    console.error('Error processing transcript request:', error);
    
    // Handle axios errors specifically
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || error.message;
      
      return NextResponse.json(
        { error: errorMessage },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch transcript' },
      { status: 500 }
    );
  }
}
