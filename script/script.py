import os
from pinecone import Pinecone, ServerlessSpec
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
from dotenv import load_dotenv

load_dotenv()

pc = Pinecone(
    api_key=os.getenv("PINECONE_API_KEY")
)

index_name = os.getenv("PINECONE_INDEX_NAME")

if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=1536,
        metric='cosine',
        spec=ServerlessSpec(
            cloud='aws',
            region=os.getenv("PINECONE_ENVIRONMENT")
        )
    )

index = pc.Index(index_name)

# Function to fetch vectors and their metadata
def fetch_vectors(index, limit=100):
    vectors = []
    query_response = index.query(
        vector=[0] * 1536,
        top_k=limit,
        include_metadata=True
    )
    
    for match in query_response.matches:
        vectors.append({
            "id": match.id,
            "metadata": match.metadata
        })
    print("vectors: ",vectors)    
    return vectors

def perform_topic_modeling(text_data, n_topics=5):
    vectorizer = CountVectorizer(max_df=0.95, min_df=2, stop_words='english')
    text_vectorized = vectorizer.fit_transform(text_data)

    lda = LatentDirichletAllocation(n_components=n_topics, random_state=42)
    lda.fit(text_vectorized)

    topics = []
    for idx, topic in enumerate(lda.components_):
        topics.append([vectorizer.get_feature_names_out()[i] for i in topic.argsort()[-10:]])

    print("topics: ",topics)    
    return topics

def update_metadata(index, vector_id, topics):
    index.update(id=vector_id, set_metadata={"topics": topics})

if __name__ == "__main__":
    # Fetch all vectors from the Pinecone index
    vectors = fetch_vectors(index)

    # Extract text data for topic modeling
    text_data = [vec['metadata']['text'] for vec in vectors]

    # Perform topic modeling
    topics = perform_topic_modeling(text_data, n_topics=min(len(text_data), 5))

    # Ensure the number of topics matches the number of vectors
    if len(topics) < len(vectors):
        topics.extend([[]] * (len(vectors) - len(topics)))

    # Update each vector's metadata with the identified topics
    for i, vec in enumerate(vectors):
        vector_id = vec['id']
        update_metadata(index, vector_id, topics[i])

    print("Metadata updated with topics successfully.")
