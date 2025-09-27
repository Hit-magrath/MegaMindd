extends Control
signal choice_selected

const ChoiceButtonScene = preload("res://GoatStory/scenes/player_choice.tscn")

const ANIMATE_SPEED : int = 30 
var animate_text : bool = false
var current_visble_characters : int = 0

@onready var dialogLines = %DialogueLine
@onready var speaker_name = %SpeakerName
@onready var choice_list = %ChoiceList
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	#Hide choice list
	choice_list.hide()
	
	pass # Replace with function body.

func display_choices(choices: Array):
	#Clear any existing choices
	
	for child in choice_list.get_children():
		child.queue_free()
	#Create a new button for each choice
	for choice in choices:
		var choice_button = ChoiceButtonScene.instantiate()
		choice_button.text = choice["text"]
		
		#Attach signal to button
		choice_button.pressed.connect(_on_choice_button_pressed.bind(choice["goto"]))
		
		#Add the button to the container
		choice_list.add_child(choice_button)
		
	#Show the choice list
	choice_list.show()

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if animate_text :
		if dialogLines.visible_ratio < 1 :
			dialogLines.visible_ratio += ( 1.0 / dialogLines.text.length()) * (ANIMATE_SPEED * delta)
			current_visble_characters = dialogLines.visible_characters
		else :
			animate_text = false

func change_line(speaker : String ,line : String) :
	speaker_name.text = speaker
	current_visble_characters = 0
	dialogLines.text = line
	dialogLines.visible_characters = 0
	animate_text = true
	
	
func skip_animation():
	dialogLines.visible_ratio = 1

func _on_choice_button_pressed(anchor: String):
	choice_selected.emit(anchor)
	choice_list.hide()
