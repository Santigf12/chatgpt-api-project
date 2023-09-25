import functions_framework
import openai
from flask import jsonify

# Set your OpenAI API key here
openai.api_key = "secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

@functions_framework.http
def chat_with_openai(request):
    # For more information about CORS and CORS preflight requests, see:
    # https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

    # Set CORS headers for the preflight request
    if request.method == "POST":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        request_data = request.get_json()
        if 'question' and 'model' in request_data:
            user_question = request_data['question']
            selected_model = request_data['model']

            #define the model
            if selected_model == "gpt-3.5":
                model_name = "gpt-3.5-turbo"
            elif selected_model == "gpt-4":
                model_name = "gpt-4-0613"
            elif selected_model == "image":
                image = openai.Image.create(
                    prompt=user_question,
                    n=1,
                    size="256x256"
                )
                return jsonify({"response": image['data'][0]['url']}), 200
            else:
                return jsonify({"error": "Invalid model"}), 400

            # Send the user's question to the OpenAI API
            response = openai.ChatCompletion.create(
                model=model_name,
                messages=[{"role": "system", "content": "You are a helpful assistant."},
                          {"role": "user", "content": user_question}],
                temperature=0.5  # Adjust temperature as needed
            )

            # Extract the assistant's reply
            assistant_reply = response.choices[0].message['content']

            # Return the response to the client
        return jsonify({"response": assistant_reply}), 200
    
    else:

        # Handle invalid or non-POST requests
        return jsonify({"error": "Invalid request"}), 400