import {createAdherent} from '../../../dao/adherent';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let emailUser = req.query?.email;
        console.log({emailUser});
        try {
            await createAdherent({email: emailUser});
        } catch (error) {
            return res.status(500).json({error});
        }
        // sendEmailNewArticle(page);
        return res.json({message: 'subscribe'});
    } else {
        return res.status(400).json({message: 'Method not allow'});
    }
}
