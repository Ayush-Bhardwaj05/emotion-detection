"use client";
import { useState, useRef } from "react";

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [savedFilePath, setSavedFilePath] = useState<string | null>(null);
  const [responses, setResponses] = useState<string[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");

      // Send the audio file to the backend
      const response = await fetch("http://127.0.0.1:8000/convo/process-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSavedFilePath(data.file_path);
      setAudioURL(URL.createObjectURL(audioBlob));

      // Update the state with the new response and log it
      setResponses((prev) => {
        const updated = [...prev, data.response];
        console.log("Responses:", updated);
        return updated;
      });

      // Clear the audio chunks for the next recording
      audioChunks.current = [];
    };

    mediaRecorder.current = recorder;
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Audio Recorder</h1>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-lg text-white ${isRecording ? "bg-red-500" : "bg-blue-500"}`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {/* {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL} />
          {savedFilePath && <p className="mt-2">Saved at: {savedFilePath}</p>}
        </div>
      )} */}
    </div>
  );
}
