extends Node2D

@onready var attention_label = %attention_label
@onready var memory_label =  %memory_label
@onready var reason_label =  %reason_label
@onready var home_button =  %Button

var scores : Dictionary = {"attention" : "8" ,"memory" : "7" ,"reason" : "5"  }

func _ready() -> void:
	home_button.pressed.connect(_on_story_button_pressed)
	attention_label.text = scores["attention"]
	memory_label.text = scores["memory"]
	reason_label.text = scores["reason"]
	
func _on_story_button_pressed():
	get_tree().change_scene_to_file("res://Main/Main.tscn")
