import React from 'react';

const MentorDetail: React.FC = () => {
    return (
        <section className="py-10 font-poppins dark:bg-gray-800 ">
            <div className="max-w-6xl px-4 mx-auto">
                <div className="flex flex-wrap mb-24 -mx-4">
                    <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                        <div className="sticky top-0 overflow-hidden ">
                            <div className="relative mb-6 lg:mb-10 lg:h-96">
                                <a className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2" href="#">
                                    {/* Add your SVG content for the left arrow */}
                                </a>
                                <img className="object-contain w-full lg:h-full" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt="" />
                                <a className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#">
                                    {/* Add your SVG content for the right arrow */}
                                </a>
                            </div>
                            <div className="flex-wrap hidden -mx-2 md:flex">
                                {/* Add product images */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                        <div className="lg:pl-20">
                            <div className="mb-6">
                                <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                    Mentor/Expert
                                </span>
                                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                    Name: Swapnil Tiwari
                                </h2>
                                <div className="flex flex-wrap items-center mb-6">
                                    <ul className="flex mb-4 mr-2 lg:mb-0">
                                        {/* Add your star icons */}
                                    </ul>
                                    <a className="mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#">
                                        View Profile
                                    </a>
                                </div>
                                {/* <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                    <span>Rs.7,000.00</span>
                                    <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">Rs.10,000.00</span>
                                </p> */}
                            </div>
                            <div className="mb-6">
                                <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Mentor/Expert Details</h2>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                                    <div className="p-3 lg:p-5">
                                        <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                                            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                                <div className="w-full mb-4 md:w-2/5">
                                                    <div className="flex">
                                                        <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                            {/* Add your SVG content for the number of cores */}
                                                        </span>
                                                        <div>
                                                            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                School Stream
                                                            </p>
                                                            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                Science
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full mb-4 md:w-2/5">
                                                    <div className="flex">
                                                        <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                            {/* Add your SVG content for the graphics */}
                                                        </span>
                                                        <div>
                                                            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                Bachelors
                                                            </p>
                                                            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                B.Tech
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full mb-4 md:w-2/5">
                                                    <div className="flex">
                                                        <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                            {/* Add your SVG content for the RAM */}
                                                        </span>
                                                        <div>
                                                            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                Masters
                                                            </p>
                                                            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                M.Tech
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full mb-4 md:w-2/5">
                                                    <div className="flex">
                                                        <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                            {/* Add your SVG content for the storage */}
                                                        </span>
                                                        <div>
                                                            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                Country
                                                            </p>
                                                            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                India
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Description :</h2>
                                <p className="text-base text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur molestiae repudiandae neque ullam modi eos libero vel magni saepe totam obcaecati ut, dolorum, sit, tempore nisi blanditiis nostrum deleniti ipsa!
                                </p>
                            </div>
                            {/* <div className="mb-6">
                                <h2 className="mb-4 text-lg font-bold text-gray-700 dark:text-gray-400">Highlights :</h2>
                                <ul className="space-y-2 list-inside list-disc text-gray-500 dark:text-gray-400">
                                    <li>12 cores and 16 threads for exceptional performance.</li>
                                    <li>Nvidia GForce RTX 3080 graphics for top-tier gaming.</li>
                                    <li>16 GB of RAM ensures smooth multitasking.</li>
                                    <li>Ample storage with a 1TB SSD + 1TB HDD combo.</li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentorDetail;
