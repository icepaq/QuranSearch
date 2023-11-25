#
# Demo of how the search functionality works with chroma
#

import chromadb
import requests
import dotenv
import os

dotenv.load_dotenv()

chroma_client = chromadb.PersistentClient('./chroma.db')
collection = chroma_client.get_collection(name="my_collection")

query = 'heaven'

response = requests.post('https://api.openai.com/v1/embeddings',
                         json={'input': query, 'model': 'text-embedding-ada-002'}, headers={
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer ' + os.getenv('OPENAI_KEY')
                         })
# print(response.json()['data'][0]['embedding'])
embedding = response.json()['data'][0]['embedding']

results = collection.query(query_embeddings=[embedding], n_results=2)
print(results['ids'])
