extends Node2D

@onready var choice_container = %VBoxContainer

const story_choice_scene = preload("res://Main/story_options.tscn")

const choices_array: Array = [
	{"text": "Goat story", "path": "res://Main/GoatLogo.png", "scene": "res://GoatStory/scenes/main_scene.tscn"},
	{"text": "Garden story", "path": "res://Main/EnchartedLogo.png", "scene": "res://GardenStory/scenes/entrancescene.tscn"},
	{"text": "Park story", "path": "res://Main/ParkLogo.jpg", "scene": "res://ParkStory/scenes/Mainscene.tscn"}
]

func _ready():
	choice_container.hide()
	display_choices(choices_array)

func _on_story_button_pressed(target_scene: String):
	get_tree().change_scene_to_file(target_scene)

func display_choices(choices: Array):
	# Remove existing buttons
	for child in choice_container.get_children():
		child.queue_free()

	# Create new buttons
	for choice in choices:
		var choice_button = story_choice_scene.instantiate()
		
		# Load and assign texture to the TextureButton (root node)
		var logo = load(choice["path"])
		if logo:
			choice_button.texture_normal = logo  # ✅ Godot 4 property name
		
		# Set the label text (first child)
		var label = choice_button.get_child(0)
		if label and label is Label:
			label.text = choice["text"]
		
		# Connect button press with the correct scene path
		choice_button.pressed.connect(_on_story_button_pressed.bind(choice["scene"]))
		
		choice_container.add_child(choice_button)
	
	choice_container.show()
