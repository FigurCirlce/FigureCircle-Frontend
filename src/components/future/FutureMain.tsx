import { useEffect, useState } from "react";
import Recom from "./Recom";



interface FutureMainProps {
    infoData: any;
    setInfoData2: any;
    threeData: any;
    infoGetValue: any;
    infoData2: any;
    degree: any
}

export const FutureMain: React.FC<FutureMainProps> = ({ infoData, setInfoData2, degree }: any) => {
    console.log("futuremain", infoData)


    const [data, setData] = useState<any>();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    useEffect(() => {
        if (infoData) {
            try {
                // const parsedData = JSON.parse(infoData);
                setData(infoData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [infoData]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data?.filter((item: any) => {
        return item.toLowerCase().includes(searchQuery.toLowerCase());
    });


    const handleCardClick = (i: any) => {
        setInfoData2(i)
        setTimeout(() => {
            // window.location.href = '/'
        }, 3000)
    }

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
        } else {
            setSuggestions(
                data?.filter((item: any) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 5) // Limit to 5 suggestions
            );
        }
    }, [searchQuery, data]);


    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion); // Set the clicked suggestion as the input value
        setSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="relative flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="block mt-2 w-[25rem] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    {/* Auto-Suggestion Dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute top-12 bg-white border border-gray-300 w-[25rem] rounded-lg shadow-lg z-10">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white mb-[1rem]">
                    Recommendation <br />
                    <span className="underline decoration-blue-500">According to your details</span>
                </h1>
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 h-[40vh] overflow-y-auto scrollbar-hide">
                    <div className="grid gap-8 row-gap-5 lg:grid-cols-3">
                        {filteredData?.map((i: any, index: number) => {
                            return (
                                <div key={index} className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                                    <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                                    <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                                    <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                                    <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                                    <div className="relative p-5 bg-white rounded-sm">
                                        <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                                            <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-indigo-50 lg:mb-0">
                                                <svg
                                                    className="w-8 h-8 text-deep-purple-accent-400"
                                                    stroke="currentColor"
                                                    viewBox="0 0 52 52"
                                                >
                                                    <polygon
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
                                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                                    />
                                                </svg>
                                            </div>
                                            <h6 className="font-semibold leading-5">{i}</h6>
                                        </div>
                                        <p className="mb-2 text-sm text-gray-900">
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                            accusantium doloremque rem aperiam.
                                        </p>
                                        <button
                                            onClick={() => handleCardClick(i)}
                                            aria-label=""
                                            className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                        >
                                            Click Me
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
                        
            <Recom  degree={degree} />





        </div>
    );
};
