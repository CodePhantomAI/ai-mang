from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
import certifi

# Load environment variables
load_dotenv()

def connect_to_mongodb():
    try:
        # Get the connection string from environment variables
        uri = os.getenv('MONGODB_URI')
        if not uri:
            raise ValueError("No MongoDB URI found in environment variables")
            
        # Create a new client and connect to the server
        client = MongoClient(
            uri,
            server_api=ServerApi('1'),
            tlsCAFile=certifi.where()
        )
        
        # Send a ping to confirm a successful connection
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        return client
    except Exception as e:
        print(f"Error connecting to MongoDB Atlas: {e}")
        return None

if __name__ == "__main__":
    client = connect_to_mongodb()
    if client:
        # List all databases
        print("\nAvailable databases:")
        for db_name in client.list_database_names():
            print(f"- {db_name}")
