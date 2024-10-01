# React Pseudocode Generator

This project is a simple web-based tool built with React that generates pseudocode for functional components based on user input. It allows users to dynamically specify component names, state management (`useState`), side effects (`useEffect`), and API call types (`GET`, `POST`, `PUT`, `DELETE`). The application generates the pseudocode accordingly and provides the option to copy it to the clipboard.

## Features
- **Dynamic Pseudocode Generation**: Create pseudocode for functional React components with various configurations such as:

  - Component name
  - State management using useState
  - Side effects using useEffect
  - API calls using axios (GET, POST, PUT, DELETE)

- **API Call Handling**: Based on the selected API call type, the tool generates appropriate pseudocode using axios to perform API requests.

- **Copy to Clipboard**: Easily copy the generated pseudocode to the clipboard for further use.

## Getting Started
Node.js and npm should be installed on your system.

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/lakshyakaran/react-pseudocode-generator.git
  ```
2. Navigate into the project directory:
  ```bash
  cd react-pseudocode-generator
 ```
3. Install dependencies:
  ```bash
  npm install
 ```
4. Run the project locally:
  ```bash
   npm start
 ```

This will start the development server and open the application in your default browser.


### Usage

1. Enter the **Component Name**.

2. Choose whether to include `useState` and/or `useEffect`.

3. Select the API Call Type (`GET`, `POST`, `PUT`, `DELETE`) and enter the API URL.

4. Click `Generate Pseudocode` to generate the pseudocode.

5. Copy the generated pseudocode by clicking the `Copy` button in the top-right corner of the pseudocode section.
