import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function Audio({setAudio}) {
	const [recording, setRecording] = useState(false);
	const [audioURL, setAudioURL] = useState(null);
	const [text, setText] = useState("");
	const [volume, setVolume] = useState(0);

	const mediaRecorderRef = useRef(null);
	const audioChunks = useRef([]);
	const streamRef = useRef(null);
	const analyserRef = useRef(null);

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		streamRef.current = stream;

		mediaRecorderRef.current = new MediaRecorder(stream);

		mediaRecorderRef.current.ondataavailable = (event) => {
			audioChunks.current.push(event.data);
		};
		mediaRecorderRef.current.onstop = handleStop;

		const audioContext = new AudioContext();
		const analyser = audioContext.createAnalyser();
		const source = audioContext.createMediaStreamSource(stream);
		source.connect(analyser);

		analyser.fftSize = 256;
		const dataArray = new Uint8Array(analyser.frequencyBinCount);

		analyserRef.current = analyser;

		const animate = () => {
			if (!streamRef.current) return;
			analyser.getByteFrequencyData(dataArray);

			let sum = 0;
			for (let i = 0; i < dataArray.length; i++) {
				sum += dataArray[i];
			}

			const avg = sum / dataArray.length;

			const mappedValue = Math.floor((avg / 255) * 800 + 100);

			setVolume(mappedValue);

			requestAnimationFrame(animate);
		};

		audioChunks.current = [];
		mediaRecorderRef.current.start();
		setRecording(true);
		animate();
	};

	const stopRecording = () => {
		if (!streamRef.current) return;
		mediaRecorderRef.current.stop();
		streamRef.current.getTracks().forEach(track => track.stop());
		streamRef.current = null;
		console.log("stop recording ....");
		setRecording(false);
	};

	const handleStop = async () => {
		const blob = new Blob(audioChunks.current, { type: "audio/webm" });
		const url = URL.createObjectURL(blob);
		setAudioURL(url);
		setAudio(blob);
		audioChunks.current = [];
	};

	return (
		<div className={`shrink-0 text-sm flex flex-col rounded-md overflow-hidden`}>

			{!recording ?
				<button className="text-black p-2 bg-white/90 rounded cursor-pointer" onClick={startRecording} disabled={recording}>
					<FaMicrophone className="w-5 h-5"/>
				</button>
				:
				<button className="text-black p-2 bg-white/80 rounded cursor-pointer" onClick={stopRecording} disabled={!recording}>
					{/* <FaMicrophone/> */}
					<div className="p-2 border-2 border-black border-t-transparent rounded-full animate-spin">
					</div>
				</button>
			}
		</div>
	);
}

export default Audio;