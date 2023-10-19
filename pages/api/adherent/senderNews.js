import {sendEmailNewArticle} from '../../../lib/emailSender';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let page = req.body;
        console.log({page});
        await sendEmailNewArticle(page);
        return res.json({message: 'email send to all adherent'});
    } else {
        return res.status(400).json({message: 'Method not allow'});
    }
}
