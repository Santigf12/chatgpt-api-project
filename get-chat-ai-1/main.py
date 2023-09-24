import functions_framework
import sys
import subprocess
import openai
from flask import jsonify

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def my_function(request):
    install("-r /workspace/requirements.txt")
    # Add your code here


# Set your OpenAI API key here
openai.api_key = "secret"

@functions_framework.http
def chat_with_openai(request):
    if request.method == 'POST':
        # Parse the incoming JSON request data
        request_data = request.get_json()
        if 'question' and 'model' in request_data:
            user_question = request_data['question']
            selected_model = request_data['model']

            #define model
            if selected_model == "gpt-3.5":
                model_name = "gpt-3.5-turbo"
            elif selected_model == "gpt-4":
                model_name = "gpt-4-0613"
            else:
                return jsonify({"error": "Invalid model"}), 400

            # Send the user's question to the OpenAI API
            response = openai.ChatCompletion.create(
                model=model_name,
                messages=[{"role": "system", "content": "You are a helpful assistant."},
                          {"role": "user", "content": user_question}],
                max_tokens=50,  # Adjust max tokens as needed
                temperature=0.5  # Adjust temperature as needed
            )

            # Extract the assistant's reply
            assistant_reply = response.choices[0].message['content']

            # Return the response to the client
            return jsonify({"response": assistant_reply})

    # Handle invalid or non-POST requests
    return jsonify({"error": "Invalid request"}), 400

