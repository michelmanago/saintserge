import {useEffect, useState} from 'react';
import IconArrowUp from '../../icons/IconArrowUp';
import IconArrowDown from '../../icons/IconArrowDown';
import Trash from '../../icons/trash';
import Popup from 'reactjs-popup';

export default function WorksEditor({content, setContent, originalPageId, addAttributedMedia}) {
    const [popupOpen, setPopupOpen] = useState(false);
    const addWork = () => {
        let newContent = [...content];
        newContent.push({
            status: 'toDo',
            label: '',
        });
        setContent(newContent);
    };
    return (
        <div>
            <div className="text-xl">Travaux</div>
            <div className="flex flex-col gap-2 mt-1 mb-2">
                <div className="flex flex-col gap-1">
                    {content &&
                        content.length > 0 &&
                        content.map((work, index) => (
                            <div className="flex flex-row items-center" key={index}>
                                <textarea
                                    className="w-full px-1 mx-1 border rounded"
                                    value={work.label}
                                    onChange={e => {
                                        e.preventDefault();
                                        let newContent = [...content];
                                        newContent[index].label = e.target.value;
                                        setContent(newContent);
                                    }}
                                    id="label"
                                />
                                <div className="flex flex-col gap-2">
                                    <select
                                        className={`px-1 mx-1 border rounded text-white ${
                                            work.status === 'toDo'
                                                ? 'bg-red-500'
                                                : work.status === 'Done'
                                                ? 'bg-green-500'
                                                : 'bg-yellow-500'
                                        }`}
                                        value={work.status}
                                        onChange={e => {
                                            e.preventDefault();
                                            let newContent = [...content];
                                            newContent[index].status = e.target.value;
                                            setContent(newContent);
                                        }}
                                    >
                                        <option value={'toDo'}>A Faire</option>
                                        <option value={'workInProgess'}>En cours</option>
                                        <option value={'Done'}>Réalisé</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                </div>
                <Popup lockScroll={true} open={popupOpen} onClose={() => setPopupOpen(false)}>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row-reverse">
                            <button
                                className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                                onClick={() => setPopupOpen(false)}
                            >
                                Fermer
                            </button>
                        </div>
                        {content &&
                            content.length > 0 &&
                            content.map((work, index) => (
                                <div className="flex flex-row items-center" key={index}>
                                    <textarea
                                        className="w-full px-1 mx-1 border rounded"
                                        value={work.label}
                                        onChange={e => {
                                            e.preventDefault();
                                            let newContent = [...content];
                                            newContent[index].label = e.target.value;
                                            setContent(newContent);
                                        }}
                                        id="label"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <button
                                            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                            onClick={e => {
                                                e.preventDefault();
                                                if (window.confirm('voulez vous vraiment supprimer cet élément ?')) {
                                                    let newContent = [...content];
                                                    newContent.splice(index, 1);
                                                    setContent(newContent);
                                                }
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Popup>
                <div className="flex flex-col gap-2 place-self-center">
                    <button
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => setPopupOpen(true)}
                    >
                        Supprimer des éléments
                    </button>
                    <button
                        className="px-2 py-1 text-white bg-blue-700 rounded hover:bg-blue-800"
                        onClick={e => {
                            e.preventDefault();
                            addWork();
                        }}
                    >
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
}
