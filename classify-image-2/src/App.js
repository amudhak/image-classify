import React, { useState, useEffect } from 'react';
//import { GoogleLogin } from '@react-oauth/google';

function ImageLabeling() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);

  useEffect(() => {
    // Fetch images from the shared Google Drive folder
    fetchImagesFromGoogleDrive();
  }, []);

  const fetchImagesFromGoogleDrive = async () => {
    try {
      const folderId = '128vMi0LdY-f3d2rj_LHl_QRJ6TSBbpv3'; // ID of the folder
      const apiKey = 'AIzaSyBqCxASkydELSoQoBTUCOvkK9wuboH4YlQ'; // Replace with your Google Drive API key

      const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`);
      const data = await response.json();

      // Filter out only images
      const imageFiles = data.files.filter(file => file.mimeType.startsWith('image/'));

      // Construct image URLs
      const imageUrls = imageFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: `https://drive.usercontent.google.com/download?id=${file.id}&authuser=0`
        //url: file.thumbnailLink
      }));

      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleResponse = (response, questionIndex) => {
    const updatedUserResponses = [...userResponses];
    updatedUserResponses[currentImageIndex][questionIndex] = response;
    setUserResponses(updatedUserResponses);

    // Move to the next image if all questions are answered for the current image
    const allQuestionsAnswered = updatedUserResponses[currentImageIndex].every(answer => answer !== undefined);
    if (allQuestionsAnswered && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  useEffect(() => {
    // Initialize userResponses state with empty responses for each image
    setUserResponses(images.map(() => [undefined, undefined, undefined]));
  }, [images]);

  return (
    <div>
      <h1>Sample Labeling</h1>
      {images.length > 0 && currentImageIndex < images.length && (
        <div>
          <h2>{images[currentImageIndex].name}</h2>
          <img src={images[currentImageIndex].url} alt={images[currentImageIndex].name} />
          <div>
            <p>Question 1:</p>
            <button onClick={() => handleResponse(true, 0)}>True</button>
            <button onClick={() => handleResponse(false, 0)}>False</button>
          </div>
          <div>
            <p>Question 2:</p>
            <button onClick={() => handleResponse(true, 1)}>True</button>
            <button onClick={() => handleResponse(false, 1)}>False</button>
          </div>
          <div>
            <p>Question 3:</p>
            <button onClick={() => handleResponse(true, 2)}>True</button>
            <button onClick={() => handleResponse(false, 2)}>False</button>
          </div>
        </div>
      )}
      {currentImageIndex === images.length && (
        <div>
          <h2>All images labeled!</h2>
          <pre>{JSON.stringify(userResponses, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className = "container">
      <div className = "image-labeling">
        <ImageLabeling />
      </div>
    </div>
  );
}

export default App;

