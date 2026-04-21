import speech_recognition as sr
from pydub import AudioSegment

def speech_to_text(audio):
	if audio:
		audio_path = "temp_audio.webm"
		audio.save(audio_path)

		# convert webm → wav
		sound = AudioSegment.from_file(audio_path, format="webm")
		wav_path = "uploads/temp_audio.wav"
		sound.export(wav_path, format="wav")

		recognizer = sr.Recognizer()
		with sr.AudioFile(wav_path) as source:
			audio_data = recognizer.record(source)
			try:
				audio_text = recognizer.recognize_google(audio_data)
			except:
				audio_text = "Could not understand audio"

		# 👉 append to message
		return f"\n\n[Audio]: {audio_text}"