# ABE
##Online Encrpytion Learning Tool

Online Application for about Encryption. Allows users to login and register. Users can then create, save, encrypt, and decrypt messages.

## Table of Contents
1. [Software Requirements](#software-requirements)
1. [Insallation](#installation)
1. [Get Started](#get-started)
1. [Credits](#credits)

## Software Requirements
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [http-server](https://www.npmjs.com/package/http-server)

## Installation
- To clone the project down, run  ```git clone [repo link]```
- Run ```npm install``` from the root of the directory to install all of the dependencies

## Get Started
- You will need to fill out the fb-cred.js.example file for your use. This will require you to have a Firebase project. After starting a project the only changes it will need from a clean project are the activation of Email/Password under Auth -> Sign-in Method AND copy pasting this json into the database -> rules
```{
  "rules": {
    ".read": true,
    ".write": true,
    "users": {
      ".indexOn": [
        "uid"
      ]
    },
    "keypairs": {
      ".indexOn": [
        "uid"
      ]
    },
    "information": {
      ".indexOn": [
        "id"
      ]
    },
    "messages": {
      ".indexOn": [
        "uid"
      ]
    }
  }
}
```

### ABE Website Developers
- [Sam Baker](https://github.com/SamBDev)

