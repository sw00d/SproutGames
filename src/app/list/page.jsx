"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect, useMemo } from "react";
import GameTile from "@/components/GameTile";
import Image from "next/image";
import clsx from "clsx";
import Header from "@/components/Header";
import SimpleMDEditor from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import SubscriptionTab from "@/components/SubscriptionTab";
import GameOverview from "@/components/GameOverview";
import { useRouter } from 'next/navigation';



export default function NewGame() {
  const [gameDetails, setGameDetails] = useState({
    title: "",
    description: "",
    image: '/placeholder.webp',
    overview: defaultGameOverview,
    email: "",
    website: "",
  });

  const [showOverviewForm, setShowOverviewForm] = useState(false);
  const overviewFormRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGameDetails((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name,
    }));
    setGameDetails((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos].slice(0, 10),
    }));
  };

  const handlePrimaryPhotoSelect = (index) => {
    setGameDetails((prev) => ({ ...prev, primaryPhoto: index }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch("/api/games/", {
        method: "POST",
        body: JSON.stringify(gameDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to save game details");
      }

      const data = await response.json();

      // redirect user to the game page
      router.push(`/games/${data.id}`);
    } catch (error) {
      console.error("Error saving game:", error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (showOverviewForm && overviewFormRef.current) {
      overviewFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showOverviewForm]);


  const disableSubmit = useMemo(() => {
    return (
      loading
      || !gameDetails.title
      || !gameDetails.description
      || !gameDetails.image
      || !gameDetails.overview
      || !gameDetails.email
      || !gameDetails.website
      || !validateEmail(gameDetails.email)
    )
  }, [loading, gameDetails])

  return (
    <>
      <Header />
      <form
        className="container mx-auto px-4 py-8 text-gray-900"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col xl:flex-row items-center gap-8 mt-10">
          <div className='w-full xl:w-1/3'>
            <SubscriptionTab />
          </div>

          {/* Form Section */}
          <div className="w-full xl:w-1/3">
            <GameDetailsForm
              gameDetails={gameDetails}
              onInputChange={handleInputChange}
              onImageUpload={handleImageUpload}
              onSubmit={() => setShowOverviewForm(true)}
            />
          </div>

          {/* Preview Section */}
          <div className="flex justify-center w-full xl:w-1/3">
            <div className="w-full md:w-[384px]">
              {gameDetails.image && (
                <GameTile game={gameDetails} disabledClick />
              )}
            </div>
          </div>
        </div>

        {showOverviewForm && (
          <>
            <div ref={overviewFormRef} className="flex flex-col lg:flex-row gap-8 mt-8">
              <div className='flex-1 max-w-1/2'>
                <GameOverviewForm
                  gameDetails={gameDetails}
                  onInputChange={handleInputChange}
                  onPhotoUpload={handlePhotoUpload}
                  onPrimaryPhotoSelect={handlePrimaryPhotoSelect}
                />
              </div>

              <div className='flex-1 max-w-1/2'>
                <GameOverview game={gameDetails} />
              </div>

            </div>

            <div className="flex justify-center items-center mt-10">

              <button
                onClick={handleSubmit}
                disabled={disableSubmit}
                className={clsx(
                  "font-bold text-xl py-8 px-20 rounded",
                  "transition duration-300",
                  {
                    "bg-highlight text-white": !disableSubmit,
                    "bg-gray-300 text-gray-500 opacity-50": disableSubmit,
                  }
                )}
              >
                Submit Game
              </button>
            </div>
          </>

        )}

      </form>
    </>
  );
}

function GameOverviewForm({
  gameDetails,
  onInputChange,
  onPhotoUpload,
  onPrimaryPhotoSelect,
}) {
  const fileInputRef = useRef(null);
  const [emailError, setEmailError] = useState('');

  const mdeOptions = useMemo(() => {
    return {
      spellChecker: false,
      hideIcons: ["image", "side-by-side", "fullscreen", "guide", "preview", "quote", 'ordered-list', 'unordered-list'],
      status: false,
    };
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (!value) {
        setEmailError('Email is required');
      } else if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
      onInputChange({ target: { name, value } });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <div className="mb-4">
        <SimpleMDEditor
          placeholder="Game Overview"
          id="overview"
          value={gameDetails.overview}
          onChange={(value) =>
            onInputChange({ target: { name: "overview", value } })
          }
          options={mdeOptions}
        />
      </div>
      <div className="mb-4 mt-8">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Contact Email"
          value={gameDetails.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
      </div>
      <div className="mb-4">
        <input
          type="url"
          id="website"
          name="website"
          placeholder="Game Website/Link"
          value={gameDetails.website}
          onChange={onInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {/* <div className="mb-4">
        <label htmlFor="photos" className="block mb-2">
          Upload Photos (Max 10)
        </label>
        <input
          type="file"
          id="photos"
          ref={fileInputRef}
          onChange={onPhotoUpload}
          multiple
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={triggerFileInput}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Choose files</span>
        </button>
        <div className="flex flex-wrap gap-4 mt-4">
          {gameDetails.photos.map((photo, index) => (
            <div
              key={index}
              className={`cursor-pointer p-2 border ${gameDetails.primaryPhoto === index ? "border-blue-500" : ""
                }`}
              onClick={() => onPrimaryPhotoSelect(index)}
            >
              <img
                src={photo.preview}
                alt={photo.title}
                className="w-16 h-16 object-cover"
              />
              <p className="text-xs mt-1">{photo.title}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

const GameDetailsForm = ({
  gameDetails,
  onInputChange,
  onImageUpload,
  onSubmit,
}) => {
  const fileInputRef = useRef(null);
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <input
          type="file"
          id="image"
          name="image"
          ref={fileInputRef}
          onChange={onImageUpload}
          className="hidden"
          accept="image/*"
        />
        <button
          type="button"
          onClick={triggerFileInput}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Image (16:9)</span>
        </button>
      </div>

      <div>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Name of your game"
          value={gameDetails.title}
          onChange={onInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          id="description"
          name="description"
          placeholder="Game description"
          value={gameDetails.description}
          onChange={onInputChange}
          className="w-full p-2 border rounded"
          rows="1"
          required
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={
          !gameDetails.title || !gameDetails.description || !gameDetails.image
        }
        className={clsx(
          "font-bold py-2 px-16 w-full rounded",
          "transition duration-300",
          {
            "bg-highlight text-white": !(
              !gameDetails.title ||
              !gameDetails.description ||
              !gameDetails.image
            ),
            "bg-gray-300 text-gray-500 opacity-50":
              !gameDetails.title ||
              !gameDetails.description ||
              !gameDetails.image,
          }
        )}
      >
        Next
      </button>
    </div>
  );
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const defaultGameOverview = `
# 🕹️ Game Information

## 🎮 Game Title

 *Super Awesome Adventure*

## 🖋️ Description

 *Super Awesome Adventure is a thrilling platformer where you navigate through mystical lands to save the kingdom.*


## 🌍 Platform

 *PC, Xbox, PlayStation, Switch*

## 🧩 Genre

 *Action, Adventure, Puzzle, RPG*

## 🎨 Key Features


- **Feature 1:** *Immersive story-driven gameplay*
- **Feature 2:** *Beautiful hand-drawn graphics*
- **Feature 3:** *Challenging puzzles and quests*
- **Feature 4:** *Multiplayer mode with online co-op*

`