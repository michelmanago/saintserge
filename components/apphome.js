import useTranslation from "next-translate/useTranslation"

export default function AppHome () {

    const {t} = useTranslation()

    return (
        <div className="bg-pwhite">
            <div className="container sm:mx-auto bg-white max-w-screen-xl">
                <main className="bg-white pt-4 px-5 sm:px-10">
                   <h2 className="">La colline Saint-Serge</h2>
 
                    <p className="pb-2">{t("home:paragraph_1")}</p>
                    <p className="pb-2">{t("home:paragraph_2")}</p>
                </main>
            </div>
        </div>
	)
}
