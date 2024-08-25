import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { quantum } from "ldrs";
import { MainContext } from "../../contexts/MainContext";
import { useNavigate } from "react-router-dom";

quantum.register();

const UploadPage = () => {
  const history = useNavigate();
  const { file, setFile } = useContext(MainContext);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);

    setLoading(true); // Start the loader
    setStatusMessage("Processing document...");

    try {
      const response = await axios.post(
        `${config.BACKEND_ENDPOINT}/upload`,
        formData
      );
      setStatusMessage("Processing done...");

      setTimeout(() => {
        setStatusMessage("Performing chunking...");
        setTimeout(() => {
          setStatusMessage("Performing NER...");
          setTimeout(() => {
            setStatusMessage("Upserting to Pinecone...");
            setTimeout(() => {
              setStatusMessage("Done!");
              setLoading(false);
              history("/chat");
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);

      if (response.status === 200 || response.statusText === "OK") {
        console.log("File uploaded successfully", response.data);
      } else {
        setStatusMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Upload failed. Please try again.");
      console.error("Error uploading file", error);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#181407] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 rounded-2xl shadow-lg"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://miro.medium.com/v2/resize:fit:1400/1*iHYlC0VfcacLDeLTtGkNuw.jpeg")',
                  }}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      AI-Enhanced Document QA System
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Drag and drop a PDF or click to upload. No sign-in
                      required.
                    </h2>
                  </div>
                  <div className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="application/pdf"
                      placeholder="Choose file"
                      className="block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FAC638]/80 file:text-black hover:file:bg-[#e5b42a]/80 cursor-pointer backdrop-blur-sm rounded-lg p-5"
                    />
                  </div>
                </div>
              </div>
            </div>
            {file && (
              <div className="flex px-4 py-3 justify-center">
                <button
                  className="flex min-w-[84px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#FAC638] text-sm font-bold leading-normal tracking-[0.015em]"
                  onClick={handleUpload}
                >
                  <span className="truncate">Get started</span>
                </button>
              </div>
            )}
            <div className="flex flex-col gap-3 p-4 items-center justify-center">
              <div className="flex flex-col gap-6 justify-between items-center">
                <p className="text-[#FFFFFF] text-base font-medium leading-normal">
                  {statusMessage}
                </p>
                {loading && (
                  <l-quantum size="45" speed="1.75" color="white"></l-quantum>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
