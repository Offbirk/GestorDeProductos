import { Footer } from "flowbite-react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const FooterTemplate = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full z-10">
            <Footer bgDark className="fixed bottom-0 w-full">
                <div className="w-full">
                    <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright href="#" by="Brayan Samboni" year={2025} />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon href="https://www.linkedin.com/in/brayan-samboni-martinez/" icon={BsLinkedin} />
                            <Footer.Icon href="https://github.com/Offbirk" icon={BsGithub} />
                            <Footer.Icon href="#" icon={BsTwitter} />
                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    );
}

export default FooterTemplate;