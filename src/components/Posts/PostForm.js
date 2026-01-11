import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/modules/posts";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("text", text);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    addPost(formData);
    setText("");
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)] border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 flex items-center justify-center border border-cyan-400/30">
          <i className="fas fa-pen text-cyan-400"></i>
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Create a New Post
        </h3>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="w-full">
          <textarea
            name="text"
            placeholder="Blast off your thoughts..."
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[150px] px-5 py-4 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-y leading-relaxed text-base"
            style={{
              fontFamily: 'inherit',
              lineHeight: '1.6',
            }}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-96 object-contain bg-white/5"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 w-8 h-8 rounded-full glass flex items-center justify-center text-red-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:scale-110"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <label className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg glass border border-cyan-400/30 text-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 cursor-pointer whitespace-nowrap">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              ref={fileInputRef}
              className="hidden"
            />
            <i className="fas fa-image"></i>
            <span>Post Image</span>
          </label>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 flex items-center justify-center whitespace-nowrap"
          >
            <i className="fas fa-paper-plane mr-2"></i>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);
