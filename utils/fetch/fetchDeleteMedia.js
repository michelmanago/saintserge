import {fetchWrapper} from '../utils';
import {getServerImageEndpoint} from '../utils-serveur-image';

export default async function fetchDeleteMedia(media) {
    try {
        let results = null;

        let mediaNameSplit = media.public_path.split('/');
        let mediaName = mediaNameSplit[mediaNameSplit.length - 1];
        console.log(mediaName);

        // Fetch
        const response = await fetch(getServerImageEndpoint() + '/' + mediaName, {
            method: 'DELETE',
        });

        // const response = await fetchWrapper(getServerImageEndpoint() + '/' + media.id, media, 'DELETE');

        // Decode
        if (response.ok) {
            results = await response.json();
        } else {
            throw new Error(response.statusText);
        }

        // Receive results
        return true;
    } catch (error) {
        console.log('FetchDeleteMedia', error);
        return false;
    }
}
