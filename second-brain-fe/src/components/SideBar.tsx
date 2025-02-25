import { AcdLogo } from "../Icons/AcdLogo";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SideBarItems } from "./SidebarItem";


export function SideBar() {

    return <div className="h-screen bg-white border-r w-50 fixed left-0 top-0 pl-6 ">
        <div className="flex text-2xl pt-4 items-center">
            <div className="pr-2"><AcdLogo /></div>Social Brain</div>
        <div><SideBarItems icons={<TwitterIcon />} text={"Tweets"} /></div>
        <div><SideBarItems icons={<YoutubeIcon />} text={"YouTube"} /></div>
    </div>
}
