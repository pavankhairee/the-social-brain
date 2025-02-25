import { useEffect, useState } from "react"
import { SideBar } from "../components/SideBar"
import { CreateContentModel } from "../components/AddContentModel"
import { Button } from "../components/Buttons"
import { AddIcons, ShareIcon } from "../Icons/PlusIcon"
import { Card } from "../components/Card"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { LinkedInEmbed } from "react-social-media-embed"
import { LinkIcon } from "../Icons/LinkIcon"
import { CrossIcon } from "../Icons/CrossIcon"


export function Dashboard() {
    async function onShare() {

        const reponse = await axios.post(`${BACKEND_URL}/api/brain/share`, {
            share: true
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        const sharehash = `${reponse.data.hash}`

        await navigator.clipboard.writeText(`${window.location.origin}/api/brain/${sharehash}`);

    }

    async function onDelete() {
        alert("Content is delete")
        const response = await axios.delete(`${BACKEND_URL}/api/content/deleteall`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        useEffect(() => {
            const interval = setInterval(() => {
                onDelete
            }, 1000);
            clearInterval(interval)
        });

        return response

    }

    const [openModel, setOpenModel] = useState(false);
    const content = useContent();

    return (
        <div >
            <div>
                <SideBar />
            </div>
            <div className='p-4 ml-50 min-h-screen bg-gray-200'>
                <CreateContentModel open={openModel} onClose={() => { setOpenModel(false) }} />

                <div className='flex justify-between'>
                    <div className="text-2xl font-bold">All Notes</div>
                    <div className="flex gap-4">

                        <Button variant="secondary" onClick={() => { setOpenModel(true) }} startIcon={<AddIcons size='lg' />} size="md" text='Add Content'></Button>
                        <Button variant="secondary" onClick={onDelete} size="md" text="Delete" ></Button>
                        <Button variant="primary" startIcon={<ShareIcon size="md" />} size="md" text='Share Brain'
                            onClick={onShare}
                        ></Button>

                    </div>
                </div>

                <div className='flex-wrap flex gap-4 pt-2'>
                    {content.map(({ title, type, link, _id }) => <Card type={type} title={title} link={link} contentId={_id} />)}


                </div>
            </div>
        </div>
    )
}
