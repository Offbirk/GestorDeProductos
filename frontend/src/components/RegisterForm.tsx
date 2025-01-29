import React from "react";
import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate} from "react-router-dom";
import { Modal } from "flowbite-react";
import AlertCustom from "../alert/AlertCustom";

const UserForm = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [openModal, setOpenModal] = useState(false);
    const [alert, setAlert] = useState<{message: string, type: "success" | "failure" | null}>({ message: "", type: null});
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await apiClient.post('/api/users/auth/register', values);
            setAlert({message: 'User registered successfully', type: "success"});
            setOpenModal(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setAlert({message: 'An error occurred while registering the user', type: "failure"});
            setOpenModal(true);
            console.error("Error response: ", error);
        }
    };

    return(  
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Register
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" name="username" id="name" onChange={(e) => setValues({ ...values, username: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nickname" required={true} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setValues({ ...values, email: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e) => setValues({ ...values, password: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={false} />
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>                        
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                </form>
            </div>
        </div>
    </div>
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
            <AlertCustom alert={alert} setAlert={setAlert} />
        </Modal.Body>
    </Modal>
  </section>
    );
};

export default UserForm;