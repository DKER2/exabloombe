import psycopg2
import pandas as pd
import random
from datetime import datetime, timedelta

# PostgreSQL connection configuration
DB_CONFIG = {
  'dbname': 'exabloom',
  'user': 'user',
  'password': 'password',
  'host': 'localhost',
  'port': 5432
}

def connect_to_db():
  """Establish a connection to PostgreSQL."""
  try:
    conn = psycopg2.connect(**DB_CONFIG)
    print("Database connected successfully.")
    return conn
  except Exception as e:
    print(f"Error connecting to the database: {e}")
    exit(1)

def read_csv(file_path):
  """Read the CSV file into a pandas DataFrame."""
  try:
    df = pd.read_csv(file_path, header=None, names=['content'])
    print(f"Loaded {len(df)} rows from the CSV file.")
    return df
  except Exception as e:
    print(f"Error reading CSV: {e}")
    exit(1)

def insert_messages(conn, messages_df, total_contacts=100000, total_messages=5000000):
  cursor = conn.cursor()

  # Get all contact IDs from the contacts table
  cursor.execute("SELECT id FROM contacts;")
  contact_ids = [row[0] for row in cursor.fetchall()]

  if len(contact_ids) == 0:
    print("No contacts found in the database.")
    return

  messages_per_contact = total_messages // len(contact_ids)
  print(f"Assigning {messages_per_contact} messages per contact.")

  # Check if 'content' column exists and print the first few rows
  print(messages_df.head(5))

  try:
    for contact_id in contact_ids:
      sampled_messages = messages_df.sample(messages_per_contact)

      rows = [
        (
          contact_id,
          message['content'],  # Access content from the DataFrame
          datetime.now() - timedelta(days=random.randint(0, 365))
        )
        for _, message in sampled_messages.iterrows()
      ]

      cursor.executemany(
        "INSERT INTO messages (contact_id, content, created_at) VALUES (%s, %s, %s)",
        rows
      )

      print(f"Inserted {messages_per_contact} messages for contact_id {contact_id}.")

    conn.commit()
    print("All messages inserted successfully.")

  except Exception as e:
    conn.rollback()
    print(f"Error inserting messages: {e}")

  finally:
    cursor.close()


def main():
  conn = connect_to_db()
  messages_df = read_csv('./message_content.csv')
  insert_messages(conn, messages_df)
  conn.close()

if __name__ == '__main__':
  main()
