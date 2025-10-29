# 🎬 Where Have I Seen Them - Graphical 🕸️

## 🔎 Overview
Ever wondered where you have seen that particular actor (or director) match up before? Or wondered if this actor was in that other movie or TV show as well? \
**Where Have I Seen Them can help you!** \
Discover common movies and TV shows from among upto 6 actors (or directors) combinations at a time, or common actors (and directors) from among upto 6 movies and TV shows. combinations at a time. \
Built using React typescript and powered by the [TMDb API](https://developer.themoviedb.org/docs/getting-started) using an intuitive graphical layout for at-a-glance viewing.

## 🚀 Features
- Search for actors/directors combinations and add upto 6 at a time to find common movies and TV shows among them
- Search for movies/TV shows combinations and add upto 6 at a time to find common actors and directors among them
- Easy at-a-glance view through a node-to-node UI layout.
- 'Exclude' a node instead of removing it from the graph to mix and match and find commons.

## 🛠️ Tech Stack
- **Frontend (client)**
    - ReactJS + Typescript
    - TailwindCSS for styling
    - Lucide-react for various icons
    - Motion for animations

- **Backend (server)**
    - NodeJS + Typescript
    - ExpressJS server
    - REST APIs
    - [TMDb](https://developer.themoviedb.org/docs/getting-started) (The Movie Database) for all movie, TV show and actor related information

## ⚙️ Installation & Setup

### Prerequisites
- Ensure [NodeJS](https://nodejs.org/) is installed on the system
- Procure a TMDb API key:
    1. [Log in](https://www.themoviedb.org/login) to or [create](https://www.themoviedb.org/signup) your TMDB account
    2. Register for an [API key](https://www.themoviedb.org/settings/api)

### Steps
1. Navigate to your preferred folder to store the project and clone the repository

    ```shell
    git clone https://github.com/zarwaan/whist-graph.git
    cd whist-graph
    ```

2. Client set up:
    1. Navigate to client
        ```shell
        cd client
        ```

    2. Install client-side dependencies
        ```shell
        npm install
        ```

    3. Create .env file in the client folder 

    4. Add the following environment variables:
        ```sh
        VITE_API_URL_ROOT = "http://localhost:3000/api" #change port if required
        VITE_TMDB_IMAGE_URL_ROOT = "https://image.tmdb.org/t/p"
        ```
    5. Navigate back to root 
        ```sh
        cd ..
        ```

3. Server set up
    1. Navigate to server
        ```shell
        cd server
        ```

    2. Install server-side dependencies
        ```shell
        npm install
        ```

    3. Create .env file in the server folder 

    4. Add the following environment variables:
        ```sh
        TMDB_API_KEY = # your TMDb API Key
        TMDB_BEARER_TOKEN = # your TMDb bearer token (API Read Access Token)
        PORT = "3000" #change if required
        CLIENT_URL = "http://localhost:5173" #change port if required
        ```
    5. Navigate back to root 
        ```sh
        cd ..
        ```

4. Start client
    ```sh
    cd client
    npm run dev
    ```

5. Open a new terminal and start server
    ```sh
    cd server
    npm run dev
    ```

6. Navigate to [http://localhost:5173](http://localhost:5173) (or your own client url) and enjoy using!

## Created and maintained by Zarwaan Shroff
