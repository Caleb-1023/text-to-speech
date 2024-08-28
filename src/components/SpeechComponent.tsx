"use client";

import React, { useState, useEffect, useRef } from "react";

const Home: React.FC = () => {
  const [text, setText] = useState("This is some sample text to be read.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [isPaused, setIsPaused] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
    if (availableVoices.length > 0) {
      setSelectedVoice(availableVoices[0].name);
    }
  }, []);

  const speakText = () => {
    if (synthRef.current) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
    synthRef.current = utterance;

    setIsPaused(false);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPaused(false);
  };

  return (
    <div className="min-w-[600px] space-y-5">
      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="text-to-read">Text to Read:</label>
        <textarea
          id="text-to-read"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          cols={50}
          className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <label className="font-medium">Choose Voice:</label>
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="w-full p-2 text-black text-sm border border-gray-300 rounded"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} {voice.lang}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={speakText}
          className="basis-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:cursor-not-allowed"
        >
          Speak
        </button>
        <button
          onClick={pauseSpeech}
          className="basis-1/5 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Pause
        </button>
        <button
          onClick={resumeSpeech}
          className="basis-1/5 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Resume
        </button>
        <button
          onClick={stopSpeech}
          className="basis-1/5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default Home;
