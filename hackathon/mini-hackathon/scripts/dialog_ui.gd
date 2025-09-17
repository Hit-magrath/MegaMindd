extends Control

@onready var dialog_line = %dialogLine
@onready var speaker_name = %SpeakerName


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	dialog_line.text = " hello" 


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta: float) -> void:
	#pass
