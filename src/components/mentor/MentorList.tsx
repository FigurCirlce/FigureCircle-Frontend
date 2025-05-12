import React, { useState, useRef } from 'react';
import MentorDetail from './MentorDetail';


const Modal = ({ onClose }: any) => {
    const modalContentRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalContentRef.current && modalContentRef.current.contains(e.target as HTMLElement)) {
            return;
        }

        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={handleBackdropClick}
        >
            <div ref={modalContentRef} className='bg-[white]'>
                <MentorDetail />
               

            </div>
        </div>
    );
};

export const MentorList = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    // const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div>
            <div className="flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="block mt-2 w-[25rem] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                />
            </div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="grid gap-8 row-gap-5 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                            <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                            <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                            <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                            <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                            <div className="relative p-5 bg-white rounded-sm">
                                <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                                    <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-indigo-50 lg:mb-0">
                                        {/* SVG Icon */}
                                    </div>
                                    <h6 className="font-semibold leading-5">Title {item}</h6>
                                </div>
                                <p className="mb-2 text-sm text-gray-900">
                                    Description for item {item}.
                                </p>
                                <a
                                    href="/view-expert"

                                    className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                >
                                    Learn more
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && <Modal onClose={closeModal} />}
        </div>
    );
};
