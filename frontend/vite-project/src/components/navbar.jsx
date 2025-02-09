import React, {} from "react"; // Import useState for managing username
import "../App.css"


const Navbar = () => {

    return (
        <div>
            <nav className="bg-purple-700 py-3 px-6 shadow-lg flex justify-between items-center"> {/* Flex container for navbar */}
                <h1 className="flex-1 text-center font-bold font-serif text-white text-4xl tracking-wider">
                    Samsthiti-Design-Studio
                </h1>

                <div className="flex items-center"> {/* Align items in the profile section */}
                    {/* <FaRegUser className="h-8 w-8 text-white" /> Profile icon */}
                </div>
                
            </nav>
        </div>
    );
};

export default Navbar;
