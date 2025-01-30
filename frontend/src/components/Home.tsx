import YouTube from 'react-youtube';
import ProductsNavbar from '../navbar/Navbar';

const Home = () => {
    return (
        <>
        <ProductsNavbar />
        <div className='flex justify-center items-center'>
            <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl'>
                <YouTube
                    videoId="bAy_PcJ767o"
                    title="Video de YouTube"
                    className="w-full h-auto"
                />
            </div>
        </div>
        </>
    );
};

export default Home;