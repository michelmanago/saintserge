// libs
import {useRouter} from 'next/router';
import React from 'react';
import {isHome} from '../../utils/utils';

const LanguageSwitcher = ({translations}) => {
    // hooks
    const {locales, locale, push, pathname, asPath} = useRouter();

    // utils
    const removeLocaleFromPathname = pathname => pathname.replace(new RegExp(`\/(?:${locales.join('|')})/?`, 'i'), '/');

    const redirectToTranslatedPage = (url, selectedLocale) => {
        let originWithNewLocale = url.origin + '/' + selectedLocale;
        let cleanedPathname = removeLocaleFromPathname(url.pathname);
        let newUrl = originWithNewLocale + cleanedPathname;

        return newUrl;
    };

    const redirectToTranslatedHome = (url, selectedLocale) => {
        let originWithNewLocale = url.origin + '/' + selectedLocale;
        let newUrl = originWithNewLocale;

        return newUrl;
    };

    // methods
    const onSelectLangue = event => {
        // value
        let selectedLocale = event.target.value;

        // has selected the current locale (useless)
        if (selectedLocale === locale) {
            return;
        }

        let url = new URL(window.location);
        let newUrl = '';

        // if home
        // or not home but there is no translations
        if (isHome() || !translations) {
            push(asPath, asPath, {
                locale: selectedLocale,
            });
        }

        // if there is translations
        else {
            let requestedTranslation = translations.find(t => t.language === selectedLocale);

            if (requestedTranslation) {
                //newUrl = "/" + requestedTranslation.pageSlug
                newUrl = '/' + requestedTranslation.pageSlug.split('/')[1];
            } else {
                // switch current page to selected locale
                newUrl = redirectToTranslatedHome(url, selectedLocale);
            }
            console.log({newUrl});

            //push(newUrl);
            push(newUrl, newUrl, {locale: selectedLocale});
        }
    };

    return (
        <div className="flex justify-end">
            <select defaultValue={locale} onChange={onSelectLangue} className="px-2 py-1 mr-5 border rounded">
                {locales.map(locale => (
                    <option key={locale} value={locale}>
                        {locale.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
