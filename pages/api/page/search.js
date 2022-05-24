import PageModel from '../../../model/page';

export default async (req, res) => {
    if (req.method === 'POST') {
        let {pageName, locale} = req.body;
        let searchResults = await PageModel.search(pageName);
        res.json(searchResults);
    } else {
        return res.status(405).json({message: 'wrong http method'});
    }
};
