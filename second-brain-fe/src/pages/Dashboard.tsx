import { useEffect, useState } from "react"
import { SideBar } from "../components/SideBar"
import { CreateContentModel } from "../components/AddContentModel"
import { Button } from "../components/Buttons"
import { AddIcons, ShareIcon } from "../Icons/PlusIcon"
import { Card } from "../components/Card"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { DeleteIcon } from "../Icons/Deleteicon"
import { SearchBar } from "../components/SearchBar"


export function Dashboard() {

    async function onShare() {

        const response = await axios.post(`${BACKEND_URL}/api/brain/share`, {
            share: true
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        const sharehash = `${response.data.hash}`

        await navigator.clipboard.writeText(`${window.location.origin}/api/brain/${sharehash}`);


    }

    async function onDelete() {
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
    const [selectedType, setSelectedType] = useState(null);
    const content = useContent();

    return (
        <div >
            <div>
                <SideBar onSelectType={setSelectedType} />
            </div>
            <div className={`p-4 ml-50 min-h-screen bg-gray-200 transition-opacity duration-300 `}>
                <CreateContentModel open={openModel} onClose={() => { setOpenModel(false) }} />

                <div className='flex justify-between '>
                    <div className="text-2xl font-bold">Social Board</div>
                    <div className="flex gap-4 justify-self-center">
                        <SearchBar />
                        <Button variant="secondary" onClick={() => { setOpenModel(true) }} startIcon={<AddIcons size='lg' />} size="md" text='Add Content'></Button>
                        <Button variant="secondary" startIcon={<DeleteIcon size="lg" />} showCopiedText={true} showText="Delete All" onClick={onDelete} size="md" text="Delete" ></Button>
                        <Button variant="primary" showCopiedText={true} startIcon={<ShareIcon size="md" />} size="md" text='Share Brain'
                            onClick={onShare} showText="Copied Link"
                        ></Button>
                    </div>
                </div>

                <div className={`flex-wrap flex gap-4 pt-2 ${openModel ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    {content.filter(({ type }) => !selectedType || type === selectedType).length > 0 ? (
                        content
                            .filter(({ type }) => !selectedType || type === selectedType)
                            .map(({ title, type, link, _id }) => (
                                <Card key={_id} type={type} title={title} link={link} contentId={_id} />
                            ))
                    ) : (
                        <div className="text-gray-500 text-lg w-full text-center mt-4">No posts available</div>
                    )}

                </div>
            </div>
        </div>
    )
}
