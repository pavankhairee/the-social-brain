import { Link } from "react-router-dom";
import { Button } from "../components/Buttons";
import { YouTubeColor } from "../Icons/YoutubeIcon";
import { InstaIcon } from "../Icons/Instagram";
import { PinterestIcon } from "../Icons/Pinterest";
import { LinkdenIcon } from "../Icons/Linkden";
import { TwitterColor } from "../Icons/TwitterIcon";
import { Spotify } from "../Icons/Spotify";

export function HomePage() {

    return <div className="h-screen w-screen  bg-gradient-to-t from-slate-900 to-gray-100">
        <div className="pt-10">
            <div className="text-5xl font-bold flex justify-center  ">
                The <span className="pl-2 pr-2 bg-sky-400 rounded-bl-full rounded-tr-full">Social</span> Brain
            </div>
            <div className="flex justify-around text-4xl pt-2">
                understand and interact with your social media.
            </div>
        </div>
        <div className="flex justify-center">
            <div className="text-2xl pt-4">
                <Link to="/Signup">
                    <Button variant="primary" size={"md"} text={"Get Started"}></Button>
                </Link>
            </div>
        </div>
        <div className="flex justify-center text-center pt-4 text-cyan-50 text-xl">
            Managing multiple social media accounts can be overwhelming.<br />
            Social Brain simplifies your digital life by aggregating all your social media posts, links, and interactions in one place.
        </div>
        <div className="flex gap-2 justify-center">
            <TwitterColor />
            <YouTubeColor />
            <InstaIcon />
            <PinterestIcon />
            <Spotify />
        </div>
        <div className="flex justify-center gap-5">
            <div className="w-50 h-50 border-2 border-solid bg-amber-100">1</div>
            <div className="w-50 border-2 border-solid bg-amber-200">2</div>
            <div className="w-50 border-2 border-solid bg-amber-300">3</div>
            <div className="w-50 border-2 border-solid bg-amber-400">4</div>
            <div className="w-50 border-2 border-solid bg-amber-600">5</div>
        </div>
    </div>
}


// The Social Brain
// understand and interact with your social media.