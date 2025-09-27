extends Node2D

# -----------------------
# Supabase configuration
# -----------------------
const SUPABASE_URL = "https://ccrpamcptkjuowxxovrb.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcnBhbWNwdGtqdW93eHhvdnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MjAyMTMsImV4cCI6MjA3NDQ5NjIxM30.O8CsJwEBPsSkxB8h1Ccw4SV0koV57yrvoXSLCNntkpQ"

var http_request: HTTPRequest

# Form nodes
@onready var email_field = %EmailField
@onready var password_field = %PasswordField
@onready var create_button = %CreateButton

# -----------------------
# Init
# -----------------------
func _ready():
	create_button.pressed.connect(_on_create_pressed)

	# Setup HTTPRequest node
	http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(_on_request_completed)

# -----------------------
# Button handler
# -----------------------
func _on_create_pressed():
	var email = email_field.text.strip_edges()
	var password = password_field.text.strip_edges()

	if email.is_empty() or password.is_empty():
		show_message("Please fill in both fields.")
		return

	if not is_valid_email(email):
		show_message("Invalid email address.")
		return

	if password.length() < 6:
		show_message("Password must be at least 6 characters.")
		return

	# ✅ Send to Supabase
	create_user_record(email, password)

# -----------------------
# Supabase Users Table
# -----------------------
func create_user_record(email: String, password: String):
	var headers = [
		"Content-Type: application/json",
		"apikey: " + SUPABASE_KEY,
		"Authorization: Bearer " + SUPABASE_KEY
	]

	var data = {
		"email": email,
		"password": password
	}

	var json_string = JSON.stringify(data)
	var url = SUPABASE_URL + "/rest/v1/users2"

	print("Creating user record for:", email)
	var error = http_request.request(url, headers, HTTPClient.METHOD_POST, json_string)

	if error != OK:
		show_message("❌ Request failed to start.")

# -----------------------
# HTTP Response Handler
# -----------------------
func _on_request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray):
	var json = JSON.new()
	var parse_result = json.parse(body.get_string_from_utf8())

	if parse_result != OK:
		show_message("❌ Error parsing server response.")
		return

	if response_code == 201:
		show_message("✅ User created successfully!")
		print("✅ User record created:", json.data)
	else:
		show_message("❌ Could not create user (code %s)." % response_code)
		print("Response body:", json.data)

# -----------------------
# Utility
# -----------------------
func is_valid_email(email: String) -> bool:
	var regex = RegEx.new()
	regex.compile(r"^[\w\.-]+@[\w\.-]+\.\w+$")
	return regex.search(email) != null

func show_message(text: String):
	# Replace with a Label/Popup when ready
	print(text)
