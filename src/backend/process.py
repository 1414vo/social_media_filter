from sentence_transformers import SentenceTransformer
import numpy as np
import json

SAMPLES_FILE = "samples.json"


def read_samples():
    # Open file specified in SAMPLES_FILE
    with open(SAMPLES_FILE, "r") as samples_file:
        samples = json.load(samples_file)
    return samples


class Scorer:

    # Create reference embeddings for each category
    def __init__(self):
        tweets_by_topic = read_samples()
        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

        # Reference embeddings are the means of embeddings of sample tweets in each category
        self.reference_embeddings = {
            topic: np.mean([np.array(self.model.encode(tweet)) for tweet in tweets_of_topic], axis=0)
            for (topic, tweets_of_topic)
            in tweets_by_topic.items()
        }

    # Compare a new tweet against each reference embedding to calculate similarity scores by category
    def score(self, sentence):
        embedding = np.array(self.model.encode(sentence))
        return {topic: prompt_vector.dot(embedding).item() for (topic, prompt_vector) in self.reference_embeddings.items()}
