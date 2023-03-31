import prisma from '../lib/prisma';

export async function getMenu(locale = '') {
    let menuRow = null;

    if (locale) {
        const menu = await prisma.menus.findUnique({
            where: {
                language: locale,
            },
        });
        menuRow = menu;
    }

    return menuRow
        ? {
              data: JSON.parse(menuRow.links),
              id: menuRow.id,
              locale: menuRow.language,
          }
        : null;
}

export async function getMenus(locales = []) {
    // promises
    let promisesGettingAllMenus = locales.map(locale => getMenu(locale));

    // fetch all
    let menus = await Promise.all(promisesGettingAllMenus);

    // only get valid menu
    menus = menus.filter(menu => !!menu);

    return menus;
}

export async function setMenu(nextBlockContent = [], menuLocale) {
    const jsonData = JSON.stringify(nextBlockContent);

    const menu = await prisma.menus.update({
        where: {language: menuLocale},
        data: {links: jsonData},
    });

    return menu;
}
