import axios from "axios";
import { DeleteIcon } from "../Icons/Deleteicon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { ShareIcon } from "../Icons/PlusIcon";
import { BACKEND_URL } from "../config";
import { InstagramEmbed, PinterestEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed";

export interface CardProps {
    contentId: string,
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "facebook" | "pinterest" | "linkedin";
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

    return <div>

        <div className="p-4 rounded-md bg-white shadow-md outline-slate-400 max-w-80 border-gray-200 border">
            <div className="flex justify-between max-w-72">
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

            <div className="pt-4">
                {/* {type == "youtube" && <iframe className="w-full" src={link.replace("watch", "embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} */}

                {type === "youtube" && <YouTubeEmbed url={link} width={300} height={220}></YouTubeEmbed>}
                {type === "twitter" && <XEmbed url={link} width={250} height={250}></XEmbed>}
                {type === "pinterest" && <PinterestEmbed url={link} width={250} height={250}></PinterestEmbed>}
                {type === "instagram" && <InstagramEmbed url={link} width={328} height={350} ></ InstagramEmbed>}

            </div>
        </div>
    </div>
}