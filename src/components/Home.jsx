'use client';

import React, { useState } from "react";
import Image from "next/image";
import gif from '../Photos/remove.bg.gif';
import { UserAuth } from '../context/AuthContext';

export default function BgRemover() {
  const { user, googleSignIn, logout } = UserAuth();
  const [image, setImage] = useState(null);
  const [bgRemove, setBgRemove] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleChanges = () => {
    if (user) {
      setLoading(true);
      setShowOverlay(true);

      const apiKey = "c5vTNSwhng2NwayLXacEoNUw";
      const url = "https://api.remove.bg/v1.0/removebg";

      const formData = new FormData();
      formData.append("image_file", image, image.name);
      formData.append("size", "auto");

      fetch(url, {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: formData,
      })
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setBgRemove(reader.result);
            setLoading(false);
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    } else {
      alert("You must need to login first!");
    }
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = bgRemove;
    downloadLink.download = "removed_background.png";
    downloadLink.click();
  };

  const handleClose = () => {
    setShowOverlay(false);
    setBgRemove(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 max-sm:m-12" id="home">
      {image && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 flex items-center justify-center">
          <div className="w-full h-full absolute top-0 left-0 backdrop-filter backdrop-blur-sm flex items-center justify-center">
            <div className="w-96 h-96 relative">
              <Image
                className="w-full h-full object-cover rounded-lg"
                src={URL.createObjectURL(image)}
                alt="bgRemoverImg"
                layout="fill"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 px-3 py-1 text-xl bg-red-500 text-white rounded-full"
              >
                X
              </button>
              <div className='ml-14 pl-7'>
                <button
                  className="absolute bottom-4 px-6 py-2  bg-yellow-400 hover:bg-yellow-300  text-white rounded-md cursor-pointer"
                  onClick={handleChanges}
                >
                  Remove Background
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="gap-8 items-center py-12 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-8">
        <div className="w-69 h-64 md:w-96 md:h-96 py-14 rounded-full">
          <Image
            className="w-full h-auto rounded-[30px] max-w-[320px] lg:max-w-[420px]"
            src={gif}
            alt="bgRemoverImg"
            width={100}
            height={100}
          />
        </div>
        <div className="mt-4 md:mt-0">
          <div className="">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
              Remove the <br />
              <span className="text-blue-500">background</span> from <br />
              images <span className="text-blue-500">for free.</span>
            </h1>
            <p className="text-[14px] text-gray-600 mt-4">
              Remove background from images of humans, animals, or objects and
              <br /> download high-resolution images for free.
            </p>
            <div className="mt-12">
              <label
                htmlFor="image-upload"
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-white rounded-md cursor-pointer"
              >
                Choose File
                <input
                  type="file"
                  id="image-upload"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {image && !bgRemove && !loading && (
                <button
                  className="px-6 py-2  text-black rounded-md cursor-pointer"
                  onClick={handleChanges}
                >
                  {loading ? "Loading..." : "Remove Background"}
                </button>
              )}
              {showOverlay && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="bg-white p-4 rounded-lg">
                      {bgRemove && (
                        <img src={bgRemove} alt="Remove Background" />
                      )}
                      <div className="flex justify-between mt-4">
                        <button onClick={handleDownload}>Download Image</button>
                        <button onClick={handleClose}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!image && !bgRemove && !loading && (
                <p className="text-[14px] text-gray-500 mt-2">
                  Drop an image or paste URL
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
