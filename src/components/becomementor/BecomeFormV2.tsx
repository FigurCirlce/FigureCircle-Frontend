import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from "react-toastify";

import baseURL from '@/config/config';
import { Trash } from 'lucide-react';

// Dummy data for degrees and expertise

// Type for the form data
interface FormData {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    expertise: string;
    degree: string;
    background: string;
    fee: string;
    milestones: string;
    profileImage: File | null;
    resume: File | null;
    availability: AvailabilitySlot[];
}

interface AvailabilitySlot {
    day: string;
    startTime: string;
    endTime: string;
}


interface ApiData {
    primary_expertise_area: string[];
    highest_degree_achieved: string[];
}

const BecomeFormV2 = () => {
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState<ApiData>({
        primary_expertise_area: [],
        highest_degree_achieved: []
    });

    const [searchExpertise, setSearchExpertise] = useState('');
    const [searchDegree, setSearchDegree] = useState('');

    // Maximum number of availability slots
    const MAX_AVAILABILITY_SLOTS = 3;

    const weekdays = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];


    // console.log("apiData", apiData);

    const notifySuccess = () => toast.success("Your application has been submitted successfully!");
    const notifyError = (error: any) => toast.error(`Error: ${error}`);

    // Form state
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        expertise: "",
        degree: "",
        background: "",
        fee: "",
        milestones: "",
        profileImage: null,
        resume: null,
        availability: []
    });

    const isDayAlreadySelected = (day: string) => {
        return formData.availability.some(slot => slot.day === day);
    };

    // Add availability slot
    const addAvailabilitySlot = () => {
        // Check if maximum slots have been reached
        if (formData.availability.length < MAX_AVAILABILITY_SLOTS) {
            setFormData(prev => ({
                ...prev,
                availability: [
                    ...prev.availability,
                    { day: '', startTime: '', endTime: '' }
                ]
            }));
        } else {
            toast.error(`You can only add up to ${MAX_AVAILABILITY_SLOTS} availability slots.`);
        }
    };

    // Remove availability slot
    const removeAvailabilitySlot = (index: number) => {
        setFormData(prev => ({
            ...prev,
            availability: prev.availability.filter((_, i) => i !== index)
        }));
    };

    // Update availability slot
    const updateAvailabilitySlot = (
        index: number,
        field: keyof AvailabilitySlot,
        value: string
    ) => {
        // Check for duplicate day selection
        if (field === 'day') {
            if (isDayAlreadySelected(value) && value !== '') {
                toast.error('You cannot select the same day multiple times.');
                return;
            }
        }

        const newAvailability = [...formData.availability];
        newAvailability[index] = {
            ...newAvailability[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            availability: newAvailability
        }));
    };

    // Validate form before submission
    const validateAvailability = () => {
        // Check for unique days
        const days = formData.availability.map(slot => slot.day);
        const uniqueDays = new Set(days);

        if (days.length !== uniqueDays.size) {
            toast.error('Each availability slot must have a unique day.');
            return false;
        }

        // Check that all slots are fully filled
        const incompleteSlot = formData.availability.find(
            slot => !slot.day || !slot.startTime || !slot.endTime
        );

        if (incompleteSlot) {
            toast.error('Please complete all availability slot details.');
            return false;
        }

        return true;
    };


    // Milestone options
    const milestoneOptions = ['3', '4', '5'];

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "profileImage" | "resume"
    ) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, [field]: file }));
    };

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post<ApiData>(
                    `${baseURL}/get_information`,
                    {
                        primary_expertise_area: "primary_expertise_area",
                        highest_degree_achieved: "highest_degree_achieved"
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                // Remove duplicates
                const uniqueDegrees = [...new Set(response.data.highest_degree_achieved)];
                const uniqueExpertise = [...new Set(response.data.primary_expertise_area)];

                setApiData({
                    highest_degree_achieved: uniqueDegrees,
                    primary_expertise_area: uniqueExpertise
                });

            } catch (error) {
                console.error("Error fetching form data:", error);
                toast.error("Failed to load form options");
            }
        };

        fetchFormData();
    }, []);



    // Handle select changes
    const handleSelect = (value: string, name: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const uploadToCloudinary = async (file: File): Promise<string> => {
        const cloudName = "dpwysillm"; // Your Cloudinary cloud name
        const uploadPreset = "figurecircule"; // Your Cloudinary upload preset
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
            const response = await axios.post(cloudinaryUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure this header is set for file uploads
                },
            });

            return response.data.secure_url; // Return the Cloudinary URL of the uploaded file
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw new Error("Failed to upload file.");
        }
    };
    // Modify handleSubmit to include validation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate availability first
        if (!validateAvailability()) {
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to submit this form.");
            return;
        }

        try {
            setLoading(true);

            const profileImageUrl = formData.profileImage
                ? await uploadToCloudinary(formData.profileImage)
                : null;
            const resumeUrl = formData.resume
                ? await uploadToCloudinary(formData.resume)
                : null;

            const formDataToSubmit = {
                ...formData,
                profile_picture: profileImageUrl,
                resume: resumeUrl,
            };

            const response = await axios.post(`${baseURL}/add_new_mentor`, formDataToSubmit, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Form submitted successfully:", response.data);
            notifySuccess()
        } catch (error) {
            console.error("Error submitting form:", error);
            notifyError(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Become a Mentor</CardTitle>
                    <CardDescription>
                        Fill out the form below to join our mentorship platform. Share your expertise
                        and set your mentorship fee. Approved mentors will help users achieve their
                        goals by working through milestone-based sessions.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number (optional)</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>


                        <div className='grid grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>



                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                <Input
                                    id="linkedin"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    placeholder="linkedin.com/in/yourprofile"
                                    required
                                />
                            </div>
                        </div>

                    </div>

                    {/* Expertise Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Your Expertise and Background</h3>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="expertise">Primary Expertise Area</Label>
                                <Select
                                    name="expertise"
                                    onValueChange={(value) => {
                                        handleSelect(value, 'expertise');
                                        setSearchExpertise(''); // Reset search on selection
                                    }}
                                    value={formData.expertise}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your expertise" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className="p-2">
                                            <Input
                                                placeholder="Search expertise..."
                                                value={searchExpertise}
                                                onChange={(e) => setSearchExpertise(e.target.value)}
                                                autoFocus
                                                className="mb-2"
                                            />
                                        </div>
                                        <div className="max-h-60 overflow-y-auto">
                                            {apiData.primary_expertise_area
                                                .filter(expertise =>
                                                    expertise.toLowerCase().includes(searchExpertise.toLowerCase())
                                                )
                                                .map((expertise) => (
                                                    <SelectItem key={expertise} value={expertise}>
                                                        {expertise}
                                                    </SelectItem>
                                                ))}
                                        </div>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="degree">Highest Degree Achieved</Label>
                                <Select
                                    name="degree"
                                    onValueChange={(value) => {
                                        handleSelect(value, 'degree');
                                        setSearchDegree(''); // Reset search on selection
                                    }}
                                    value={formData.degree}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your degree" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className="p-2">
                                            <Input
                                                placeholder="Search degrees..."
                                                value={searchDegree}
                                                onChange={(e) => setSearchDegree(e.target.value)}
                                                autoFocus
                                                className="mb-2"
                                            />
                                        </div>
                                        <div className="max-h-60 overflow-y-auto">
                                            {apiData.highest_degree_achieved
                                                .filter(degree =>
                                                    degree.toLowerCase().includes(searchDegree.toLowerCase())
                                                )
                                                .map((degree) => (
                                                    <SelectItem key={degree} value={degree}>
                                                        {degree}
                                                    </SelectItem>
                                                ))}
                                        </div>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="background">Brief Background Description</Label>
                            <Textarea
                                id="background"
                                name="background"
                                value={formData.background}
                                onChange={handleChange}
                                placeholder="Share your relevant experience and achievements (250-500 words)"
                                className="h-32"
                                required
                            />
                        </div>
                    </div>

                    {/* Fee Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Fee Structure</h3>

                        <div className='grid grid-cols-2 gap-4' >
                            <div className="space-y-2">
                                <Label htmlFor="fee">Total Mentorship Fee In INR</Label>
                                <Input
                                    id="fee"
                                    name="fee"
                                    type="number"
                                    value={formData.fee}
                                    onChange={handleChange}
                                    placeholder="Enter amount (will be divided by milestones)"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="milestones">Preferred Number of Milestones</Label>
                                <Select
                                    name="milestones"
                                    onValueChange={(value) => handleSelect(value, 'milestones')}
                                    value={formData.milestones}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select number of milestones" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {milestoneOptions.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option} milestones
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                    </div>

                    {/* Upload Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Required Documents</h3>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="profile">Profile Picture</Label>
                                <Input
                                    id="profile"
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer"
                                    onChange={(e) => handleFileChange(e, "profileImage")}
                                    // onChange={(e) => handleFileChange(e, "resume")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="resume">Resume or Portfolio</Label>
                                <Input
                                    id="resume"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="cursor-pointer"
                                    onChange={(e) => handleFileChange(e, "resume")}
                                    required
                                />
                            </div>
                        </div>

                    </div>
                </CardContent>

                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Availability Slots</h3>

                        {formData.availability.map((slot, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 items-center">
                                <div className="space-y-2">
                                    <Label>Day</Label>
                                    <Select
                                        value={slot.day}
                                        onValueChange={(value) =>
                                            updateAvailabilitySlot(index, 'day', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {weekdays
                                                .filter(day =>
                                                    !isDayAlreadySelected(day) ||
                                                    slot.day === day
                                                )
                                                .map((day) => (
                                                    <SelectItem key={day} value={day}>
                                                        {day}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Start Time</Label>
                                    <Input
                                        type="time"
                                        value={slot.startTime}
                                        onChange={(e) =>
                                            updateAvailabilitySlot(index, 'startTime', e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>End Time</Label>
                                    <div className='flex items-center justify-between gap-0'>
                                        <Input
                                            type="time"
                                            value={slot.endTime}
                                            onChange={(e) =>
                                                updateAvailabilitySlot(index, 'endTime', e.target.value)
                                            }
                                            required
                                        />
                                        {formData.availability.length > 1 && (
                                            <Trash
                                                className="cursor-pointer"
                                                onClick={() => removeAvailabilitySlot(index)}
                                                size={24}
                                                color="red" />
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addAvailabilitySlot}
                            className="w-full"
                        >
                            Add Another Availability Slot
                        </Button>
                    </div>
                </CardContent>


                <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default BecomeFormV2;