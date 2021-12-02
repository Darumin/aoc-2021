let body = document.querySelector('body');
let hello = document.createElement('div');
hello.textContent = 'hello world';

body.appendChild(hello);
console.log(body, hello);