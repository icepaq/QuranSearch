from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import chromadb
import requests
import dotenv
import os

dotenv.load_dotenv()

app = Flask(__name__)
CORS(app)

chroma_client = chromadb.PersistentClient('./chroma.db')
collection = chroma_client.get_collection(name="my_collection")
hadith_collection = chroma_client.get_collection(name="sahih_bukhari")


@cross_origin()
@app.route('/findVerse', methods=['POST'])
def api():
    # ddos checks
    print('Verse search request from - ' + request.remote_addr)

    query = request.json['query']
    response = requests.post('https://api.openai.com/v1/embeddings',
                             json={'input': query, 'model': 'text-embedding-ada-002'}, headers={
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Bearer ' + os.getenv('OPENAI_KEY')
                             })

    embedding = response.json()['data'][0]['embedding']
    results = collection.query(query_embeddings=[embedding], n_results=10)

    return jsonify(results)


@cross_origin()
@app.route('/findHadith', methods=['POST'])
def api2():
    # ddos checks
    print('Hadith search request from - ' + request.remote_addr)

    query = request.json['query']
    response = requests.post('https://api.openai.com/v1/embeddings',
                             json={'input': query, 'model': 'text-embedding-ada-002'}, headers={
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Bearer ' + os.getenv('OPENAI_KEY')
                             })

    embedding = response.json()['data'][0]['embedding']
    results = hadith_collection.query(
        query_embeddings=[embedding], n_results=10)

    return jsonify(results)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=os.getenv('PORT'))
