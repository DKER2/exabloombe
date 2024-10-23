
# Exabloom Backend Test

## Overview

This project implements a high-performance backend system using **Express.js** and **PostgreSQL** to efficiently manage and query a large-scale database containing contacts and messages. The backend is optimized to handle extensive data queries, such as retrieving recent conversations and enabling search functionalities with pagination.

---

## Features

- **Database with Large Dataset:**
    - 100,000 dummy contacts and 5 million messages, incorporating message content from the provided `message_content.csv`.
    - Realistic distribution of messages across contacts.

- **Query Functionalities:**
    - Retrieve the **50 most recent conversations** ordered by the timestamp of the last message.
    - **Pagination** support for browsing additional conversations.
    - **Search functionality** filtering results based on:
        - Message content
        - Contact name
        - Contact phone number

- **Performance Optimizations:**
    - Optimized query and indexing strategies to ensure scalability and performance.

---

## System Requirements

- **Node.js** v14+
- **PostgreSQL** 13+
- **Express.js** framework

---

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <your-repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up PostgreSQL Database:**
    - Create a PostgreSQL database named `exabloom`.
    - Populate contacts by running this SQL in psql cli
   ```SQL
    INSERT INTO contacts (contact_name, contact_phone)
    SELECT
    trunc(random() * 1000000)::text) AS contact_name,
    concat('+65', lpad(trunc(random() * 10000000)::text, 8, '0')) AS contact_phone
    FROM generate_series(1, 100000);
    ```
    - Replace DB_CONFIG including user, password of DB in main.py. Run the python script to evenly populate messages table.

4. **Configure Environment Variables:**
    - Create a `.env` file in the root folder with the following:
      ```env
      DB_NAME=exabloom
      DB_USER=DB_USER
      DB_PASSWORD=DB_PASSWORD
      DB_HOST=localhost
      ```

5. **Run the Server:**
   ```bash
   npm start
   ```

## API Endpoints

1. **Retrieve Recent Conversations:**
   ```
   GET /api/conversations
   ```
Description:
Retrieves the most recent conversations, ordered by the timestamp of the last message. Supports pagination by accepting limit and page in the body payload.

Request:

```json
    {
        "limit": 50,  // Number of conversations per page (optional, default: 50)
        "page": 2     // Page number (optional, default: 1)
    }
```
Response:

```json
[
  {
    "contact_id": 1,
    "content": " Haha, if you think bugs are gross, I'm not sure you'd want to be in the middle of billions of bugs traveling around.",
    "created_at": "2024-10-22T11:07:28.175Z"
  },
  {
    "contact_id": 2,
    "content": " Yes, I remember that one.  Another interesting fact about Michael Jackson is that Eddie Van Halen played the iconic guitar solo in \"Beat It\" and Eddie did it for a favor and free of charge.",
    "created_at": "2024-10-22T11:07:28.128Z"
  }
]
```
2. **Search Conversations:**
   ```
   GET /api/search?searchValue=<query>&limit=50&page=1
   ```

3. **Database Schema:**
    - **Contacts Table:** Contains contact information.
    - **Messages Table:** Stores messages linked to contacts, with timestamps for ordering.

---

## Key Design Decisions

- **Schema Optimizations:**
    - Added **indexes** on message timestamps and contact identifiers for faster query performance.

- **Query Optimization:**
    - Used **pagination with limit-offset strategy** to improve performance for large datasets.
    - **Connection pooling** configured for efficient resource management.

---

## Challenges and Solutions

- **Handling large datasets efficiently:**  
  Optimized query structures and database indexes to prevent slowdowns with high data volumes.

- **Maintaining performance with multiple filters:**  
  Created composite indexes to optimize search queries based on contact name, phone number, and message content.

---

## Assumptions

- All data is randomly distributed across contacts.
- Even we do not implement insert function. I assume this system will also
have a lot of insert transaction as it is a messaging application

---
