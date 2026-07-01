export const defaultHtml = `<!-- Write your HTML here -->
<div class="container">
  <h1>Hello, NetPen!</h1>
  <p>Start editing to see magic happen ✨</p>
  <button onclick="handleClick()">Click me</button>
</div>`;

export const defaultCss = `/* Write your CSS here */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #0f0f0f;
  color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.container {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: #a1a1aa;
  margin-bottom: 1.5rem;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #4f46e5;
}`;

export const defaultJs = `// Write your JavaScript here
function handleClick() {
  const btn = document.querySelector('button');
  btn.textContent = 'Clicked! 🎉';
  btn.style.background = '#ec4899';

  setTimeout(() => {
    btn.textContent = 'Click me';
    btn.style.background = '#6366f1';
  }, 1000);
}`;
