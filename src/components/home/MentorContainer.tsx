import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"


const MentorConatiner: React.FC = () => {
    return (
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Mentor</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <section className="bg-white dark:bg-gray-900">
                    <div className="container grid grid-cols-1 gap-8 px-4 py-12 mx-auto lg:grid-cols-2">
                        <div className="flex flex-col items-center max-w-lg mx-auto text-center">
                            <h2 className="text-3xl font-semibold tracking-tight text-gray-800 dark:text-white">
                                Looking For Experts to Work With
                            </h2>

                            <p className="mt-3 text-gray-500 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ex cupiditate corrupti aliquam eum vel consequuntur hic culpa unde natus officia enim est impedit consequatur aut, voluptatem minima repellat non!</p>

                            <a href="/expert" className="inline-flex items-center justify-center w-full px-5 py-2 mt-6 text-white transition-colors duration-300 bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                Start now
                            </a>
                        </div>

                        <div className="flex flex-col items-center max-w-lg mx-auto text-center">
                            <h2 className="text-3xl font-semibold tracking-tight text-gray-800 dark:text-white">
                                Become an expert
                            </h2>

                            <p className="mt-3 text-gray-500 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ex cupiditate corrupti aliquam eum vel consequuntur hic culpa unde natus officia enim est impedit consequatur aut, voluptatem minima repellat non!</p>

                            <a href="/become-expert" className="inline-flex items-center justify-center w-full px-5 py-2 mt-6 text-gray-700 transition-colors duration-300 transform bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-100 dark:text-white sm:w-auto dark:hover:bg-gray-800 dark:ring-gray-700 focus:ring focus:ring-gray-200 focus:ring-opacity-80">
                                Apply
                            </a>
                        </div>
                    </div>
                </section>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">

            </CardFooter>
        </Card>

    );
};

export default MentorConatiner;
