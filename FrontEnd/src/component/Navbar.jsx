import React from 'react';


const Navbar = () => {
    return (
        <div className="w-full flex justify-between h-15 items-center bg-gray-200 shadow-md">
            <div className="w-[10%] flex h-full items-center  ">
                <h1 className='font-bold text-zinc-700 w-[10%] m-10'>RK</h1>
            </div>
            <div className="w-[50%] h-full">
                <ul className="w-full h-full flex gap-6 list-none items-center mr-10 font-medium">
                    <li className="text-gray-500 hover:text-gray-800 cursor-pointer"><a href="#">Home</a></li>
                    <li className="text-gray-500 hover:text-gray-800 cursor-pointer"><a href="#">About</a></li>
                    <li className="text-gray-500 hover:text-gray-800 cursor-pointer"><a href="#">Contact</a></li>
                    {/* <li className="text-gray-500 hover:text-gray-800 cursor-pointer"><a href="#"></a></li> */}

                </ul>

            </div>
        </div>
    );
};

export default Navbar;