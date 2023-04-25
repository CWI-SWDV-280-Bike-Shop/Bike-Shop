# Bike Shop Application

This is a mobile application built with React Native and Expo, and uses Express + MongoDB as the backend to store and retrieve data. The purpose of this application is to allow users to browse, search, and purchase bicycles and related accessories from a fictitious bike shop. Test.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚲 Browse a list of bicycles and accessories
- 🔍 Filter and search for specific products
- 📇 View detailed product information, including photos and descriptions
- 🛒 Add products to a cart and complete a purchase
- 📅 View past orders and order history

## Installation

To install the application, you will need to have Node.js and npm installed on your system. You can then clone the repository and run the following command to install the necessary dependencies:

`npm install`

## Usage

To start the application, run the following command:

`npm start`

This will launch the Expo development server and open the application in your default web browser. You can then scan the QR code with your mobile device to open the application in the Expo client.

## Docker Usage

`docker-compose up`

## Contributing

Contributions to this project are welcome and encouraged (and required for a passing grade 😉). To contribute, please follow these steps:

IMPORTANT: Please use the following format for your branch names: `firstName/changes-to-be-made`

1. Create a new branch for your changes: `git branch <new_branch_name>`
2. Switch to that branch: `git checkout <new_branch_name>`
3. Make your changes
4. Add your changes to your "staging area": `git add <file_name>` or `git add .` to add everything from your current working directory, or `git add -A` (or `git add --all`) to add ALL changes
5. Commit your changes with descriptive commit messages: `git commit -m "changes you made"`
6. Push your branch to the remote repository (our code on Github): `git push origin <new_branch_name>`
7. Submit a pull request to the main repository: Log in to Github, click on Pull Requests, then follow the steps to Compare & pull request. Please delete your branch once it's been merged.
8. After the changes have been merged in the remote repository, go back to your local environment and switch back to the `main` branch: `git checkout main`
9. Pull down the changes: `git pull`
10. Delete your local branch, you don't need it anymore: `git branch -d <new_branch_name>`

Notes and Recommendations:

1. Steps 1 and 2 can be combined into a single command using the `-b` flag with `git checkout` to create a new branch and immediately switch to it: `git checkout -b <new_branch_name>`
2. For convenience, before deleting your branch in step 10, toss in a `git branch` to have your list of branches right above you in the terminal before deleting. Less scrolling needed in order to remember your branch name.

## Git - Useful Commands

List all local branches (Where am I?): `git branch`  
List all local changes (What have I done?): `git status`

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
