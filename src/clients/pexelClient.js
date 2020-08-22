import { createClient } from 'pexels';
import config from '../config';

const client = createClient(config.PEXEL_KEY);

// Generates a whole number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function queryVideos(query) {
    return await client.videos.search({ query, per_page: 30 });
}

export function getRandomVideo(query) {
    const videos = queryVideos(query).then(res => res.videos);
    return videos.then(videos => videos[getRandomNumber(0, videos.length)]);
}


