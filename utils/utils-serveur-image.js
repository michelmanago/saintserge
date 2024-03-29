import {fetchWrapper} from './utils';

// Check if media is a video
export function isVideo(publicPath) {
    return (
        publicPath.endsWith('.mp4') ||
        publicPath.endsWith('.mpeg') ||
        publicPath.endsWith('.webm') ||
        publicPath.endsWith('.ogg') ||
        publicPath.endsWith('.3gpp') ||
        publicPath.endsWith('.3gpp2') ||
        publicPath.endsWith('.x-msvideo')
    );
}
// get the full url for a media hosted on centenaire serveur image
export function getMediaLink(publicPath) {
    return process.env.NEXT_PUBLIC_SERVER_IMAGE + publicPath;
}

// the full url for centaire serveur image api
export function getServerImageEndpoint() {
    return process.env.NEXT_PUBLIC_SERVER_IMAGE + '/saint-serge/medias';
}

// fetch
export async function getServeurImageMedia(mediaId) {
    let res = await fetchWrapper(`/api/media/${mediaId}`, null, 'GET');
    if (res) {
        let media = await res.json();
        console.log({media});
        return media;
    }
    return null;
}
