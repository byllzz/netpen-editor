export const defaultHtml = `
<div class="linktree">
  <img
    id="avatar"
    src=""
    alt="Bilal Malik"
    class="avatar"
    width="100"
    height="100"
  />
  <h1>Bilal Malik</h1>
  <p>Creative Developer &amp; UI Designer</p>
  <div class="links">
    <a href="https://github.com/byllzz" target="_blank" class="link-btn">GitHub</a>
    <a href="https://x.com/bilalmlkdev" target="_blank" class="link-btn">Twitter / X</a>
    <a href="https://bilalmlkdev.vercel.app" target="_blank" class="link-btn">Portfolio</a>
    <a href="https://uiverse.io/byllzz" target="_blank" class="link-btn">UIverse.io</a>
  </div>
</div>
`;

export const defaultCss = `
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, sans-serif;
  background: #0d0d0d;
  color: #f0f0f0;
  margin: 0;
  padding: 20px;
}

.linktree {
  text-align: center;
  max-width: 320px;
  width: 100%;
  padding: 2rem 1.5rem;
  background: #151515;
  border-radius: 20px;
  border: 1px solid #2a2a2a;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.linktree:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 50px rgba(0,0,0,0.8);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
  border: 4px solid #2a2a2a;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  background: #1a1a1a; /* fallback while loading */
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: #ffffff;
  letter-spacing: -0.5px;
}

p {
  color: #a1a1aa;
  font-size: 0.9rem;
  margin: 0 0 1.5rem;
  font-weight: 400;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-btn {
  display: block;
  padding: 0.9rem 1.5rem;
  background: #1a1a1a;
  color: #e0e0e0;
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.link-btn:hover {
  background: #2a2a2a;
  border-color: #6366f1;
  color: #ffffff;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}
`;

export const defaultJs = `
// Fetch your GitHub avatar and display it ✨
const avatar = document.getElementById('avatar');

async function loadAvatar() {
  try {
    const res = await fetch('https://api.github.com/users/byllzz');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    avatar.src = data.avatar_url;
    avatar.alt = data.name || 'Bilal Malik';
  } catch {
    // Fallback: a beautiful gradient placeholder
    avatar.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)';
  }
}

loadAvatar();
`;
