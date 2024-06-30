import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiCircleInfo, CiHeart, CiMenuBurger } from "react-icons/ci";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Masonry from "react-responsive-masonry";
import toast from "react-hot-toast";
import { Auth } from "../context/Auth";
import { getToken, getUserIdFromCookies } from "../components/AuthService";
import { ThreeDots } from "react-loader-spinner";

function UserGallery({ mode }) {
  const { email } = useContext(Auth);
  const [usersImage, setUsersImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewImg, setViewImg] = useState(false);
  const [imgToView, setImageToView] = useState("");
  const [info, setInfo] = useState(false);
  const [cols, setCols] = useState(5);
  const [upload, setUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  // eslint-disable-next-line
  const [viewFav, setViewFav] = useState(false);
  const [favImage, setFavImages] = useState([]);

  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [sidemenu, setSideMenu] = useState(false);

  const userId = getUserIdFromCookies();

  const getUsersImage = async () => {
    try {
      const res = await fetch(
        `https://pixlparadise.onrender.com/api/v1/get-users-image/${userId}`,
        {
          method: "GET",
        }
      );
      const json = await res.json();
      setUsersImage(json);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setIsAscending(false); ////////
    }
  };

  const deleteImage = async (img) => {
    setLoading(true);
    try {
      const res = await fetch("https://pixlparadise.onrender.com/api/v1/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: img,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(json.msg);
      } else {
        toast.error(json.msg);
      }
    } catch (e) {
      toast.error("Error deleting image");
    } finally {
      setLoading(false);
      getUsersImage();
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", previewImage);
    formData.append("name", name);
    formData.append("tags", tags);
    formData.append("email", email);
    formData.append("userId", userId);
    formData.append("category", category);

    setUploading(true);

    try {
      const res = await fetch("https://pixlparadise.onrender.com/api/v1/imageUpload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        toast.success(json.msg);
        getUsersImage();
        setUpload(false);
        resetForm();
      } else {
        toast.error(json.msg);
      }
    } catch (e) {
      toast.error("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const addFavorite = async (fileId) => {
    setFavLoading(true);
    try {
      const token = getToken();
      console.log("token infav", token);
      const res = await fetch("https://pixlparadise.onrender.com/api/v1/addFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          fileId: fileId,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(json.msg);
      } else {
        toast.error(json.msg);
      }
    } catch (e) {
      toast.error("Error adding favorite");
      console.error(e);
    } finally {
      setFavLoading(false);
    }
  };

  const getFavorite = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://pixlparadise.onrender.com/api/v1/getFav/${userId}`, {
        method: "GET",
      });
      const json = await res.json();
      if (json.success) {
        setFavImages(json.images);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavorite();
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPreviewImage(acceptedFiles[0]);
    },
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    getUsersImage();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (img) => {
    try {
      await deleteImage(img);
      setViewImg(false);
      getUsersImage();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // const handleSortOrder = () => {
  //   setIsAscending(!isAscending);
  // };

  const resetForm = () => {
    setName("");
    setTags("");
    setCategory("");
    setPreviewImage(null);
  };

  const filteredImages = usersImage.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedImages = filteredImages.sort((a, b) => {
    if (sortOption === "name") {
      return isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortOption === "size") {
      return isAscending
        ? a.metadata.bytes - b.metadata.bytes
        : b.metadata.bytes - a.metadata.bytes;
    } else if (sortOption === "date") {
      return isAscending
        ? new Date(a.metadata.created_at) - new Date(b.metadata.created_at)
        : new Date(b.metadata.created_at) - new Date(a.metadata.created_at);
    } else if (sortOption === "type") {
      return isAscending
        ? a.metadata.type.localeCompare(b.metadata.type)
        : b.metadata.type.localeCompare(a.metadata.type);
    } else if (sortOption === "tags") {
      return isAscending
        ? a.tags.localeCompare(b.tags)
        : b.tags.localeCompare(a.tags);
    } else {
      return 0;
    }
  });

  const handleFavorite = async (fileId) => {
    try {
      await addFavorite(fileId);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <section className={`min-h-lvh w-full  transition-all duration-300 mt-20 ${mode ? "bg-black":"bg-white"}`}>

    <div
      className={` `}
    >
      {sidemenu && (
        <div className="w-1/2 h-full bg-white border rounded-tl-md rounded-bl-md fixed z-10 right-0 top-20 flex flex-col transition-all duration-300">
          <span className="p-2 flex justify-end items-center" onClick={()=>setSideMenu(!sidemenu)}>
            <IoClose className="text-xl"/>
          </span>
          <div className="flex items-center gap-4">
            <select
              value={sortOption}
              onChange={handleSort}
              className="p-2 border w-full border-gray-300 rounded"
            >
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="date">Date</option>
              <option value="type">Type</option>
              <option value="tags">Tags</option>
            </select>
          </div>
          <div
            className={` transition-all duration-300 h-10 border border-gray-300 rounded flex justify-center items-center p-2 ${
              !mode ? "bg-gray-000" : "bg-gray-100"
            }`}
          >
            <ul className="flex">
              <li className="flex justify-center items-center gap-2">
                Grid:{" "}
                <span className="border border-gray-300 rounded px-2">
                  {cols}
                </span>
                <button
                  className={`text-xl flex justify-center items-center ${
                    cols === 3 ? "hidden" : "block"
                  }`}
                  onClick={() => setCols(cols - 1)}
                >
                  <FaMinus />
                </button>
                <button
                  className={`text-xl flex justify-center items-center ${
                    cols === 20 ? "hidden" : "block"
                  }`}
                  onClick={() => setCols(cols + 1)}
                >
                  <FaPlus />
                </button>
              </li>
            </ul>
          </div>
          <div
            onClick={() => {
              setViewFav(!viewFav);
            }}
            className={`transition-all duration-300 hover:cursor-pointer border border-gray-300 rounded px-2 h-10 flex justify-center items-center ${
              mode ? "bg-white" : ""
            }`}
          >
            <span className="">Favorite</span>
          </div>
        </div>
      )}
      <div className="lg:hidden px-4 flex justify-between items-center">
        {sidemenu ? (
          <FaSearch onClick={()=>setSideMenu(!sidemenu)} className=" transition-all duration-300" />
        ) : (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-1 rounded-3xl border border-gray-300 "
          />
        )}

        <CiMenuBurger onClick={() => setSideMenu(!sidemenu)} />
      </div>
      <div className="hidden lg:flex justify-end items-center mb-4 px-4 gap-10 border-b py-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded lg:w-1/2"
        />
        <div className="flex items-center gap-4">
          <select
            value={sortOption}
            onChange={handleSort}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
            <option value="date">Date</option>
            <option value="type">Type</option>
            <option value="tags">Tags</option>
          </select>
        </div>
        <div
          className={` transition-all duration-300 h-10 border border-gray-300 rounded flex justify-center items-center p-2 ${
            !mode ? "bg-gray-000" : "bg-gray-100"
          }`}
        >
          <ul className="flex">
            <li className="flex justify-center items-center gap-2">
              Grid:{" "}
              
              <button
                className={`text-xl flex justify-center items-center ${
                  cols === 3 ? "hidden" : "block"
                }`}
                onClick={() => setCols(cols - 1)}
              >
                <FaMinus />
              </button>
              <span className="border border-gray-300 rounded px-2">
                {cols}
              </span>
              <button
                className={`text-xl flex justify-center items-center ${
                  cols === 20 ? "hidden" : "block"
                }`}
                onClick={() => setCols(cols + 1)}
              >
                <FaPlus />
              </button>
            </li>
          </ul>
        </div>
        <div
          onClick={() => {
            setViewFav(!viewFav);
          }}
          className={`transition-all duration-300 hover:cursor-pointer border border-gray-300 rounded px-2 h-10 flex justify-center items-center ${
            mode ? "bg-white" : ""
          }`}
        >
          <span className="">Favorite</span>
        </div>
      </div>
      {/* <div className="w-full h-auto flex justify-center items-center">
        <h className='text-5xl font-bold'>Your Gallery</h>
      </div> */}
      <span
        onClick={() => {
          setUpload(!upload);
        }}
        className="hover:cursor-pointer fixed z-30 right-4 w-14 h-14 rounded-full bg-[#f5221b] bottom-4 flex justify-center items-center"
      >
        <FaPlus className="text-3xl text-white" />
      </span>
      {viewFav && (
        <div className={`w-full h-full z-10  fixed flex flex-col gap-4 ${mode ? "bg-black text-white":"bg-white text-black"}`}>
          <h1 className="ml-[46%] text-4xl mt-4 font-bold">Favorite</h1>
          <div className="">
            <Masonry columnsCount={cols} gutter="2px" className="p-4">
              {!loading &&
                favImage.map((image) => (
                  <div key={image._id}>
                    <img
                      src={image.imageUrl}
                      alt="error"
                      style={{ width: "100%", display: "block" }}
                      className="hover:cursor-pointer hover:opacity-85 duration-300 ease-in-out"
                    />
                  </div>
                ))}
            </Masonry>
            {loading && (
              <div className="w-full h-screen flex justify-center items-center">
                <p>Loading...</p>
              </div>
            )}
          </div>
        </div>
      )}
      {upload && (
        <div className="w-full h-full fixed top-0 right-0 bg-slate-500 z-20 backdrop-blur-sm bg-opacity-10 flex justify-center items-center">
          <div className="lg:w-4/5  xl:w-auto rounded-3xl h-3/4 bg-white p-4 flex flex-col gap-4">
            <div
              {...getRootProps()}
              className="border-2 h-1/2 border-dashed border-gray-300 rounded-xl p-6 flex justify-center items-center flex-col"
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              {previewImage && (
                <div className="w-full flex justify-center items-center">
                  <img
                    src={URL.createObjectURL(previewImage)}
                    alt="Preview"
                    className="w-1/6 mt-4"
                  />
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Image name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={uploadImage}
              className="p-2 bg-purple-700 text-white rounded"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
            <button
              onClick={() => setUpload(false)}
              className="p-2 bg-red-700 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <Masonry columnsCount={cols} gutter="4px" className="p-4">
        {!loading &&
          sortedImages.length > 0 &&
          sortedImages.map((image) => (
            <div key={image._id}>
              <img
                src={image.imageUrl}
                alt="error"
                style={{ width: "100%", display: "block" }}
                className="hover:cursor-pointer hover:opacity-85 duration-300 ease-in-out rounded-xl"
                onClick={() => {
                  setImageToView(image);
                  setViewImg(true);
                }}
              />
            </div>
          ))}
        {viewImg && (
          <div className="w-full h-full fixed z-30 top-0 right-0 bg-slate-900 flex justify-center items-center flex-col" >
            <span className="absolute hidden lg:flex w-full h-32 top-0 justify-center opacity-0 hover:opacity-100 duration-300 ease-in-out ">
              <IoCloseCircle
                className="text-6xl hover:cursor-pointer text-slate-300 mt-5"
                onClick={() => setViewImg(false)}
              />
            </span>
            <span className="absolute lg:hidden top-10 right-10 flex justify-center  duration-300 ease-in-out ">
              <IoCloseCircle
                className="text-3xl hover:cursor-pointer text-slate-300 mt-5"
                onClick={() => setViewImg(false)}
              />
            </span>
            <div className=" w-3/4 h-3/4 mt-16 flex justify-center items-center overflow-auto ">
              <img
                src={imgToView.imageUrl}
                alt="Error"
                className=" h-full bg-contain"
              />
            </div>
            <div className="w-full h-10 mt-8 flex justify-center items-center ">
              <ul className="flex justify-center items-center gap-4 bg-white bg-opacity-70 backdrop-filter backdrop-blur-xl w-1/4 rounded-md  h-full">
                <li
                  className="text-red-600 hover:cursor-pointer"
                  onClick={() => handleDelete(imgToView.imageUrl)}
                >
                  {loading ? (
                    <ThreeDots width="30" />
                  ) : (
                    <RiDeleteBin2Fill className="text-2xl" />
                  )}
                </li>
                <li
                  className=" text-black hover:cursor-pointer"
                  onClick={() => handleFavorite(imgToView._id)}
                >
                  {favLoading ? (
                    <ThreeDots width="30" />
                  ) : (
                    <CiHeart className="text-2xl font-bold" />
                  )}
                </li>

                <li
                  className=" text-blue-600 hover:cursor-pointer"
                  onClick={() => setInfo((info) => !info)}
                >
                  <CiCircleInfo className="text-2xl font-bold" />
                </li>
              </ul>
            </div>
            {info && (
              <div className="w-1/4 absolute right-10 rounded-lg h-3/4 p-8 bg-slate-400 flex flex-col  justify-center items-start gap-3">
                <p>
                  <strong>ID:</strong> {imgToView._id}
                </p>
                <p>
                  <strong>User ID:</strong> {imgToView.userId}
                </p>
                <p>
                  <strong>Name:</strong> {imgToView.name}
                </p>
                <p>
                  <strong>Tags:</strong> {imgToView.tags}
                </p>
                <p>
                  <strong>Email:</strong> {imgToView.email}
                </p>
                <p>
                  <strong>Width:</strong> {imgToView.metadata.width} pixels
                </p>
                <p>
                  <strong>Height:</strong> {imgToView.metadata.height} pixels
                </p>
                <p>
                  <strong>Format:</strong> {imgToView.metadata.format}
                </p>
                <p>
                  <strong>Created At:</strong> {imgToView.metadata.created_at}
                </p>
                <p>
                  <strong>Size:</strong>{" "}
                  {(imgToView.metadata.bytes / 1048576).toFixed(2)} MB
                </p>
                <p>
                  <strong>Type:</strong> {imgToView.metadata.type}
                </p>
                <p>
                  <strong>Category:</strong> {imgToView.category}
                </p>
                <p>
                  <strong>Likes:</strong> {imgToView.likes.length}
                </p>
              </div>
            )}
          </div>
        )}
      </Masonry>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          <div
            className=" mb-52 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          ></div>
        </div>
      )}
      {sortedImages.length < 1 && (
        <div
          className={`"w-full h-screen flex justify-center items-center transition-all duration-300 ${
            mode ? "text-white" : ""
          }`}
        >
          <p className="mb-52">No images available. Add to gallery.</p>
        </div>
      )}
    </div>
    </section>

  );
}

export default UserGallery;
