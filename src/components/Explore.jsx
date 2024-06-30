import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CiHeart } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Auth } from "../context/Auth";
import toast from "react-hot-toast";
import { IoIosArrowDown, IoIosArrowUp, IoMdCloseCircle } from "react-icons/io";
import { RxMixerHorizontal } from "react-icons/rx";
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Explore = ({ mode }) => {
  const { isLoggedIn } = useContext(Auth);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("images");
  const [viewImage, setViewImage] = useState(false);
  const [img, setImg] = useState({});
  const [orderBy, setOrderBy] = useState("latest");
  const [orientation, setOrientation] = useState("landscape");
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [color, setColor] = useState("white");
  const [filter,setFilter] = useState(false);
  const inputElem = useRef(null);

  const fetchImages = async (inputVal = "photos", page = 1) => {
    const query = inputVal || "nature";
    console.log("api hit");
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=${loadedImages}&client_id=sPHzXPFNJ5B-TiuA3U_Tf1wyfsIRNln5wP4ATWsKDoo&order_by=${orderBy}&orientation=${orientation}&query=${query}&color=${color}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const json = await response.json();
      setImages((prevImages) => [...prevImages, ...json.results]);
      setInitialFetchDone(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialFetchDone) {
      fetchImages(searchTerm);
    }
  }, [initialFetchDone]);

  useEffect(() => {
    if (initialFetchDone) {
      setCurrentPage(1);
      setImages([]);
      fetchImages(searchTerm, 1);
    }
  }, [orderBy, orientation, color]);

  const loadMoreImages = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    fetchImages(searchTerm, newPage);
  };

  const handleClickOnImg = (image) => {
    setViewImage(true);
    setImg(image);
  };

  const handleDownload = async (url, filename) => {
    if (isLoggedIn) {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else {
      toast.error("First login to your account");
    }
  };

  const handleSearch = useCallback(
    debounce((inputVal) => {
      setCurrentPage(1);
      setImages([]);
      setSearchTerm(inputVal);
      fetchImages(inputVal, 1);
    }, 500),
    [orderBy, orientation]
  );

  function handleClear(){
    setOrientation("landscape");
    setColor("white");
    setOrderBy("latest");
  }

  return (
    <div
      className={` mx-auto px-4 py-8 mt-20 min-h-screen ${
        mode ? "bg-[#1e2125] text-[#E9DFCE]" : "bg-white text-black"
      }`}
    >
      {/* Mobile Filters */}
      <button onClick={()=>{setFilter(!filter)}} className={`lg:hidden px-4 font-medium fixed z-10 bottom-2 bg-slate-50 left-40 md:left-[45%] py-1 border flex justify-center items-center gap-2 ${mode ? "text-black" :""}`}><RxMixerHorizontal/>Filters</button>
      {
        filter &&
      <div className="lg:hidden bg-white w-full h-full fixed z-20 top-0  left-0  p-4">
        <div className="flex justify-between items-center h-12 bg-white border-b ">
        <h1 className="  text-xl font-bold">Filters</h1>
        <span onClick={()=>{setFilter(!filter)}} className="hover:cursor-pointer"><IoMdCloseCircle className="text-xl text-slate-400"/></span>
        </div>
        <div className="flex flex-col gap-2 items-center  w-full h-full">
          <div className="flex flex-col w-full mb-4 bg-white">
            <span className="font-bold mt-5">Order By:</span>
            <div className="text-sm grid grid-cols-3 list-none gap-8 py-5 ">
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orderBy === "latest" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrderBy("latest")}
              >
                Latest
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orderBy === "relevant" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrderBy("relevant")}
              >
                Relevant
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orderBy === "oldest" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrderBy("oldest")}
              >
                Oldest
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orderBy === "popular" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrderBy("popular")}
              >
                Popular
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orderBy === "views" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrderBy("views")}
              >
                Views
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orderBy === "downloads" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrderBy("downloads")}
              >
                Downloads
              </li>
            </div>
          </div>

          <div className="flex flex-col w-full mb-4 ">
            <span className="font-bold">Orientation:</span>
            <div className="text-sm  grid grid-cols-3 list-none gap-2 py-5 ">
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orientation === "landscape" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrientation("landscape")}
              >
                Landscape
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orientation === "portrait" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrientation("portrait")}
              >
                Portrait
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  orientation === "squarish" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setOrientation("squarish")}
              >
                Squarish
              </li>
            </div>
          </div>

          <div className="flex flex-col w-full mb-4">
            <span className="font-bold ">Colors:</span>
            <div className="text-sm  grid grid-cols-4 list-none gap-2 py-5">
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "black" ? "text-black border-black" : ""
                }`}
                onClick={() => setColor("black")}
              >
                Black
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "white" ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setColor("white")}
              >
                White
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "black_and_white" ? "text-blue-500 border-black" : ""
                }`}
                onClick={() => setColor("black_and_white")}
              >
                B & W
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "yellow" ? "text-yellow-500 border-yellow-500" : ""
                }`}
                onClick={() => setColor("yellow")}
              >
                Yellow
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "orange" ? "text-orange-500 border-orange-500" : ""
                }`}
                onClick={() => setColor("orange")}
              >
                Orange
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "red" ? "text-red-500 border-red-500" : ""
                }`}
                onClick={() => setColor("red")}
              >
                Red
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "purple" ? "text-purple-500 border-purple-500" : ""
                }`}
                onClick={() => setColor("purple")}
              >
                Purple
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "magenta" ? "text-[#FF00FF] border-[#FF00FF]" : ""
                }`}
                onClick={() => setColor("magenta")}
              >
                Magenta
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "green" ? "text-green-400 border-green-400" : "green"
                }`}
                onClick={() => setColor("green")}
              >
                Green
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "teal" ? "text-[#007c7c] border-[#007c7c]" : ""
                }`}
                onClick={() => setColor("teal")}
              >
                Teal
              </li>
              <li
                className={`cursor-pointer border rounded-md flex justify-center items-center px-2 py-1 font-medium ${
                  color === "blue"
                  ? "text-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setColor("blue")}
              >
                Blue
              </li>
            </div>
          </div>

          {/* <div className="flex gap-5 w-full items-end">
            <span className="font-bold mb-2">Per page:</span>
            <div className="flex items-center justify-center gap-2">
              <button
                className="text-lg"
                onClick={() => setLoadedImages(loadedImages + 1)}
              >
                <FaMinus />
              </button>
              <span className="font-semibold bg-blue-50 p-1 rounded-md mx-2">
                {loadedImages}
              </span>
              <button
                className="text-lg"
                onClick={() => setLoadedImages(loadedImages - 1)}
              >
                <FaPlus />
              </button>
            </div>
          </div> */}
          <div className=" px-4 w-full  h-20 absolute bottom-0 flex justify-between items-center gap-5 font-medium border-t">
            <button onClick={()=>handleClear()} className="w-1/2 py-3 bg-[#eeeeee] rounded-lg">Clear</button>
            <button onClick={()=>{setFilter(!filter)}} className="w-1/2 py-3 text-white bg-black rounded-lg">Close</button>
          </div>
        </div>
      </div>
      }

      {/* Main Content */}
      <div className="flex justify-between items-center mb-4 w-full ">
        <div className="hidden lg:flex lg:justify-center lg:items-center">
          <label htmlFor="order_by" className="font-bold">
            Order By:
          </label>
          <select
            className="text-sm outline-none border-none bg-blue-50 h-8 rounded-md hover:cursor-pointer text-black mx-2 font-medium md:block hidden"
            id="order_by"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="relevant">Relevant</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
            <option value="views">Views</option>
            <option value="downloads">Downloads</option>
          </select>
        </div>
        <div className="text-black font-medium w-full lg:w-auto">
          <input
            ref={inputElem}
            onChange={() => handleSearch(inputElem.current?.value)}
            id="search"
            className=" relative w-full lg:w-[50vw] h-10 rounded-lg px-5 bg-blue-50"
            placeholder="Search images..."
          />
        </div>
        <div className="hidden lg:flex lg:justify-center lg:items-center">
          <label className="font-bold " htmlFor="orientation">
            Orientation:
          </label>
          <select
            id="orientation"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            className="text-sm outline-none border-none bg-blue-50 h-8 rounded-md hover:cursor-pointer text-black mx-2 font-medium md:block hidden"
          >
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="squarish">Squarish</option>
          </select>
        </div>

        <div className="hidden lg:flex lg:justify-center lg:items-center"> 
          <label htmlFor="color" className="font-bold">
            Colors:
          </label>
          <select
            className="text-sm outline-none border-none bg-blue-50 h-8 rounded-md hover:cursor-pointer text-black mx-2 font-medium md:block hidden"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="black_and_white">B & W</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
            <option value="purple">Purple</option>
            <option value="magenta">Magenta</option>
            <option value="green">Green</option>
            <option value="teal">Teal</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div className="hidden lg:flex justify-center items-center gap-2">
          <span className="font-bold">Per_page:</span>
          <div className="flex flex-col justify-center items-center gap-1">
            <button onClick={() => setLoadedImages(loadedImages + 1)}>
              <IoIosArrowUp />
            </button>
            <button onClick={() => setLoadedImages(loadedImages - 1)}>
              <IoIosArrowDown />
            </button>
          </div>
          <span className="font-semibold bg-blue-50 p-1 rounded-md mx-2">
            {loadedImages}
          </span>
        </div>
      </div>

      {/* Image Grid */}
      {viewImage && (
        <div className="w-full h-full fixed z-50 top-0 left-0  bg-black bg-opacity-75 flex justify-center items-center">
          <span
            onClick={() => setViewImage(false)}
            className="text-white absolute top-4 right-4 hover:cursor-pointer"
          >
            Close
          </span>
          <div className=" p-4 flex flex-col">
            <img
              src={img.urls?.full}
              alt={img.alt_description}
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}

      {loading && images.length === 0 ? (
        <div className="flex justify-center items-center h-full w-full">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          ></div>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 500: 3, 700: 4, 900: 6 }}
          className="mt-20"
        >
          <Masonry gutter="10px">
            {images.map((image, ind) => {
              const index = ind;
              const randomHeight =
                Math.floor(Math.random() * (450 - 250 + 1)) + 250;
              return (
                <div
                  className="relative"
                  key={index}
                  onClick={() => handleClickOnImg(image)}
                >
                  <LazyImage
                    src={image.urls.regular}
                    alt={image.alt_description || "Image"}
                    height={randomHeight}
                  ></LazyImage>
                  <div className="flex flex-col mt-2">
                    <p className="text-sm font-semibold flex justify-between items-center">
                      {image.user.name}
                      <Link
                        to={`/user/${image.user.username}`}
                        className="text-blue-500 text-sm flex justify-center items-center"
                      >
                        <img
                          src={image.user.profile_image.small}
                          className="w-10 h-10 rounded-full bg-slate-800 bg-contain"
                          alt="profile"
                        ></img>
                      </Link>
                    </p>
                    <p className="text-xs text-gray-400">
                      {image.alt_description}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-center">
                        <CiHeart className="text-xl" />
                        <span className="text-sm ml-1">{image.likes}</span>
                      </div>
                      <div className="mr-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(image.urls.full, `${image.id}.jpg`);
                          }}
                          className="p-2 rounded-full opacity-100"
                        >
                          <FiDownload />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}

      {/* Load More Button */}
      {images.length > 0 && !loading && (
        <div className="text-center mt-20">
          <button
            className={`w-3/4 h-14 border hover:scale-105 duration-300 ease-in-out font-bold py-2 px-4 rounded ${
              mode ? "text-white" : "text-black"
            }`}
            onClick={loadMoreImages}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

const LazyImage = ({ src, alt, height }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px 300px 0px",
  });

  return (
    <div
      className="overflow-hidden"
      style={{ marginBottom: "10px", borderRadius: "20px" }}
      ref={ref}
    >
      {inView && (
        <motion.img
          className="hover:scale-125 duration-300 ease-in-out"
          src={src}
          alt={alt}
          style={{ width: "100%", height: `${height}px`, objectFit: "cover" }}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
    </div>
  );
};

export default Explore;
