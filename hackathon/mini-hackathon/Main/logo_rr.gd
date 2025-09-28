extends Node2D

@onready var logo := %Logo

func _ready() -> void:
	# Start hidden
	logo.modulate.a = 0.0
	logo.scale = Vector2(0.8, 0.8)

	# Create tween for fade-in + scale
	var tween := create_tween()
	tween.tween_property(logo, "modulate:a", 1.0, 1.5).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
	tween.parallel().tween_property(logo, "scale", Vector2.ONE, 1.5).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)

	# After fade-in, start a small loop idle animation (pulse scale)
	tween.chain().tween_callback(func():
		var idle_tween := create_tween().set_loops()
		idle_tween.tween_property(logo, "scale", Vector2(1.05, 1.05), 1.0).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
		idle_tween.tween_property(logo, "scale", Vector2.ONE, 1.0).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
	)

func _input(event: InputEvent) -> void:
	if event.is_action_pressed("next_line"):
		# Optional: nice fade-out before scene change
		var tween := create_tween()
		tween.tween_property(logo, "modulate:a", 0.0, 0.8).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
		tween.tween_callback(func():
			get_tree().change_scene_to_file("res://Main/profile.tscn")
		)
