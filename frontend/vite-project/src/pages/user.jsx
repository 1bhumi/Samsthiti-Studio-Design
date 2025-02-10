import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import "../App.css";
import axios from 'axios';

const User = () => {
    const [files, setFiles] = useState([]);  // Ensure files is initialized as an empty array

    // Fetch files from backend
    const fetchFiles = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_GET_FILES,
                {
                    withCredentials: true
                }
            );
            setFiles(response.data.data);  // Assuming response contains a `files` array
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    // Fetch files when component mounts
    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
                {/* Styled "Our Work" heading */}
                <h1 className="text-4xl font-extrabold text-gray-900 my-6 underline">Our Work</h1>

                <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Uploaded Files</h2>

                    {/* Check if files array has data */}
                    {files && files.length === 0 ? (
                        <p className="text-gray-600 text-lg">No files uploaded yet.</p>
                    ) : (
                        <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded-lg">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {files.map((file, index) => (
                                    <li key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
                                        <a
                                            href={file.file}  // This will open the file directly
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 font-semibold hover:underline"
                                        >
                                            {file.fileName}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;
