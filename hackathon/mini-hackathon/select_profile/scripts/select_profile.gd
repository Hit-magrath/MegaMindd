extends Control

@onready var profile_list = %Control
@onready var selected_profile_label = %Label
@onready var add_button = %Button





var profile_card_scene = preload("res://select_profile/scenes/ProfileCard.tscn")
var add_profile_card_scene = preload("res://select_profile/scenes/addProfileCard.tscn")

func _ready():
	add_button.pressed.connect(_on_button_pressed)
	display_profiles()
	
func  _on_button_pressed():
	get_tree().change_scene_to_file("res://Main/Main.tscn")

func display_profiles():
	for child in profile_list.get_children():
		child.queue_free()
	
	# Load profiles
	var profiles = load_json("res://users/profiles.json")
	

	# Show each profile
	for profile in profiles:
		var card = profile_card_scene.instantiate()
		print(profile["name"])
		#card.change_label(profile["name"]) 
		#card.get_node("TextureRect").texture = load(profile.avatar_path)
		profile_list.add_child(card)

	# Add Profile button
	var add_card = add_profile_card_scene.instantiate()
	add_card.connect("pressed", Callable(self, "_on_add_profile_pressed"))
	profile_list.add_child(add_card)

func _on_add_profile_pressed():
	get_tree().change_scene_to_file("res://ProfileCreatePage.tscn")
	
func load_json(file_path) :
	var file = FileAccess.open(file_path , FileAccess.READ)
	
	var content = file.get_as_text()
	
	var json_content = JSON.parse_string(content)
	
	return json_content
