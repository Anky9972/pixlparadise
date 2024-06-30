import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FiDownload } from "react-icons/fi";
import { Auth } from "../context/Auth";
import toast from "react-hot-toast";

const UserProfile = ({ mode }) => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewImage, setViewImage] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [img, setImg] = useState('');
  const {isLoggedIn} = useContext(Auth);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=sPHzXPFNJ5B-TiuA3U_Tf1wyfsIRNln5wP4ATWsKDoo`);
        const data = await response.json();
        setUser(data);

        const photosResponse = await fetch(`https://api.unsplash.com/users/${username}/photos?client_id=sPHzXPFNJ5B-TiuA3U_Tf1wyfsIRNln5wP4ATWsKDoo`);
        const photosData = await photosResponse.json();
        setUserPhotos(photosData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleImageClick = (imageUrl) => {
    setImg(imageUrl);
    setViewImage(true);
  };
  const handleProfile = (imageUrl) => {
    setImg(imageUrl);
    setViewProfile(true);
  };

  const handleDownload = async (url, filename) => {
    if(isLoggedIn){

      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
    else{
      toast.error("First login to your account");
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 mt-20 min-h-screen ${mode ? 'bg-gray-900' : 'bg-white'}`}>
        {viewProfile && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <span onClick={() => setViewProfile(false)} className="text-white absolute top-4 right-4 cursor-pointer">Close</span>
          <img src={img} alt="view" className="max-w-full max-h-full" />
        </div>
      )}
      {viewImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <span onClick={() => setViewImage(false)} className="text-white absolute top-4 right-4 cursor-pointer">Close</span>
          <img src={img} alt="view" className="max-w-full max-h-full" />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-8">
            <img src={user.profile_image?.large} alt={user.name} className="rounded-full w-20 h-20 mr-4" onClick={()=>handleProfile(user.profile_image?.large)}/>
            <div>
              <h1 className={`text-2xl font-bold ${mode ? "text-white" : " text-black"}`}>{user.name}</h1>
              <p className={`text-sm  ${mode ? " text-gray-400":"text-gray-600"}`}>{user.bio}</p>
              <p className={`text-sm  ${mode ? " text-gray-400":"text-gray-600"}`}>{user.location}</p>
            </div>
          </div>
          <h2 className={`text-xl font-bold mb-4 ${mode ? "text-white" : " text-black"}`}>Photos by {user.name}</h2>
          <ResponsiveMasonry columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 6 }}>
            <Masonry gutter="10px">
              {userPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description}
                    className="w-full h-auto cursor-pointer"
                    style={{ borderRadius: "10px" }}
                    onClick={() => handleImageClick(photo.urls.full)}
                  />
                  <button
                    onClick={() => handleDownload(photo.urls.full, `${photo.id}.jpg`)}
                    className="absolute bottom-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiDownload />
                  </button>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </>
      )}
    </div>
  );
};

export default UserProfile;
