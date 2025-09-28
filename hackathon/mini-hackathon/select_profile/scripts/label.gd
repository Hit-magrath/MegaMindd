extends Label

@onready var profile_label = %Label


func change_label(new_name):
	profile_label.text = new_name
	
	
