import { Link } from "react-router-dom";
import { Button } from "../components/Buttons";

export function HomePage() {

    return <div className="h-screen w-screen  bg-gradient-to-t from-slate-900 to-gray-100">
        <div className="pt-20">
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
    </div>
}


// The Social Brain
// understand and interact with your social media.