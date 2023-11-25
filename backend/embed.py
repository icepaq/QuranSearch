#
# This file embeds each verse from quran_en.json into the chroma vector database
#

import chromadb
import requests
import os
import json

chroma_client = chromadb.PersistentClient('./chroma.db')
collection = chroma_client.create_collection(name="my_collection")

# open quran_en.json
quran = {}
with open('quran_en.json', 'r') as f:
    quran_en = f.read()
    quran = json.loads(quran_en)

for chapter in quran:
    verses = chapter['verses']
    for verse in verses:
        translation = verse['translation']
        response = requests.post('https://api.openai.com/v1/embeddings',
                                 json={'input': translation, 'model': 'text-embedding-ada-002'}, headers={
                                     'Content-Type': 'application/json',
                                     'Authorization': 'Bearer your key'
                                 })
        embedding = response.json()['data'][0]['embedding']

        collection.add(
            embeddings=[embedding],
            ids=[str(chapter['id']) + '-' + str(verse['id'])],
            metadatas=[verse]
        )

        print(str(chapter['id']) + ' - ' + str(verse['id']))
