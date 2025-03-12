import axios from "axios";
import { DeleteIcon } from "../Icons/Deleteicon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { ShareIcon } from "../Icons/PlusIcon";
import { BACKEND_URL } from "../config";
import { InstagramEmbed, PinterestEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed";
import { LinkIcon } from "../Icons/LinkIcon";

export interface CardProps {
    contentId: string,
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "facebook" | "pinterest" | "spotify" | "links";
}


export function Card({ title, link, type, contentId }: CardProps) {
    async function onDelete(id: string) {
        const response = await axios.delete(`${BACKEND_URL}/api/content/delete${contentId}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        return response
    }

    return <>

        <div className="p-4 gap-4 rounded-md w-fit h-fit bg-white shadow-md outline-slate-400  border-gray-200 border">
            <div className="flex justify-between  max">
                <div className="flex items-center text-md font-bold">
                    <div className="pr-2"> <DocumentIcon size="md" /></div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500 cursor-pointer" >
                        <ShareIcon size="md" />
                    </div>
                    <div onClick={() => onDelete(contentId)} className="text-gray-500 cursor-pointer"><DeleteIcon size="md" /></div>
                </div>
            </div>

            <div className="pt-2 ">

                {type === "youtube" && <YouTubeEmbed url={link} width={300} height={250}></YouTubeEmbed>}
                {type === "twitter" && <XEmbed url={link} width={250} height={250}></XEmbed>}
                {type === "pinterest" && <PinterestEmbed url={link} width={250} height={250}></PinterestEmbed>}
                {type === "instagram" && <InstagramEmbed url={link} width={350} height={400} ></ InstagramEmbed>}
                {type === "links" && (<a className="inline-grid justify-center pt-5 w-63 h-62.5 text-center leading-[3rem] bg-gray-300 hover:bg-gray-400 rounded-lg"
                    href={link} target="_blank">{title}<LinkIcon size="img"></LinkIcon></a>)}
                {type === "spotify" && <iframe src={link.replace('spotify.com/', 'spotify.com/embed/').split('?')[0]} width={300} height={380}></iframe>}

            </div>

        </div >
    </>
}