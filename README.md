# Inventory Check Report Generation

## Introduction

The `inventory-check-report-generation` project is a React + Vite-based application designed to automate the generation of reports. This project focuses on delivering a decoupled user interface, enabling users to interact with a streamlined and efficient system for their report generation needs. The application's UI is hosted on AWS S3 and served through AWS CloudFront, ensuring fast and reliable access from anywhere.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Accessing the Application](#accessing-the-application)
- [Project Structure](#project-structure)
- [Installation](#installation)

## Features

- **Report Automation Generation System**: Automates the process of generating reports, enhancing efficiency and accuracy.
- **Decoupled UI**: Provides a clean and user-friendly interface, separate from the core logic, ensuring a smooth user experience. Hosted on AWS S3 and served through AWS CloudFront for optimized delivery.

## Dependencies

The project's dependencies are listed in the `package.json` file. Review this file to understand the libraries and frameworks the project depends on.

## Documentation

For more detailed information about the project, including development guidelines, API documentation, and more, please refer to our comprehensive documentation hosted on XXX.

## Project Structure

Here's an overview of the project's code structure:

- `src`: Main source directory.
  - `assets`: Contains static assets like images and JSON files.
  - `components`: React components used throughout the application.
  - `pages`: React components representing different pages within the application.
  - `utils`: Utility functions and helpers.



## Deployment & CI/CD Pipeline

The deployment process and CI/CD pipeline for the `inventory-check-report-generation` project ensure that updates are automatically tested and deployed, maintaining high code quality and seamless delivery to production environments. Here's a brief overview of our deployment strategy and CI/CD pipeline:

### Continuous Integration (CI)

- **Automated Tests**: Upon each commit, automated tests are run to ensure that new changes do not break existing functionalities. This includes unit tests, integration tests, and end-to-end tests.
- **Code Quality Checks**: Code quality tools are integrated to scan for potential issues, ensuring adherence to coding standards and identifying potential security vulnerabilities.

### Continuous Deployment (CD)

- **Automated Deployment to AWS**: Changes that pass all CI checks are automatically deployed to AWS S3, and distributed via AWS CloudFront. This ensures that the latest version of the application is always available.
- **Environment Management**: We manage separate environments for development, testing, and production, allowing for safe testing of new features before they are released to end users.

### Pipeline Tools

- **GitHub Actions**: We use GitHub Actions for automating our CI/CD pipeline, from running tests to deploying changes.
- **AWS CodeBuild/CodeDeploy**: For AWS-specific tasks, we utilize AWS CodeBuild and CodeDeploy to handle the build and deployment processes within AWS.

### Accessing the Deployment

- The user interface of the application is accessible through AWS CloudFront, which provides fast and secure delivery. Ensure you have the correct URL to access the UI hosted on AWS S3 and served via CloudFront.

## Installation
To install and set up the project locally, use the following commands:

```bash
# Clone the repository
git clone https://github.com/1tangyen/inventory-check-report-generation.git

# Navigate to the project directory
cd inventory-check-report-generation

# Install dependencies
npm install

# Start the development server
npm run dev
