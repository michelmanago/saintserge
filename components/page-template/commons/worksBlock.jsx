const WorksBlock = ({works}) => {
    return (
        <div>
            {works && works.filter(work => work.status === 'Done').length != 0 && (
                <div>
                    <h2>Travaux réalisés</h2>
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
                    <h2>Travaux en cours</h2>
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
                    <h2>Travaux à faire</h2>
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
