# Social Media Wellbeing Filter

This is a Google Chrome extension, aiming to reduce the toxicity level in the user's Twitter feed.
It is based on determining the user's current mood through a quick questionnaire and using it to interpret which categories of tweets they would prefer to view. The extension also allows for fine tuning the user's feed by allowing them to toggle which categories they would like to view.

### How to run the extension

Currently, the extension relies on running the backend server locally. This is done by navigating from the main folder to src/backend and executing the commands: `venv\Scripts\activate` for Windows and `venv/bin/activate` for Unix-based OS. This is followed by running the python server using `flask run`.

### How to make changes to the frontend

The frontend is mostly based on the React.js framework and uses an optimized build created by a React 'compiler'.
If one wants to reload the extension after making some changes, they would need to run `npm run build` in order to recompile the project. It is possible to run a local server to simulate the popup, which is done by `npm start`, but the developer would need to comment out the dependencies to the Chrome storage, found in AppContent.tsx
