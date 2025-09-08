import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ProductCMS () {

    const location = useLocation();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No file selected");
    const [errors, setErrors] = useState({});

    // Regex rules
    const nameRegex = /^[A-Za-z][A-Za-z\s'-]{2,49}$/; // Letters, spaces, hyphens, single quotes, min 3 chars
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Digits only, supports decimals

    // Handle text changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setFileName(file.name);
        } else {
            setImage(null);
            setFileName("No file selected");
        }
    };

    // Validate before submitting
    const validateForm = () => {
        let formErrors = {};

        if (!nameRegex.test(formData.name)) {
            formErrors.name =
                "Name must be 3-50 characters. Only letters, spaces, hyphens, and single quotes allowed.";
        }

        if (!priceRegex.test(formData.price)) {
            formErrors.price = "Price must be a valid number.";
        }

        if (!formData.description.trim()) {
            formErrors.description = "Description is required.";
        }

        if (!image) {
            formErrors.image = "Please upload a product image.";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop if validation fails
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("image", image);

        try {
            const id = JSON.parse(sessionStorage.getItem("updateContext"))
            location.pathname === '/products/edit/update' ?
                await axios.put(`https://68beb31f9c70953d96ed4560.mockapi.io/api/v1/project/${id}`, data)
            :
                await axios.post("https://68beb31f9c70953d96ed4560.mockapi.io/api/v1/project/", data)

            // Form was reset
            setFormData({ name: "", price: "", description: "" });
            setImage(null);
            setFileName("No file selected");
            setErrors({});
        } catch (error) {
            console.error("Error uploading product:", error);
            alert("Failed to add product. Try again!");
        }
    };

    return (
        <section className="w-[100%] lg:h-[100vh] flex flex-col justify-between items-center">
            <div className="lg:w-[100%] lg:h-[90vh] w-[100%] md:h-[90vh] flex justify-between py-[3%] px-[3%]">
                <form onSubmit={handleSubmit} className="lg:w-[55%] md:max-lg:h-[100%] w-[100%] flex flex-col md:max-lg:gap-y-[5%] gap-y-6 lg:items-end items-start">
                    <input className="w-[100%] md:max-lg:h-[9%] h-10 focus:outline-none focus:border focus:border-black border-black/20 border rounded-md px-[3%] font-[Montserrat] font-light text-sm" type="text" id="name" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange}/>
                    <input className="w-[100%] md:max-lg:h-[9%] h-10 focus:outline-none focus:border focus:border-black border-black/20 border rounded-md px-[3%] font-[Montserrat] font-light text-sm" type="text" id="price" name="price" placeholder="Product Price" value={formData.price} onChange={handleChange}/>
                    <div className="w-full">
                        <input id="image-input" type="file" name="image" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:text-sm file:font-normal file:bg-transparent file:text-black file:border file:border-black/40 hover:file:bg-transparent file:cursor-pointer border border-gray-300 rounded-lg font-[Montserrat]"/>
                    </div>
                    <div className="lg:hidden flex md:w-[40%] md:h-[30%] h-52 w-[80%] border">
                        <img className="w-full h-full object-cover" src={image && image} alt=""></img>
                    </div>
                    <input className="w-[100%] md:max-lg:h-[9%] h-10 focus:outline-none focus:border focus:border-black border-black/20 border rounded-md px-[3%] font-[Montserrat] font-light text-sm" type="text" id="description" name="description" placeholder="Product Description" value={formData.description} onChange={handleChange}/>
                    <div className="w-[100%] flex justify-start px-[2%]">
                        <ul className="list-disc font-[Montserrat]  text-lg md:text-lg lg:text-lg xl:text-sm text-red-600">
                            {errors.name && <li>{errors.name}</li>}
                            {errors.price && <li>{errors.price}</li>}
                        </ul>
                    </div>
                    <button className="md:max-lg:px-[4%] md:max-lg:py-[1.2%] px-7 py-3 border rounded-lg bg-black text-white font-[Montserrat] font-light">New Entry</button>
                </form>
                <div className="lg:flex hidden w-[40%] h-[100%] border">
                    <img className="w-full h-full object-cover" src={image && image} alt=""></img>
                </div>
            </div>
        </section>
    )
}

export default ProductCMS;