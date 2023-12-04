#
# This file embeds each verse from quran_en.json into the chroma vector database
#

import chromadb
import requests
import json
import time
import os

chroma_client = chromadb.PersistentClient('./chroma.db')
collection = chroma_client.create_collection(name="sahih_bukhari")

# open quran_en.json
hadith_book = {}
with open('./hadith/bukhari_with_line_number.json', 'r') as f:
    hadith = f.read()
    hadith_book = json.loads(hadith)['hadiths']

for hadith in hadith_book:

    # sleep for 30ms
    time.sleep(0.1)

    translation = hadith['english']['text']
    print(hadith['chapterId'], hadith['idInBook'])

    id = str(hadith['chapterId']) + '-' + str(hadith['idInBook'])

    metadata = {
        'id': hadith['id'],
        'arabic': hadith['arabic'],
        'english_narrator': hadith['english']['narrator'],
        'english_text': hadith['english']['text'],
        'chapterId': hadith['chapterId'],
        'bookId': hadith['bookId'],
        'idInBook': hadith['idInBook'],
        'line': hadith['line']
    }

    # convert metadata to dict

    response = requests.post('https://api.openai.com/v1/embeddings',
                             json={'input': translation, 'model': 'text-embedding-ada-002'}, headers={
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Bearer ' + os.getenv('OPENAI_KEY')
                             })

    json_response = response.json()

    # print(json_response)

    embedding = json_response['data'][0]['embedding']

    collection.add(
        embeddings=[embedding],
        ids=[id],
        metadatas=[metadata]
    )
