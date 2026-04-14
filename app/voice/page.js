'use client';
import React, { useRef, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";

export default function VoicePage() {
  const ws = useRef(null);
  const mediaRecorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const audioChunksRef = useRef([]);
  const [responseAudioUrl, setResponseAudioUrl] = useState(null);

  // Start recording and open WebSocket
  const startRecording = async () => {
    try {
      ws.current = new WebSocket("ws://localhost:8080");
      ws.current.addEventListener('open', () => {
        console.log('Connected to server');
        ws.current.send('hello from client!');
      });

      ws.current.addEventListener('close', async () => {
        console.log('WebSocket connection closed');
        setIsProcessing(true); // Now try to fetch response audio
        await fetchServerAudio();
      });

      ws.current.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
        setIsProcessing(false);
      });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/mp4';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = '';
        }
      }

      mediaRecorder.current = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      audioChunksRef.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          // Stream chunks immediately
          if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(event.data);
          }
        }
      };

      mediaRecorder.current.onstop = async () => {
        // After stop, send combined audio and close socket
        const blob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        const arrayBuffer = await blob.arrayBuffer();
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(arrayBuffer);
          ws.current.close(); // Close triggers processing and frontend fetch
        }
        stream.getTracks().forEach(track => track.stop());
        setIsProcessing(true);
      };

      mediaRecorder.current.start(1000); // record in chunks
      setIsRecording(true);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
  };

  // Fetch audio from server after recording/upload is done
  const fetchServerAudio = async () => {
    try {
      const response = await fetch("http://localhost:8080/voice");
      const data = await response.json();
      console.log(data);
      console.log(`Got data from server ${data}`);

      if (data.audioBase64 && data.audioBase64.audios) {
      playAudioChunks(data.audioBase64.audios);
    }

    } catch (err) {
      console.log("no response yet, retrying...",err);
      setTimeout(fetchServerAudio, 5000);
    }
  };


  function playAudioChunks(base64Array) {
  let current = 0;

  function playNext() {
    if (current >= base64Array.length) return;

    const base64 = base64Array[current];
    // Convert base64 to binary
    const binary = atob(base64);
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buffer[i] = binary.charCodeAt(i);
    }

    // Create blob: WAV audio
    const audioBlob = new Blob([buffer], { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);

    audio.onended = () => {
      current += 1;
      playNext(); // Play next chunk after current finishes
    };
    audio.play();
  }

  playNext();
  startRecording();
}
  return (
    <>
    <Canvas shadows camera={{ position: [0,0,8], fov: 30 }}>
      
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Voice Assistant</h2>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={startRecording}
          disabled={isRecording || isProcessing}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isRecording ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isRecording || isProcessing ? 'not-allowed' : 'pointer'
          }}
        >
          {isRecording ? 'Recording...' : 'Start Recording'}
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: !isRecording ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: !isRecording ? 'not-allowed' : 'pointer',
            marginLeft: '10px'
          }}
        >
          Stop Recording
        </button>
      </div>

      {/* Status indicator */}
      <div style={{ marginTop: '20px' }}>
        {isRecording && (
          <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
            🎤 Recording... Speak now!
          </p>
        )}
        {isProcessing && (
          <p style={{ color: '#2196F3', fontWeight: 'bold' }}>
            🤖 Processing your voice... Please wait
          </p>
        )}
        {responseAudioUrl && (
          <div>
            <p style={{ color: '#673ab7', fontWeight: 'bold' }}>
              ▶️ Response Audio:
            </p>
            <audio controls src={responseAudioUrl} style={{ width: '100%' }} />
          </div>
        )}
      </div>
    </div>
    </>
    
  );
}
