Steps to reproduce flatgeobuf timeout error
- npm install
- npm test

Downgrade to resolve the issue (issue seems to have started with 3.27.3)
- npm install --save-exact flatgeobuf@3.27.2
- npm test