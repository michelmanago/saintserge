import {validateMediaLegende} from '../../../components/validate/media';
import {deleteMedia, getSingleMedia, updateMedia} from '../../../model/media';

export default async function handler(req, res) {
    try {
        const id = req.query.id;
        if (req.method === 'GET') {
            const results = await getSingleMedia(id);

            return res.json(results);
        } else if (req.method === 'DELETE') {
            let mediaDelete = await deleteMedia(id);
            return res.json({msg: 'Media delete'});
        } else {
            return res.status(405).json({message: 'wrong http method'});
        }
    } catch (e) {
        console.log(e);

        if (e.status) {
            res.status(e.status);
        } else {
            res.status(500);
        }

        return res.json({message: e.message});
    }
}
