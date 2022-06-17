import {useRouter} from 'next/router';
import {useState} from 'react';
import {fetchWrapper} from '../../../utils/utils';

const ContactBlock = () => {
    const router = useRouter();
    const {locale} = router;
    const [isSend, setIsSend] = useState(false);
    const submitForm = async e => {
        e.preventDefault();
        const {name, email, content} = e.target;
        console.log({name: name.value, email: email.value, content: content.value});

        const res = await fetchWrapper(
            '/api/contact',
            {name: name.value, email: email.value, content: content.value},
            'POST',
        );
        if (res.status === 200) {
            console.log('send');
        }
    };
    return (
        <div className="flex flex-col gap-1 capitalize">
            <h2 className="capitalize">
                {locale === 'fr' ? 'Nous contacter' : locale === 'en' ? 'Contact Us' : 'связаться с нами'}
            </h2>
            <form className="flex flex-col gap-1" onSubmit={submitForm}>
                <div className="flex flex-col items-center gap-2 md:flex-row">
                    <label htmlFor="name" className="w-1/6 px-1 text-center capitalize">
                        {locale === 'fr' ? 'Nom' : locale === 'en' ? 'Name' : 'имя'}
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-1 border border-black rounded md:w-5/6 "
                        required
                    />
                </div>
                <div className="flex flex-col items-center gap-2 md:flex-row">
                    <label htmlFor="email" className="w-1/6 px-1 text-center">
                        {locale === 'fr' ? 'Courriel' : locale === 'en' ? 'Email' : 'Электронная почта'}
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="w-full p-1 border border-black rounded md:w-5/6"
                        required
                    />
                </div>
                <textarea id="content" className="p-1 border border-black rounded h-80" />
                <div className="flex flex-row justify-center">
                    <button type="submit" className="p-2 text-white rounded cursor-pointer bg-pred">
                        {locale === 'fr' ? 'Envoyer' : locale === 'en' ? 'Send' : 'Отправить'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactBlock;
