extends Node2D

@onready var background = %Background
@onready var charactor = %charactor
@onready var dialogUi = %DialogUI
@onready var tts_api = %TtsApi




var dialog_index : int = 0

var dialog_lines : Array = []

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	dialog_lines = load_json("res://ParkStory/recources/story/story.json")
	
	#connect signals
	dialogUi.choice_selected.connect(_on_choice_selected)
	
	dialog_index = 0 
	process_current_line()

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta: float) -> void:
	#pass
	
func _input(event: InputEvent) -> void:
	var line = dialog_lines[dialog_index]
	var has_choise = line.has("choices")
	if event.is_action_pressed("next_line") and not has_choise:
		if dialogUi.animate_text:
			dialogUi.skip_animation()
		else :	
			if dialog_index < len(dialog_lines) - 1:
				dialog_index += 1 
				process_current_line()


	
func process_current_line():
	var line = dialog_lines[dialog_index]
	#check if it's the end of the scene
	if line.has("next_scene"):
		return
	
	
	#chack if we need to change location
	if line.has("location"):
		var background_file = "res://ParkStory/assets/ai_gen_boy/" + line["location"] + ".png"
		background.texture = load(background_file)
		dialog_index += 1
		process_current_line()
		return
	
	
	#check if line has 'goto'
	if line.has("goto") :
		dialog_index = get_anchor_position(line["goto"])
		process_current_line()
		return
		
	#check if it's jus an anchor declaration (should be skipped )
	if line.has("anchor"):
		dialog_index += 1
		process_current_line()
		return
		
	if line.has("choices"): 
		dialogUi.display_choices(line["choices"])
		
	else:
		tts_api.speak(line["text"])
		dialogUi.change_line(line["speaker"], line["text"])

func get_anchor_position(anchor : String):
	#find anchor entry with matching name
	for i  in range(dialog_lines.size()):
		if dialog_lines[i].has("anchor") and dialog_lines[i]["anchor"] == anchor:
			return i
			
	#if we get to this point the anchor was not found
	printerr("anchor '" + anchor + "' was not found")
	return null
			

func load_json(file_path) :
	var file = FileAccess.open(file_path , FileAccess.READ)
	
	var content = file.get_as_text()
	
	var json_content = JSON.parse_string(content)
	
	return json_content

func _on_choice_selected(anchor : String):
	dialog_index = get_anchor_position(anchor)
	process_current_line()
