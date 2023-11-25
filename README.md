# Quran Search

Similarity search for the Quran. Using OpenAI embeddings and chromadb as the vector database.

## Setup

### Frontend

1. npm i
2. npm run dev

### Backend

1. Create a .env file and add an `OPENAI_KEY` value with your api key.
1. Run `pip install -r requirements.txt`
1. Run `python3 embed.py` to turn all verses from quran_en.json into embeddings
1. Run `python3 app.py` to run the API

### Dockerizing the API

1. Run `docker build -t quransearch .`
2. Run `docker run -t quransearch -p 5000:5000`

## Credits and Sources
Quran JSON retrieved from [https://github.com/risan/quran-json](https://github.com/risan/quran-json)
