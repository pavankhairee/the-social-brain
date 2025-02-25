import { InstagramEmbed, PinterestEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { CardProps } from "./Card";


export function ShareCard(CardProps: CardProps) {
    return <div>

        <div className="p-4 rounded-md bg-white shadow-md outline-slate-400 max-w-80 border-gray-200 border">
            <div className="flex justify-between max-w-72">
                <div className="flex items-center text-md font-bold">
                    <div className="pr-2"> <DocumentIcon size="md" /></div>
                    {CardProps.title}
                </div>
            </div>

            <div className="p-1">
                {/* {type == "youtube" && <iframe className="w-full" src={link.replace("watch", "embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} */}

                {CardProps.type === "youtube" && <YouTubeEmbed url={CardProps.link} width={300} height={220}></YouTubeEmbed>}
                {CardProps.type === "twitter" && <XEmbed url={CardProps.link} width={250} height={250}></XEmbed>}
                {CardProps.type === "pinterest" && <PinterestEmbed url={CardProps.link} width={250} height={250}></PinterestEmbed>}
                {CardProps.type === "instagram" && <InstagramEmbed url={CardProps.link} width={328} height={350} ></ InstagramEmbed>}
                {CardProps.type === "links" && (<a className="inline-block w-48 h-12 text-center leading-[3rem] bg-gray-300 hover:bg-gray-400 rounded-lg"
                    href={CardProps.link} target="_blank">Random Link</a>)}
            </div>
        </div>
    </div>
}