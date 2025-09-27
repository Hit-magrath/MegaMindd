extends Node2D
#@onready var button = %Button
#@onready var button2 = %TextureButton
@onready var choice_container = %VBoxContainer

const story_choice_scene = preload("res://Main/story_options.tscn")

const choises_array : Array = [{"text" : "Goat story" , "path" :"res://Main/GoatLogo.png"}, {"text" : "Garden story" , "path" :"res://Main/EnchartedLogo.png"} , {"text" : "Park story" ,  "path" :"res://Main/ParkLogo.jpg"}]

func _ready():
	choice_container.hide()
	display_choices(choises_array)
	

func _on_start_button_pressed():
	get_tree().change_scene_to_file("res://ParkStory/scenes/Mainscene.tscn")
	
func display_choices(choices : Array):
	#Remove any button that already exist
	for child in choice_container.get_children() :
		child.queue_free()
	#create new button for each choice 
	for choice in choices:
		var choice_button = story_choice_scene.instantiate()
		var button_logo = load(choice["path"])
		choice_button.texture_normal = button_logo
		
		var story_name = choice_button.get_child(0)
		story_name.text = choice["text"]
		choice_button.pressed.connect(_on_start_button_pressed)
		
		#add button to choices container
		choice_container.add_child(choice_button)
		
	choice_container.show()
	
