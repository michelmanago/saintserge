import PageModel, {getLastPages, getPageTranslations} from '../../../model/page';

export default async (req, res) => {
    if (req.method === 'POST') {
        let page = req.body;
        try {
            let homeFRArray = await getLastPages('fr', 'home', 1);
            if (homeFRArray) {
                let homeFR = homeFRArray[0];
                homeFR.page = '';
                await PageModel.update({id: homeFR.id, page: homeFR.page});
                let [homeEN] = await getLastPages('en', 'home', 1);
                homeEN.page = '';
                await PageModel.update({id: homeEN.id, page: homeEN.page});
                let [homeRU] = await getLastPages('ru', 'home', 1);
                homeRU.page = '';
                await PageModel.update({id: homeRU.id, page: homeRU.page});
            }

            if (page) {
                let pageTranslates = await getPageTranslations(page.id);
                if (pageTranslates && pageTranslates.length > 0) {
                    pageTranslates.map(async page => await PageModel.update({id: page.id, page: 'home'}));
                }
            }

            res.json({message: 'page update'});
        } catch (error) {
            res.status(405).json({message: error.message});
        }
    } else {
        return res.status(405).json({message: 'wrong http method'});
    }
};
