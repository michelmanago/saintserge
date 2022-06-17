import {sendContactEmail} from '../../../lib/emailSender';

export default function handler(req, res) {
    try {
        if (req.method === 'POST') {
            console.log({query: req.body});

            sendContactEmail(req.body);

            return res.json('ok');
        } else {
            return res.status(405).json({message: 'wrong http method'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
