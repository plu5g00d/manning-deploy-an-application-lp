# Shopping-Cart
Checkout API into a Node.js application

## Installation

### To run on local machine

1. clone project with command `git clone https://github.com/manning-liveproject/containerizing-the-application-lp-author.git`
2. Install dependencies: `npm install`
3. Start application: `node app.js`
4. Visit [http://127.0.0.1:5000](http://127.0.0.1:5000) or http://localhost:5000 in your browser for web page
5. Visit [http://localhost/store](http://localhost/store) in your browser for store page

### To run as Docker container

1. Build the Dockerfile

    `docker build -t scart:1.0 .`
2. View image built

    `docker images`

3. Run the image using the below command

    `docker run -it --rm --init -p 80:5000 scart:1.0`

