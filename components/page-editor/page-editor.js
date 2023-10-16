// libs
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

// utils
import cleanForSlug from '../../utils/cleanForSlug';
import getAvailableSlug from '../../utils/fetch/getAvailableSlug';
import {pageFormat} from '../../utils/page-editor-formats';

// components
import InputSlug from './inputs/InputSlug';
import PageEditorSidebar from './sidebar/page-editor-sidebar';
import BlockList from './blocks/BlockList';

// helpers
const getSlugWithoutLocale = (slugsWithLocale, langue) => slugsWithLocale.replace(langue + '/', '');
const pagesWithSlugsWithoutLocale = pages =>
    pages.map(page => ({...page, pageSlug: getSlugWithoutLocale(page.pageSlug, page.language)}));

// create the editable slug with no locale
const pagesWithSlugsWithoutLocales = pages =>
    pages.map(page => ({...page, slugWithoutLocale: page.pageSlug.replace(page.language + '/', '')}));

const isTitleEmpty = title => !title || !title.replace(/\s/g, '').length;

// styles
const sidebarStyles = {
    maxWidth: 400,
};

export default function PageEditor({onFormSubmitted, editedPages, categories, defaultType}) {
    // hooks
    const {locales, defaultLocale} = useRouter();

    // States
    // form
    const [pages, setPages] = useState(
        editedPages ? pagesWithSlugsWithoutLocales(editedPages) : locales.map(_locale => pageFormat(_locale)),
    );
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attributedMedia, setAttributedMedia] = useState([]);

    // utils

    const notAllowedToSave = () => {
        // one translations empty
        let allTitlesAreEmpty = pages.every(page => isTitleEmpty(page.pageName));

        return allTitlesAreEmpty ? true : false;
    };

    const canSave = !notAllowedToSave();

    useEffect(() => {
        pages.forEach(page => {
            if (defaultType && page.page != defaultType) page.page = defaultType;
        });
        console.log({currentPage});
    }, []);
    // lifecycle
    useEffect(() => {
        if (canSave && !isEditing) {
            // Prevent leaving page without saving
            window.onbeforeunload = () => "Êtes vous sûr de vouloir quitter l'éditeur ?";
        } else {
            window.onbeforeunload = null;
        }
    }, [canSave]);

    const isEditing = !!editedPages;
    const currentPage = pages[currentPageIndex];
    const updateCurrentPage = values => {
        if (pages && pages.length) {
            setPages(
                pages.map((page, pageIndex) => {
                    if (pageIndex === currentPageIndex) {
                        return {
                            ...currentPage,
                            ...values,
                        };
                    } else {
                        return page;
                    }
                }),
            );
        }
    };

    const updatePages = (values = {}) => {
        console.log({values});
        if (pages && pages.length) {
            setPages(
                pages.map(page => {
                    return {
                        ...page,
                        ...values,
                    };
                }),
            );
        }
    };

    const addAttributedMedia = media_id => {
        setAttributedMedia([...attributedMedia, media_id]);
    };

    const removeAttributedMedia = media_id => {
        setAttributedMedia(attributedMedia.filter(id => id !== media_id));
    };

    const generateEmptyTitles = form => {
        let output = [];

        const pagesWithNoTitle = form.filter(page => isTitleEmpty(page.pageName));

        if (pagesWithNoTitle.length === pages.length) {
            const title = 'Brouillon';

            output = form.map(page => ({
                ...page,
                pageName: title,
                pageSlug: page.language + '/' + cleanForSlug(title),
            }));
        } else if (pagesWithNoTitle.length) {
            const firstPageWithTitle = form.find(page => !isTitleEmpty(page.pageName));
            const firstPageWithTitleId = firstPageWithTitle.id || firstPageWithTitle.temp_id;

            output = form.map(page => {
                // when creating page there is no page.id
                const id = page.id || page.temp_id;

                if (id === firstPageWithTitleId) {
                    return firstPageWithTitle;
                } else if (isTitleEmpty(page.pageName)) {
                    return {
                        ...page,
                        pageName: firstPageWithTitle.pageName,
                        pageSlug: page.language + '/' + cleanForSlug(firstPageWithTitle.slugWithoutLocale),
                    };
                } else {
                    return page;
                }
            });
        } else {
            output = form;
        }

        return output;
    };

    const checkSlugsAtTheEnd = async form => {
        const output = [...form];

        // slugs that might be generated by title and that already exists in database
        const mightBeDirtySlugs = [];

        form.forEach((page, pageIndex) => {
            if (!isEditing || editedPages[pageIndex].pageSlug !== page.pageSlug) {
                mightBeDirtySlugs.push({
                    index: pageIndex,
                    slug: page.pageSlug,
                });
            }
        });

        // check

        const promises = mightBeDirtySlugs.map(slugItem =>
            getAvailableSlug(slugItem.slug).then(checkedSlug => {
                return {index: slugItem.index, slug: checkedSlug};
            }),
        );

        const checkedSlugs = await Promise.all(promises);

        checkedSlugs.forEach(slugItem => {
            output[slugItem.index].pageSlug = slugItem.slug;
        });

        return output;
    };

    // methods

    const onRemoveMedia = () => {
        setPages(
            pages.map(page => ({
                ...page,
                bandeau_id: null,
            })),
        );
    };

    const onMediaUploaded = media => {
        // add bandeau
        setPages(
            pages.map(page => ({
                ...page,
                bandeau_id: media.id,
            })),
        );

        // add to attributed media
        setAttributedMedia([...attributedMedia, media.id]);
    };

    const onRemovePage = () => {
        if (confirm('Êtes vous sûr de vouloir supprimer cette page et ses traductions.')) {
            const originalPage = editedPages.find(p => p.language === defaultLocale);
            const id = originalPage ? originalPage.id : null;

            if (id) {
                fetch('/api/page/' + id, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error(response.statusText);
                        }
                    })
                    .then(body => {
                        // go back page list
                        window.location = window.location.origin + '/admin/page';
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };

    const onSubmitPage = async () => {
        let form = [...pages];

        setIsSubmitting(true);

        // generate empty titles
        form = generateEmptyTitles(form);

        // check slugs
        form = await checkSlugsAtTheEnd(form);

        // send pages to form
        try {
            await onFormSubmitted(form, attributedMedia);
        } catch (err) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // others
    const languagesLists = locales.map(_locale => ({title: _locale.toUpperCase(), value: _locale}));
    const originalPageId = editedPages ? editedPages[0].id : null;

    // setters
    const setSlug = value =>
        updateCurrentPage({pageSlug: currentPage.language + '/' + value, slugWithoutLocale: value});
    const setTitle = e => {
        // only sync slug when creating page
        if (isEditing) {
            updateCurrentPage({pageName: e.target.value});
        } else {
            const cleanedSlug = cleanForSlug(e.target.value);
            updateCurrentPage({
                pageName: e.target.value,
                pageSlug: currentPage.language + '/' + cleanedSlug,
                slugWithoutLocale: cleanedSlug,
            });
        }
    };

    // listeners
    const onChangeLanguage = value => setCurrentPageIndex(languagesLists.findIndex(v => v.value === value));

    return (
        <div className="px-10 py-10 mx-auto bg-white border">
            <div className="flex p-8 gap-x-8">
                {/* Left */}
                <div className="flex-1 w-2/3">
                    {/* Mode de page */}
                    <h1 className="mb-5 text-4xl font-bold">
                        {isEditing ? 'Modifier la page' : 'Ajouter une nouvelle page'}
                    </h1>

                    {/* Input - Title */}
                    <input
                        onChange={setTitle}
                        value={currentPage.pageName}
                        className="w-full px-5 py-4 mb-5 text-xl border rounded"
                        type="text"
                        placeholder="Titre de la page"
                    />

                    {/* Input - Slug */}
                    {currentPage.pageSlug && (
                        <InputSlug
                            currentLanguage={currentPage.language}
                            originalSlug={editedPages ? editedPages[currentPageIndex].pageSlug : ''}
                            slug={currentPage.pageSlug}
                            slugWithoutLocale={currentPage.slugWithoutLocale}
                            setSlug={setSlug}
                        />
                    )}

                    {/* Content blocks */}
                    <BlockList
                        blockList={currentPage.blocks}
                        updateCurrentPage={updateCurrentPage}
                        originalPageId={originalPageId}
                        pages={pages}
                        setPages={setPages}
                        currentPage={currentPage}
                        addAttributedMedia={addAttributedMedia}
                    />
                </div>

                {/* Right */}
                <div style={sidebarStyles} className="w-1/3">
                    <PageEditorSidebar
                        updateCurrentPage={updateCurrentPage}
                        updatePages={updatePages}
                        addAttributedMedia={addAttributedMedia}
                        removeAttributedMedia={removeAttributedMedia}
                        isEditing={isEditing}
                        originalPageId={originalPageId}
                        source={currentPage.source}
                        language={currentPage.language}
                        languagesLists={languagesLists}
                        pageSlug={currentPage.pageSlug}
                        author={currentPage.author}
                        category={currentPage.page ? currentPage.page : defaultType}
                        created_at={currentPage.created_at}
                        last_modified={currentPage.last_modified}
                        pagePermalien={currentPage.pageSlug}
                        bandeau_id={currentPage.bandeau_id}
                        onSubmit={onSubmitPage}
                        onRemovePage={onRemovePage}
                        isSubmitting={isSubmitting}
                        onMediaUploaded={onMediaUploaded}
                        onRemoveMedia={onRemoveMedia}
                        onChangeLanguage={onChangeLanguage}
                        notAllowedToSave={!canSave}
                        categories={categories}
                        draft={currentPage.draft}
                    />
                </div>
            </div>
        </div>
    );
}

PageEditor.NOT_ALLOWED_TO_SAVE = {
    TRANSLATIONS_EMPTY: 'TRANSLATIONS_EMPTY',
};
