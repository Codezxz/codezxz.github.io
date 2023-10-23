#Code to ACCEPT PDF AND Output it's Summary
@app.route('/pdfsummarize', methods=['GET','POST'])
def api():
	# pdb.set_trace()
	data = request.files['file']
	print('Received data:', data)

	reader = PyPDF2.PdfReader(data)
	# page1 = reader.pages[44]
	all_pages = ""
	lenPage = len(reader.pages)
	for i in range(lenPage):
		pages = reader.pages[i]
		# pdfData = pages.extract_text()
		
	# print(len(reader.pages))
	all_pages += pages.extract_text()
	n = len(all_pages)
	if n < 400000000:
		print(all_pages)
		data = all_pages
	# Define the prompt for the OpenAI API
		prompt = f"Q: {PDATA+data}\nA:"

		# Make a request to the OpenAI API
		response = requests.post(
			'https://api.openai.com/v1/engines/text-davinci-002/completions',
			headers={
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
			},
			json={'prompt':prompt,'temperature':0.1,'max_tokens':100,'n':1,'stop':None})

		# Extract the response text from the OpenAI API response
		response_data = response.json()
		choices = response_data.get('choices')
		if choices and len(choices) > 0:
			# response_text = choices[0].get('text', '').strip()
			response_text = response['choices'][0]['text']
		else:
			response_text = "Sorry, I could not generate a response for your query."

		return jsonify({"response": response_text})
	else:
		return jsonify({"response": "Please upload a PDF with characters < 100."})
