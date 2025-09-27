extends Node2D
@onready var button = %Button
@onready var button2 = %TextureButton



func _ready():
	button2.pressed.connect(_on_start_button_pressed)
	

func _on_start_button_pressed():
	get_tree().change_scene_to_file("res://ParkStory/scenes/Mainscene.tscn")
	
