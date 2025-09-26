extends Node2D

@onready var background = %Background
@onready var character = %Character
@onready var dialogUI =%DialogueUI 

var dialog_index : int = 0
var dialog_lines : Array = []

func _ready() -> void:
	# Load the JSON file
	dialog_lines = load_json("res://GardenStory/resources/story/story.json")
	
	if dialog_lines.is_empty():
		printerr("ERROR: No dialog lines loaded!")
		return
	
	print("Loaded ", dialog_lines.size(), " dialog lines")
	
	# Connect signals - make sure your DialogUI has this signal
	if dialogUI.has_signal("choice_selected"):
		dialogUI.choice_selected.connect(_on_choice_selected)
	else:
		print("WARNING: DialogUI doesn't have choice_selected signal")
	
	# Start processing from the beginning
	dialog_index = 0
	process_current_line()

func _input(event: InputEvent) -> void:
	# Make sure we don't go out of bounds
	if dialog_index >= dialog_lines.size():
		return
		
	var line = dialog_lines[dialog_index]
	var has_choice = line.has("choices")
	
	# Only advance on input if there are no choices showing
	if event.is_action_pressed("next_line") and not has_choice:
		if dialogUI.animate_text:
			dialogUI.skip_animation()
		else:
			advance_dialogue()

func advance_dialogue():
	if dialog_index < dialog_lines.size() - 1:
		dialog_index += 1
		process_current_line()
	else:
		print("End of story reached!")

func process_current_line():
	if dialog_index >= dialog_lines.size():
		print("End of dialog reached")
		return
	
	var line = dialog_lines[dialog_index]
	print("Processing line ", dialog_index, ": ", line)
	
	# Handle different line types
	if line.has("next_scene"):
		print("Scene transition: ", line.get("next_scene", "unknown"))
		# You can add scene transition logic here
		return
	
	elif line.has("location"):
		change_background(line["location"])
		# After changing background, move to next line
		advance_dialogue()
		return
	
	elif line.has("goto"):
		var anchor_pos = get_anchor_position(line["goto"])
		if anchor_pos != null:
			dialog_index = anchor_pos
			process_current_line()
		else:
			print("ERROR: Could not find goto anchor: ", line["goto"])
		return
	
	elif line.has("anchor"):
		# Skip anchor declarations
		advance_dialogue()
		return
	
	elif line.has("choices"):
		# Display choices
		print("Displaying choices: ", line["choices"])
		dialogUI.display_choices(line["choices"])
	
	elif line.has("speaker") and line.has("text"):
		# Display regular dialogue
		print("Displaying dialogue: ", line["speaker"], " - ", line["text"])
		dialogUI.change_line(line["speaker"], line["text"])
	
	else:
		print("WARNING: Unknown line type: ", line)
		advance_dialogue()

func change_background(location_name: String):
	var background_file = "res://GardenStory/assets/enchanted_garden/" + location_name + ".png"
	print("Attempting to load background: ", background_file)
	
	if ResourceLoader.exists(background_file):
		var texture = load(background_file)
		if texture:
			background.texture = texture
			print("Background changed successfully to: ", location_name)
		else:
			print("ERROR: Could not load texture: ", background_file)
	else:
		print("ERROR: Background file not found: ", background_file)
		# List available files for debugging          
		print("Available backgrounds:")
		var dir = DirAccess.open("res://GardenStory/assets/enchanted_garden/")
		if dir:
			dir.list_dir_begin()
			var file_name = dir.get_next()
			while file_name != "":
				if file_name.ends_with(".png"):
					print("  - ", file_name)
				file_name = dir.get_next()

func get_anchor_position(anchor: String) -> int:
	for i in range(dialog_lines.size()):
		var line = dialog_lines[i]
		if line.has("anchor") and line["anchor"] == anchor:
			return i
	
	print("ERROR: Anchor '", anchor, "' not found!")
	return -1

func load_json(file_path: String) -> Array:
	if not FileAccess.file_exists(file_path):
		print("ERROR: JSON file not found: ", file_path)
		return []
	
	var file = FileAccess.open(file_path, FileAccess.READ)
	if file == null:
		print("ERROR: Could not open file: ", file_path)
		return []
	
	var content = file.get_as_text()
	#file.close()
	
	if content.is_empty():
		print("ERROR: JSON file is empty")
		return []
	
	var parse_result = JSON.parse_string(content)
	
	#if parse_result != OK:
		#print("ERROR: Could not parse JSON. Error: ", json.error_string)
		#return []
	
	#var json_content = json.data
	#if not json_content is Array:
		#print("ERROR: JSON content is not an array")
		#return []
	#
	return parse_result

func _on_choice_selected(anchor: String):
	print("Choice selected: ", anchor)
	var anchor_pos = get_anchor_position(anchor)
	if anchor_pos != -1:
		dialog_index = anchor_pos
		process_current_line()
	else:
		print("ERROR: Could not find anchor for choice: ", anchor)
