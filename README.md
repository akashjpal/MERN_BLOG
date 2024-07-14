# MERN Blog Project

This is a MERN (MongoDB, Express, React, Node.js) blog project. The project includes a frontend built with React, a backend with Node.js, and uses Docker instances for MySQL and MindsDB for database and AI predictions.

# Video Example

Here is a video embedded in the markdown:

<video width="320" height="240" controls>
  <source src="https://drive.google.com/uc?id=12yTIkqfgJKl_qPKsIVjyTOlOT7vfzpT0&export=download" type="video/mp4">
  Your browser does not support the video tag.
</video>


## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Installation

1. **Clone the repository:**

```sh
git clone https://github.com/akashjpal/MERN_BLOG.git
cd MERN_BLOG
```
2. Install frontend dependencies:
```sh
cd frontend
npm install
```
3. Install backend dependencies:
```sh
cd ../backend
npm install
```
4.Set up Docker containers for MySQL and MindsDB:
Make sure Docker is running on your system, then execute the following commands to start the MySQL and MindsDB containers.
```sh
# Pull and run MySQL container
docker pull mysql:latest
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=blog -p 3306:3306 -d mysql:latest

# Pull and run MindsDB container
docker pull mindsdb/mindsdb
docker run --name mindsdb-container -p 47334:47334 -d mindsdb/mindsdb
```
### Running the application
1. Start the backend server:
```sh
cd backend
npm start
```
2. Start the frontend server:
```sh
cd frontend
npm start
```
### Usage
#### Creating a Blog Post:
Navigate to the create blog post page and use the markdown editor to write your content. Use // to trigger AI-powered features like grammar check, sentence organization, full article generation, or image generation.

#### Viewing Blog Posts:
Browse the list of blog posts on the homepage. Click on a blog post to view its details.
