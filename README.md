# TodaySphere-NodeJS-App-Devops
Configuration details: 
1. **EC2 instance name:** todaysphere-app
2. **Docker node.js app image name :** todaysphere_app 
3. **Docker node.js app container name:** todaysphereapp
4. **App URL format -** http://EC2_INSTANCE_PUBLIC_IP_ADDRESS:3000

Deployment link - https://todaysphere-app.onrender.com

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Description](#description)
  * [Technologies](#technologies-used)
  * [APIs used](#apis-used)
  * [Screenshots](#screenshots)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Commands used](#commands-used)




<!-- ABOUT THE PROJECT -->
## About The Project

### Description

TodaySphere Node.js App which has completely automated deployment using Jenkins, AWS EC2, Docker and GitHub CI/CD. This app accepts location as an input from the user and based on that it shows the current weather, news for that location/region, an activity of the day which the user can perform and NASA's Astronomy Picture of the Day.
A one-stop solution to start a good day! :smiley:

For the Devops part of this project, I created an AWS EC2 instance, installed Jenkins on the server, then integrated Jenkins with this GitHub repository containing Node.js app code. Next, using Docker, I dockerized the Node.js app and automated this process on Jenkins. Finally automated the whole process using GitHub Webhooks.

App Name: Today + Atmosphere - TodaySphere :wink:

### Technologies used

1. Node.js
2. AWS EC2
3. Jenkins
4. Docker
5. GitHub Webhooks (for CI/CD)

### APIs used

1. WeatherStack
2. Mapbox
3. NewsAPI.org
4. NASA Open APIs
5. Bored API

### Screenshots



<!-- GETTING STARTED -->
## Getting Started

To get started with the project, follow these steps:

### Prerequisites

* AWS account
* GitHub account

### Commands used

**Note:** 
* Make sure to enable port 8080 inbound traffic while creating the EC2 instance
* (with default settings) Login as "ubuntu" using putty with the .ppk file

* Inside the EC2 instance (choose OS as Ubuntu)
```sh
sudo apt update
```

* Installing Java inside EC2 instance
```sh
sudo apt install openjdk-11-jre
```

```sh
java -version
```

* Installing Jenkins on EC2 instance
```sh
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key |sudo gpg --dearmor -o /usr/share/keyrings/jenkins.gpg
```

```sh
sudo sh -c 'echo deb [signed-by=/usr/share/keyrings/jenkins.gpg] http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
```

```sh
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
  
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
```

```sh
sudo apt update
```

```sh
sudo apt install jenkins
```

```sh
sudo systemctl start jenkins.service
```

```sh
sudo systemctl status jenkins
```

```sh
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

* After setting up Jenkins, use the following commands to integrate it with GitHub

```sh
ssh-keygen
```

```sh
cat id_rsa.pub
```

```sh
cat id_rsa
```

* Running the Node.js app on EC2 instance

```sh
cd /var/lib/jenkins/workspace/todaysphere-app
```

```sh
sudo apt install nodejs
```

```sh
sudo apt install npm
```

```sh
sudo npm install
```

```sh
node app.js
```

* Installing Docker and Containerizing the Node.js app

```sh
sudo apt install docker.io
```

```sh
sudo chmod 777 /var/run/docker.sock
```

```sh
sudo docker build . -t todaysphere_app
```

```sh
sudo docker run -d --name todaysphereapp -p 3000:3000 todaysphere_app:latest
```

* Jenkins Build step (execute shell)

```sh
docker build . -t todaysphere_app
```

```sh
docker container rm -f todaysphereapp
```

```sh
docker run -d --name todaysphereapp -p 3000:3000 todaysphere_app:latest
```

* Optional - To open access to ports/firewall modification (incase 8080 port does not open)

```sh
sudo ufw allow OpenSSH
```

```sh
sudo ufw enable
```

```sh
sudo ufw allow 8080
```

```sh
sudo ufw status
```
