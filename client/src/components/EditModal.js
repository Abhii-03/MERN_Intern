import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useState } from 'react'

const EditModal = ({ handleCloseModal, selectedEmployee, updateEmployee, getAllEmployees }) => {
    const SERVER_URL = process.env.REACT_APP_VITE_API_URL;
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: selectedEmployee?.name || '',
        email: selectedEmployee?.email || '',
        mobile: selectedEmployee?.mobile || '',
        designation: selectedEmployee?.designation || '',
        gender: selectedEmployee?.gender || '',
        course: selectedEmployee?.course || [],
        imgUpload: selectedEmployee?.imgUpload || undefined,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prev) => {
                const newCourses = checked
                    ? [...prev.course, value]
                    : prev.course.filter((course) => course !== value);
                return { ...prev, course: newCourses };
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const postPicToServer = (pic) => {
        setLoading(true)
        if (pic === undefined) {
            console.log("Undefined")
            toast.error("Please Select an Image")
            return;
        }
        console.log(pic.type);
        if (pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/gif') {
            console.log('If Block');

            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'chatty');          // upload preset 
            data.append('cloud_name', 'dezifvepx');          // cloud name
            fetch('https://api.cloudinary.com/v1_1/dezifvepx/image/upload', {        // Cross Check the URL /image/upload reh gya shayad
                method: 'post',
                body: data

            }).then((res) => res.json()).then((data) => {
                
                setFormData({ ...formData, imgUpload: data.url.toString() });
                console.log(data);
                toast.success("Image Uploaded Successfully To Cloudinary")
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            })
        } else {
            console.log('Else Block');
            toast.error("Please Select an Image")
            setLoading(false);
            return;
        }
    }

    const validate = () => {
        const {
            name,
            email,
            mobile,
            designation,
            gender,
            course,
        } = formData;

        if (!name.trim()) {
            toast.error("Name is required");
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error("Invalid email format");
            return false;
        }

        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile)) {
            toast.error("Invalid mobile number");
            return false;
        }

        if (!designation) {
            toast.error("Designation is required");
            return false;
        }

        if (!gender) {
            toast.error("Gender is required");
            return false;
        }

        if (course.length === 0) {
            toast.error("At least one course must be selected");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        await axios
            .patch(
                `${SERVER_URL}/api/v1/employee/edit-emp/${selectedEmployee._id}`,
                formData
            ).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    toast.error("Something went wrong");
                }
            }).catch((error) => {
                console.error(error);
                toast.error("Something went wrong");
            }).finally(() => {
                handleCloseModal()
                getAllEmployees()
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Employee</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  
                    <div className="mb-4 flex justify-between items-center">
                        <label htmlFor="name" className="text-lg font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                            className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        />
                    </div>

                   
                    <div className="mb-4 flex justify-between items-center">
                        <label htmlFor="email" className="text-lg font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        />
                    </div>

                   
                    <div className="mb-4 flex justify-between items-center">
                        <label htmlFor="mobile" className="text-lg font-medium text-gray-600">Mobile No</label>
                        <input
                            type="tel"
                            name="mobile"
                            id="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            placeholder="Enter your mobile number"
                            className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        />
                    </div>

                  
                    <div className="mb-4 flex justify-between items-center">
                        <label className="text-lg font-medium text-gray-600">Designation</label>
                        <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                            className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        >
                            <option value="" disabled>Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    
                    <div className="mb-4 flex justify-between items-center">
                        <label className="text-lg font-medium text-gray-600">Gender</label>
                        <div className="flex gap-5">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    onChange={handleChange}
                                    checked={formData.gender === "M"}
                                    required
                                    className="px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg"
                                />
                                <span>Male</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    onChange={handleChange}
                                    checked={formData.gender === "F"}
                                    required
                                    className="px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg"
                                />
                                <span>Female</span>
                            </label>
                        </div>
                    </div>

                  
                    <div className="mb-4 flex justify-between items-center">
                        <label className="text-lg font-medium text-gray-600">Courses</label>
                        <div className="flex gap-5">
                            {["MCA", "BCA", "BSC"].map((course) => (
                                <label key={course}>
                                    <input
                                        type="checkbox"
                                        name="course"
                                        value={course}
                                        onChange={handleChange}
                                        checked={formData.course.includes(course)}
                                        className="px-4 py-2 mt-2 text-sm text-gray-800"
                                    />
                                    <span>{course}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 flex justify-between items-center">
                        <label
                            htmlFor="file"
                            className="text-lg  font-medium text-gray-600"
                        >
                            Image Upload
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => postPicToServer(e.target.files[0])}
                            className=" px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        />
                    </div>



                  
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mb-4 px-4 py-2 mt-2 text-gray-800 bg-teal-400 text-lg font-medium rounded-lg hover:border-black"
                    >
                        {loading ? "Uploading..." : "Save"}
                    </button>
                    
                    <button
                        onClick={handleCloseModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                   
                </form>

            </div>
        </div>
    );
}

export default EditModal;
