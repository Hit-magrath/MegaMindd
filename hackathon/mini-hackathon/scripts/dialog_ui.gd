extends Control
@onready var speakerName = %speakerName
@onready var dialogLines = %dialogLine
@onready var choice_list = %ChoiceList

signal choice_selected

#preload button scene 
const choices_button_scene =preload("res://scenes/playerChoice.tscn");

const ANIMATE_SPEED : int = 30 
var animate_text : bool = false
var current_visble_characters : int = 0

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	#hide choices list 
	choice_list.hide()


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if animate_text :
		if dialogLines.visible_ratio < 1 :
			dialogLines.visible_ratio += ( 1.0 / dialogLines.text.length()) * (ANIMATE_SPEED * delta)
			current_visble_characters = dialogLines.visible_characters
		else :
			animate_text = false

func change_line(speaker : String ,line : String) :
	speakerName.text = speaker
	current_visble_characters = 0
	dialogLines.text = line
	dialogLines.visible_characters = 0
	animate_text = true

func skip_animation():
	dialogLines.visible_ratio = 1

func display_choices(choices : Array):
	#Remove any button that already exist
	for child in choice_list.get_children() :
		child.queue_free()
	#create new button for each choice 
	for choice in choices:
		var choice_button = choices_button_scene.instantiate()
		choice_button.text = choice["text"]
		choice_button.pressed.connect(_on_choice_button_pressed.bind(choice["goto"]))
		
		#add button to choices container
		choice_list.add_child(choice_button)
	
	#show the choices
	choice_list.show()

func _on_choice_button_pressed(anchor : String):
	choice_selected.emit(anchor)
	choice_list.hide()
