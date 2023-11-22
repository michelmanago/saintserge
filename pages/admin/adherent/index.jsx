import {useState} from 'react';
import {searchAdherenPaging} from '../../../dao/adherent';
import Header from '../../../components/header/header';
import {getSession} from 'next-auth/client';
import {getMenu} from '../../../model/menu';
import Head from 'next/head';

export default function AdherentAdminList({menu, adherents}) {
    const [adherentsState, setAdherentsState] = useState(adherents.adherents);
    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Liste des adhérents</title>
            </Head>
            {menu && <Header menu={menu.data} />}
            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                <div className="border rounded">
                    <div className="grid grid-cols-12 gap-2 px-2 py-3 font-bold capitalize border-b">
                        <div className="col-span-2">nom</div>
                        <div className="col-span-2">prenom</div>
                        <div className="col-span-6">email</div>
                        <div>abonné</div>
                    </div>
                    {adherentsState?.map(adh => (
                        <div className="grid grid-cols-12 gap-2 px-2 py-3 border-b" key={adh.id}>
                            <div className="col-span-2 capitalize">{adh.nom ? adh.nom : '/'}</div>
                            <div className="col-span-2 capitalize">{adh.prenom ? adh.prenom : '/'}</div>
                            <div className="col-span-6">{adh.email}</div>
                            <div>{adh.news ? 'oui' : 'non'}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const {req, locale} = ctx;
    const session = await getSession({req});

    if (!session)
        return {
            redirect: {
                permanent: false,
                destination: '/login?redirect=admin',
            },
        };

    const menu = await getMenu(locale);
    const adherents = await searchAdherenPaging({});

    return {
        props: {
            menu,
            adherents,
        },
    };
}
