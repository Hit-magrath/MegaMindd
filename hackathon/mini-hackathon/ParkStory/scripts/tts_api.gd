extends Node

var voice = ""

func _ready():
	var voices = DisplayServer.tts_get_voices_for_language("en")
	if voices.size() > 0:
		voice = voices[0]
		print("Using voice:", voice)
	else:
		push_error("No English TTS voice available on this device.")

func speak(text: String):
	if voice == "":
		return
	DisplayServer.tts_speak(text, voice)

func stop():
	DisplayServer.tts_stop()
