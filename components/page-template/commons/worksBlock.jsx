import {useRouter} from 'next/router';

const WorksBlock = ({works}) => {
    const {locale} = useRouter();
    return (
        <div>
            {works && works.filter(work => work.status === 'Done').length != 0 && (
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <img src="/static/img/feu_tricolore_green.png" className="h-16" />
                        <h2>
                            {locale === 'fr'
                                ? 'Travaux réalisés'
                                : locale === 'en'
                                ? 'Work Completed'
                                : 'Осуществленные работы'}
                        </h2>
                    </div>
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
                    <div className="flex flex-row items-center gap-2">
                        <img src="/static/img/feu_tricolore_yellow.png" className="h-16" />
                        <h2>
                            {locale === 'fr'
                                ? 'Travaux en cours'
                                : locale === 'en'
                                ? 'Work in Progress'
                                : 'Ведущиеся работы'}
                        </h2>
                    </div>
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
                    <div className="flex flex-row items-center gap-2">
                        <img src="/static/img/feu_tricolore_red.png" className="h-16" />
                        <h2>
                            {locale === 'fr'
                                ? 'Travaux à faire'
                                : locale === 'en'
                                ? 'Work to Be Done'
                                : 'Необходимые работы, которые осталось провести'}
                        </h2>
                    </div>
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
