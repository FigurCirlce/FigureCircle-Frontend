import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import RecomSmall from './RecomSmall';



interface FindYourDreamProfileProps {
    infoData: any; // Update the type of infoData as per your data structure
}


const FindYourDreamProfile: React.FC<FindYourDreamProfileProps> = ({ infoData }: any) => {

    //@ts-ignore
    const [data, setData] = useState<any>({})

    console.log("checkingstate==?", infoData)

    let degree = infoData?.stream_name
    useEffect(() => {
        const degree = localStorage.getItem('degree') || "{}";
        setData(JSON.parse(degree))
    }, [])
    // let value = "";
    // useEffect(() => {
    //     // Fetch data when the component mounts
    //     const fetchInfoData = async () => {
    //         try {
    //             const name = localStorage.getItem('token');
    //             const response = await axios.get(`${baseURL}/chosen_stream`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${name}`,
    //                     credentials:'include'
    //                 },

    //             });
    //             const chosenStream = response.data.chosen_stream;
    //             setData(chosenStream); // Update the state with the fetched data
    //             console.log("checking==>", chosenStream);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchInfoData();
    // }, []);

    return (
        <Card className="w-[800px]">
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl text-center">Find Your Dream Profile</CardTitle>
            </CardHeader>
            <CardContent className=" gap-4 flex flex-col items-center">

                <h1 className='text-2xl text-center'>{infoData?.stream_name}</h1>
                <div className='w-[8rem] flex justify-center items-center'>
                    <a href="/future-profile" className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border  border-gray-100 rounded-lg shadow-inner group">
                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Click Me</span>
                    </a>
                </div>

                <div>
                    <RecomSmall degree={degree}/>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">

            </CardFooter>
        </Card>

    );
};

export default FindYourDreamProfile;
