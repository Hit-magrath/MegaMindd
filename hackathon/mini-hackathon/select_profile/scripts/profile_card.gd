extends Control
@onready var profile_label = %Label
@onready var button = %Button


func change_label(new_name : String):
	profile_label.text = new_name
	
	
func _ready() -> void:
	button.pressed.connect(_on_button_pressed)
	
func _on_button_pressed():
	get_tree().change_scene_to_file("res://Main/Main.tscn")
