extends Node2D

@onready var charactor = %charactor
@onready var dialog_ui = %DialogUI
var dialog_index: int = 0

const  dialog_lines : Array[String] = [
	"Liz : [shake]*Yawn*[/shake]",
	"Liz : Good morning,",
	"Liz : Are you ready to get your adventure stated ? ",
	"Liz : First you have to brush your teeth in the bathroom."
]

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	dialog_index = 0 
	process_current_line()

func _input(event: InputEvent) :
	if event.is_action_pressed("next_line"):
		if dialog_index < len(dialog_lines) -1 :
			dialog_index +=1 
			process_current_line()
	
	
func parse_line(line:String) :
	var line_info = line.split(":")
	assert(len(line_info) >= 2)
	return{
		"speaker_name" : line_info[0].strip_edges(),
		"dialog_line" : line_info[1].strip_edges()
	}
	
func process_current_line():
	var line = dialog_lines[dialog_index]
	var line_info = parse_line(line)
	dialog_ui.speaker_name.text = line_info["speaker_name"]
	dialog_ui.dialog_line.text = line_info["dialog_line"]
