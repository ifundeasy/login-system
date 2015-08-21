# login-system
How to management login-system on your expressjs-application when you do instance expressjs on each child of the process on node-cluster.

This is my solution to solve the problem to manage session of express-session modules are used in conjunction with a cluster node module (npm cluster) with the aim of maximizing the request-response process that occurs in expressjs used in each process of the child.

## Feature
  - Multiple device login with expired time
  - Create user and clear session data

## Installation
```sh
$ sudo npm install
```
## How to use
##### Start the web application
```sh
$ node server.js
```
##### Create user
```sh
$ node createuser.js your_username your_password
```
##### Delete session data
```sh
$ node clearsession.js
```
## License
MIT
