extends Node2D


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	
	pass # Replace with function body.

func _input(event: InputEvent) -> void:
	if event.is_action_pressed("next_line"):
		get_tree().change_scene_to_file("res://Main/profile.tscn")
		

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
