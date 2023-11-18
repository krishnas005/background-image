'use client'

import React, { useState } from "react";
import Image from "next/image";
import gif from '../Photos/remove.bg.gif';

export default function BgRemover() {

    const [image, setImage] = useState(null);
    const [bgRemove, setBgRemove] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const handleChanges = () => {
    setLoading(true);
    setShowOverlay(true);

    // const apiKey = "3AtBA5UX5trVSSSAb6Gw4LedOBy8RJVf";
    const apiKey = "22cdb5844daa336df5239a73558edf7b7a7639dc";
    // const url ="https://api.picsart.io/tools/1.0/removebg";
    const url = "https://beta-sk.photoroom.com/v1/instant-backgrounds?apikey={apiKey}&prompt={sky}&imageUrl={image}";

    const formData = new FormData();
    formData.append("image_url","https://pastatic.picsart.com/cms-pastatic/ce680c38-42e8-469c-88db-567e87f05267.png" );
    formData.append("output_type", "cutout");
    formData.append("format", "PNG");
    // formData.append("bg_image_url", "https://pastatic.picsart.com/cms-pastatic/ff0747d4-e881-4779-b1bf-b4caa0709290.png");

    fetch(url, {
        method: "POST",
        headers: {
            "x-picsart-api-key": apiKey,
        },
        body: formData,
        })
        .then((response) => {
            if (response.ok) {
            var res = response.blob();
            console.log(res);
            return res;
            } else if (response.status === 429) {
                throw new Error("Too Many Requests");
            }  else {
            throw new Error("Network response was not ok.");
            }
        })
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
        <div className="gap-8 items-center py-12 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-8">
        <div className="w-69 h-64 md:w-96 md:h-96 py-14 rounded-full">
            <Image className="w-full h-auto rounded-[30px] max-w-[320px] lg:max-w-[420px]"
            src={gif}
            alt="bgRemoverImg"
            width={100}
            height={100}
            />
        </div>
        <div className="mt-4 md:mt-0">
            <div className="">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Change the <br />background from <br />images for free.</h1>
            <p className='text-[14px] text-gray-500 mt-4'>Change background for images of humans, animals, or objects and<br /> download high-resolution images for free.</p>
            <div className='mt-12'>
                <label htmlFor="image-upload" className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-white rounded-md cursor-pointer">
                Choose File
                <input
                    type="file"
                    id="image-upload"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                />
                </label>
                {image && !bgRemove && !loading && (
                <button className="px-6 py-2  text-black rounded-md cursor-pointer" onClick={handleChanges}>
                    {loading ? "Loading..." : "Remove Background"}
                </button>
                )}
                {showOverlay && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    {loading ? (
                    <p>Loading...</p>
                    ) : (
                    <div className="bg-white p-4 rounded-lg">
                        {bgRemove && <img src={bgRemove} alt="Remove Background" />}
                        <div className="flex justify-between mt-4">
                        <button onClick={handleDownload}>Download Image</button>
                        <button onClick={handleClose}>Close</button>
                        </div>
                    </div>
                    )}
                </div>
                )}
                {!image && !bgRemove && !loading && (
                <p className='text-[14px] text-gray-500 mt-2'>Drop an image or paste URL</p>
                )}
            </div>
            </div>
        </div>
        </div>
    </main>
    );
}
