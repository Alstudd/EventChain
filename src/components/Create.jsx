import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const cloud_name = `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`;
  const upload_preset = `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`;
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, eventImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const data = new FormData();
    data.append("file", formData.eventImage);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url;
      console.log({
        eventName: formData.eventName,
        eventDescription: formData.eventDescription,
        eventDate: formData.eventDate,
        eventImageUrl: imageUrl,
      });

      alert("Event submitted successfully!");
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Event
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Name
          </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            className="w-full p-2 border-2 border-[#00b386] rounded-md focus:outline-none transition duration-300"
            placeholder="Enter event name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Description
          </label>
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleInputChange}
            className="w-full p-2 border-2 border-[#00b386] rounded-md focus:outline-none transition duration-300"
            placeholder="Enter event description"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Date
          </label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="w-full p-2 border-2 border-[#00b386] rounded-md focus:outline-none transition duration-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border-2 border-[#00b386] rounded-md focus:outline-none transition duration-300"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-4 w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-[#00b386] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Submit Event"}
        </button>
      </div>
    </div>
  );
};

export default Create;
