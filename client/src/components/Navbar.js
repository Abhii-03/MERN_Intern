import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate();

    const localStorageData = JSON.parse(localStorage.getItem("Profile"));
    const user_id = localStorageData?.user?._id;
    const user_name = localStorageData?.user?.name;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div>
        
            <nav className="bg-indigo-600 text-white py-3 px-16   shadow-md">

                <div className="flex justify-between ">
                    <div>
                        <img src="/dealsdraylogo.png" alt="logo" />
                    </div>
                    <div className="flex w-96 justify-between">
                        <div>
                            <Link
                                to="/dashboard"
                                className="hover:text-gray-200 transition duration-200"
                            >
                                Home
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/allEmployee"
                                className="hover:text-gray-200 transition duration-200"
                            >
                                Employee List
                            </Link>
                        </div>
                    </div>
                    <div className="flex w-96 justify-evenly">
                        <div>
                            <Link
                                
                                className="hover:text-gray-200 transition duration-200"
                            >
                                {user_name}
                            </Link>
                        </div>
                        <div>
                            <button
                                
                                onClick={handleLogout}
                                className="hover:text-gray-200 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;