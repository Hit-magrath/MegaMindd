extends Control

@onready var speakerName = %Speakername
@onready var dialogLines = %DialogueLine
@onready var choice_list = %ChoiceList

signal choice_selected

# Preload button scene 
const choices_button_scene = preload("res://GardenStory/scenes/button.tscn")
const ANIMATE_SPEED : int = 30 

var animate_text : bool = false
var current_visible_characters : int = 0

func _ready() -> void:
	# Hide choices list initially
	choice_list.hide()

func _process(delta: float) -> void:
	if animate_text:
		if dialogLines.visible_ratio < 1:
			dialogLines.visible_ratio += (1.0 / dialogLines.text.length()) * (ANIMATE_SPEED * delta)
			current_visible_characters = dialogLines.visible_characters
		else:
			animate_text = false

func change_line(speaker: String, line: String):
	speakerName.text = speaker
	current_visible_characters = 0
	dialogLines.text = line
	dialogLines.visible_characters = 0
	animate_text = true

func skip_animation():
	dialogLines.visible_ratio = 1
	animate_text = false

func display_choices(choices: Array):
	# Remove any buttons that already exist
	for child in choice_list.get_children():
		child.queue_free()
	
	# Wait for the children to be actually freed
	await get_tree().process_frame
	
	# Create new button for each choice 
	for choice in choices:
		if choice.has("text") and choice.has("goto"):
			var choice_button = choices_button_scene.instantiate()
			choice_button.text = choice["text"]
			choice_button.pressed.connect(_on_choice_button_pressed.bind(choice["goto"]))
			
			# Add button to choices container
			choice_list.add_child(choice_button)
		else:
			print("WARNING: Choice missing text or goto: ", choice)
	
	# Show the choices
	choice_list.show()

func _on_choice_button_pressed(anchor: String):
	print("Choice button pressed: ", anchor)
	choice_selected.emit(anchor)
	choice_list.hide()
