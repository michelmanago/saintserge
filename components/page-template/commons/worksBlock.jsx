import {useRouter} from 'next/router';

const WorksBlock = ({works}) => {
    const {locale} = useRouter();
    return (
        <div>
            {works && works.filter(work => work.status === 'Done').length != 0 && (
                <div>
                    <h2>
                        {locale === 'fr'
                            ? 'Travaux réalisés'
                            : locale === 'en'
                            ? 'Work Completed'
                            : 'Осуществленные работы'}
                    </h2>
                    <ul>
                        {works &&
                            works
                                .filter(work => work.status === 'Done')
                                .map((work, index) => <li key={index}>{work.label}</li>)}
                    </ul>
                </div>
            )}
            {works && works.filter(work => work.status === 'workInProgess').length != 0 && (
                <div>
                    <h2>
                        {locale === 'fr'
                            ? 'Travaux en cours'
                            : locale === 'en'
                            ? 'Work in Progress'
                            : 'Ведущиеся работы'}
                    </h2>
                    <ul>
                        {works
                            .filter(work => work.status === 'workInProgess')
                            .map((work, index) => (
                                <li key={index}>{work.label}</li>
                            ))}
                    </ul>
                </div>
            )}

            {works && works.filter(work => work.status === 'toDo').length != 0 && (
                <div>
                    <h2>
                        {locale === 'fr'
                            ? 'Travaux à faire'
                            : locale === 'en'
                            ? 'Work to Be Done'
                            : 'Необходимые работы, которые осталось провести'}
                    </h2>
                    <ul>
                        {works
                            .filter(work => work.status === 'toDo')
                            .map((work, index) => (
                                <li key={index}>{work.label}</li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WorksBlock;
