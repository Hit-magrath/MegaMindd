extends Node2D

@onready var dialogue_ui = %DialogueUI
@onready var background = %Background

var transition_effect: String = "fade"
var dialogue_file: String = "res://GoatStory/resources/story/story.json"
var dialogue_index : int = 0
var dialogue_lines : Array = []
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	#load dialog
	dialogue_lines = load_dialogue(dialogue_file)
	#Connect signals
	dialogue_ui.choice_selected.connect(_on_choice_selected)
	#We want to process the first line of the dialogue
	dialogue_index = 0
	process_current_line()

func _input(event):
	var line = dialogue_lines[dialogue_index]
	var has_choices = line.has("choices")
	if event.is_action_pressed("next_line") and not has_choices:
		if dialogue_index < len(dialogue_lines) - 1:
			dialogue_index += 1
			process_current_line()

func process_current_line():
	if dialogue_index >= dialogue_lines.size() or dialogue_index < 0:
		printerr("Error: dialogue_index out of bounds: ", dialogue_index)
		return
	
	#Extract current line
	var line = dialogue_lines[dialogue_index]
	
	#Check if this is the end of our scene
	if line.has("next_scene"):
		var next_scene = line["next_scene"]
		dialogue_file = "res://GoatStory/resources/story/" + next_scene + ".json" if !next_scene.is_empty() else ""
		print(dialogue_file)
		
		
		#Some code on transition
		#Smae here

		#process_current_line()
		return
		
	if line.has("location"):
		
		#Change background
		var background_file = "res://GoatStory/background_images/" + line["location"] + ".png"
		background.texture = load(background_file)
		
		#Proceed to the next line
		dialogue_index += 1
		process_current_line()
		return
	#Check if this is a goto command
	if line.has("goto"):
		dialogue_index = get_anchor_position(line["goto"])
		process_current_line()
		return 
	
	#Check if this is just  an anchor
	if line.has("anchor"):
		dialogue_index += 1
		process_current_line()
		return
	
	if line.has("choices"):
		#Display choices
		dialogue_ui.display_choices(line["choices"])
	else:
		dialogue_ui.speaker_name.text = line["speaker"]
		dialogue_ui.dialogue_line.text = line["text"]

func  get_anchor_position(anchor: String):
	#Find the anchor entry with matching name
	for i in range(dialogue_lines.size()):
		if dialogue_lines[i].has("anchor") and dialogue_lines[i]["anchor"] == anchor:
			return i
			
	#if we get here the anchor wasnt found
	printerr("Error: Could not find anchor '" + anchor + "'")
	return null

func load_dialogue(file_path):
	#Check if the file exists
	if not FileAccess.file_exists(file_path):
		printerr("Error:File does not exist: ", FileAccess)
		return null
		
	#Open the file
	var file = FileAccess.open(file_path, FileAccess.READ)
	if file == null:
		printerr("Error: Failed to open file: ", file_path)
		return null
		
	#Read the content as text
	var content = file.get_as_text()
	
	#Parse the json
	var json_content = JSON.parse_string(content)
	
	#Check if parsing was successful
	if json_content == null:
		printerr("Error: Failed to parse JSON from file: ", file_path)
		return null
	
	#Return dialogue
	return json_content

func _on_choice_selected(anchor: String):
	dialogue_index = get_anchor_position(anchor)
	process_current_line()
