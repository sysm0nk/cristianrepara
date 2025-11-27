import { useState, useEffect } from 'react';

const LINKEDIN_URL = "https://www.linkedin.com/in/yourprofile"; // UPDATE THIS

export default function XPPortfolio() {
  const [time, setTime] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [clippyVisible, setClippyVisible] = useState(true);
  const [clippyMessage, setClippyMessage] = useState(0);
  const [clippyPosition, setClippyPosition] = useState({ x: window.innerWidth - 250, y: window.innerHeight - 350 });

  const clippyMessages = [
    "Hi! 👋 I'm Clippy! It looks like you're checking out this portfolio. Want me to show you around?",
    "Did you know? This entire page was built with React! Pretty cool, huh? 🚀",
    "Pro tip: Try double-clicking those desktop icons! They actually open! 🖱️",
    "I see you're still here! Why not check out the LinkedIn profile? I promise I won't follow you there... 😉",
    "Fun fact: I was originally retired in 2007, but I'm making a comeback just for this portfolio! 📎",
    "Between you and me, the person who made this portfolio is pretty talented. You should hire them! 💼",
    "Miss the old days of Windows XP? Me too! Those were simpler times... *nostalgic paperclip sounds* 🎵",
    "Hey, have you tried the Start Menu? It's got some neat stuff in there! Just click that green button. 🟢",
    "I may just be a paperclip, but I've got great references! Get it? ...I'll see myself out. 😄"
  ];

  const changeClippyMessage = () => {
    setClippyMessage((prev) => (prev + 1) % clippyMessages.length);
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const desktopIcons = [
    { id: 'about', name: 'About Me', icon: '📁', type: 'folder', top: 20, left: 20 },
    { id: 'projects', name: 'My Projects', icon: '💼', type: 'folder', top: 100, left: 20 },
    { id: 'linkedin', name: 'LinkedIn', icon: '🔗', type: 'link', top: 180, left: 20, url: LINKEDIN_URL },
    { id: 'contact', name: 'Contact Me', icon: '📧', type: 'email', top: 260, left: 20 },
    { id: 'resume', name: 'Resume.pdf', icon: '📄', type: 'file', top: 340, left: 20 },
    { id: 'recycle', name: 'Recycle Bin', icon: '🗑️', type: 'system', top: 420, left: 20 },
  ];

  const openWindow = (iconId) => {
    const icon = desktopIcons.find(i => i.id === iconId);
    
    if (icon.type === 'link') {
      window.open(icon.url, '_blank');
      return;
    }
    
    if (!openWindows.find(w => w.id === iconId)) {
      const newWindow = {
        id: iconId,
        title: icon.name,
        icon: icon.icon,
        type: icon.type,
        x: 150 + openWindows.length * 30,
        y: 100 + openWindows.length * 30,
        width: 600,
        height: 400,
        minimized: false,
        maximized: false
      };
      setOpenWindows([...openWindows, newWindow]);
      setActiveWindow(iconId);
    } else {
      setActiveWindow(iconId);
    }
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => w.id === id ? {...w, minimized: true} : w));
    setActiveWindow(null);
  };

  const restoreWindow = (id) => {
    setOpenWindows(openWindows.map(w => w.id === id ? {...w, minimized: false} : w));
    setActiveWindow(id);
  };

  const toggleMaximize = (id) => {
    setOpenWindows(openWindows.map(w => w.id === id ? {...w, maximized: !w.maximized} : w));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div 
      className="w-full h-screen relative overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #245EDC 0%, #3A7BD5 20%, #5A9FD4 40%, #7AB8D4 50%, #8BC34A 50%, #7CB342 60%, #689F38 80%, #558B2F 100%)',
        fontFamily: 'Tahoma, sans-serif'
      }}
      onClick={() => { setSelectedIcon(null); setStartMenuOpen(false); }}
    >
      {/* Bliss clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-32 bg-white/30 rounded-full blur-3xl" style={{ top: '5%', left: '10%' }} />
        <div className="absolute w-96 h-40 bg-white/25 rounded-full blur-3xl" style={{ top: '8%', left: '40%' }} />
        <div className="absolute w-72 h-36 bg-white/20 rounded-full blur-3xl" style={{ top: '3%', left: '70%' }} />
      </div>

      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          selected={selectedIcon === icon.id}
          onSelect={() => { setSelectedIcon(icon.id); setStartMenuOpen(false); }}
          onOpen={() => openWindow(icon.id)}
        />
      ))}

      {/* Windows */}
      {openWindows.filter(w => !w.minimized).map((win) => (
        <Window
          key={win.id}
          window={win}
          isActive={activeWindow === win.id}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => toggleMaximize(win.id)}
          onFocus={() => setActiveWindow(win.id)}
        />
      ))}

      {/* Clippy Assistant */}
      {clippyVisible && (
        <div
          className="absolute flex gap-3 pointer-events-auto"
          style={{
            left: clippyPosition.x,
            top: clippyPosition.y,
            zIndex: 200
          }}
        >
          {/* Speech Bubble */}
          <div 
            className="relative bg-yellow-50 border-2 border-gray-800 rounded-lg p-3 max-w-xs shadow-lg"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            <button
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow"
              onClick={() => setClippyVisible(false)}
            >
              ×
            </button>
            <p className="text-sm text-gray-800 leading-relaxed">
              {clippyMessages[clippyMessage]}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded shadow"
                onClick={changeClippyMessage}
              >
                Tell me more
              </button>
              <button
                className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs rounded shadow"
                onClick={() => setClippyVisible(false)}
              >
                Dismiss
              </button>
            </div>
            {/* Speech bubble pointer */}
            <div 
              className="absolute w-0 h-0 border-8"
              style={{
                right: '-18px',
                top: '20px',
                borderColor: 'transparent transparent transparent #1f2937',
              }}
            />
            <div 
              className="absolute w-0 h-0 border-8"
              style={{
                right: '-14px',
                top: '20px',
                borderColor: 'transparent transparent transparent #fffbeb',
              }}
            />
          </div>

          {/* Clippy Character */}
          <div className="flex-shrink-0">
            <svg width="80" height="100" viewBox="0 0 80 100" className="drop-shadow-lg">
              {/* Shadow */}
              <ellipse cx="40" cy="95" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />
              
              {/* Body - Main Paperclip */}
              <path
                d="M 35 20 Q 25 20 25 30 L 25 70 Q 25 85 40 85 Q 55 85 55 70 L 55 25 Q 55 15 45 15 Q 40 15 40 20"
                fill="none"
                stroke="#0066cc"
                strokeWidth="8"
                strokeLinecap="round"
              />
              
              {/* Inner loop */}
              <path
                d="M 40 20 L 40 65 Q 40 72 45 72 Q 48 72 48 68 L 48 30"
                fill="none"
                stroke="#0066cc"
                strokeWidth="6"
                strokeLinecap="round"
              />
              
              {/* Eyes */}
              <g className="clippy-eyes">
                <circle cx="30" cy="35" r="3" fill="#000" />
                <circle cx="43" cy="35" r="3" fill="#000" />
                {/* Eye highlights */}
                <circle cx="31" cy="34" r="1.5" fill="#fff" />
                <circle cx="44" cy="34" r="1.5" fill="#fff" />
              </g>
              
              {/* Smile */}
              <path
                d="M 28 42 Q 36 48 44 42"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
              />
              
              {/* Eyebrows */}
              <path d="M 26 30 Q 30 28 34 30" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 39 30 Q 43 28 47 30" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              
              {/* Shine effect */}
              <path
                d="M 32 22 Q 30 25 30 30 L 30 50"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <div 
          className="absolute bottom-8 left-0 w-80 rounded-tr-lg overflow-hidden"
          style={{ 
            background: 'linear-gradient(180deg, #3168d5 0%, #4a7fe0 3%, #2b5fc2 5%, #2b5fc2 95%, #1e4a9c 100%)',
            boxShadow: '2px -2px 10px rgba(0,0,0,0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 flex items-center gap-3" style={{ background: 'linear-gradient(180deg, #2b5fc2 0%, #1e4a9c 100%)' }}>
            <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center text-2xl">👤</div>
            <span className="text-white font-bold text-sm">Portfolio</span>
          </div>
          
          <div className="flex">
            <div className="w-1/2 bg-white py-1">
              <MenuItem icon="📁" text="About Me" bold onClick={() => { openWindow('about'); setStartMenuOpen(false); }} />
              <MenuItem icon="💼" text="My Projects" bold onClick={() => { openWindow('projects'); setStartMenuOpen(false); }} />
              <div className="border-t border-gray-300 my-1" />
              <MenuItem icon="📄" text="Resume" onClick={() => { openWindow('resume'); setStartMenuOpen(false); }} />
              <MenuItem icon="📧" text="Contact" onClick={() => { openWindow('contact'); setStartMenuOpen(false); }} />
            </div>
            <div className="w-1/2 py-1" style={{ background: '#d3e5fa' }}>
              <MenuItem icon="🔗" text="LinkedIn" light onClick={() => window.open(LINKEDIN_URL, '_blank')} />
              <MenuItem icon="🌐" text="Portfolio Site" light />
              <MenuItem icon="💻" text="GitHub" light />
              <div className="border-t border-gray-300 my-1" />
              <MenuItem icon="📎" text={clippyVisible ? "Hide Clippy" : "Show Clippy"} light onClick={() => setClippyVisible(!clippyVisible)} />
            </div>
          </div>

          <div className="flex justify-end gap-2 p-2" style={{ background: 'linear-gradient(180deg, #3168d5 0%, #1e4a9c 100%)' }}>
            <button className="px-3 py-1 text-xs text-white flex items-center gap-1 rounded hover:bg-white/20">
              ❓ Help
            </button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between"
        style={{ 
          background: 'linear-gradient(180deg, #3168d5 0%, #4a7fe0 3%, #2358c5 8%, #1941a3 92%, #1635a0 100%)',
          boxShadow: '0 -1px 3px rgba(0,0,0,0.2)'
        }}
      >
        <button 
          className="h-full px-3 flex items-center gap-2 text-white font-bold text-sm rounded-r-lg"
          style={{ 
            background: startMenuOpen 
              ? 'linear-gradient(180deg, #3c8a2e 0%, #47a335 50%, #3c8a2e 100%)'
              : 'linear-gradient(180deg, #5db243 0%, #3c9a2e 10%, #328a24 90%, #2d7d20 100%)',
            textShadow: '1px 1px 1px rgba(0,0,0,0.3)'
          }}
          onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); }}
        >
          <span className="text-lg">🪟</span>
          <span style={{ fontStyle: 'italic' }}>start</span>
        </button>

        <div className="flex-1 flex items-center px-2 gap-1">
          {openWindows.map(win => (
            <button
              key={win.id}
              className="px-2 py-1 text-xs text-white flex items-center gap-1 rounded"
              style={{
                background: win.minimized ? 'linear-gradient(180deg, #2358c5 0%, #1941a3 100%)' : activeWindow === win.id ? 'linear-gradient(180deg, #1a4a8a 0%, #0f3670 100%)' : 'linear-gradient(180deg, #2358c5 0%, #1941a3 100%)',
                border: activeWindow === win.id ? '1px solid #0f3670' : '1px solid transparent'
              }}
              onClick={() => win.minimized ? restoreWindow(win.id) : setActiveWindow(win.id)}
            >
              <span>{win.icon}</span>
              <span>{win.title}</span>
            </button>
          ))}
        </div>

        <div 
          className="h-full px-3 flex items-center gap-2"
          style={{ 
            background: 'linear-gradient(180deg, #1a8cd8 0%, #1670b8 50%, #0f5a96 100%)',
            borderLeft: '1px solid #0f4a7f'
          }}
        >
          <span className="text-white text-xs">🔊</span>
          <span className="text-white text-xs" style={{ textShadow: '0 0 2px rgba(0,0,0,0.3)' }}>
            {formatTime(time)}
          </span>
        </div>
      </div>
    </div>
  );
}

function DesktopIcon({ icon, selected, onSelect, onOpen }) {
  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{ top: icon.top, left: icon.left, width: 75 }}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(); }}
    >
      <div className={`p-1 rounded ${selected ? 'bg-blue-600/50' : ''}`}>
        <div className="text-4xl drop-shadow-lg">{icon.icon}</div>
      </div>
      <span 
        className={`text-xs text-white text-center mt-1 px-1 leading-tight drop-shadow-md ${selected ? 'bg-blue-600' : ''}`}
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
      >
        {icon.name}
      </span>
    </div>
  );
}

function Window({ window: win, isActive, onClose, onMinimize, onMaximize, onFocus }) {
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (win.maximized) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    onFocus();
  };

  const handleMouseMove = (e) => {
    if (isDragging && !win.maximized) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const style = win.maximized ? {
    left: 0,
    top: 0,
    width: '100%',
    height: 'calc(100% - 32px)',
  } : {
    left: position.x,
    top: position.y,
    width: win.width,
    height: win.height,
  };

  return (
    <div
      className="absolute flex flex-col rounded-lg overflow-hidden"
      style={{
        ...style,
        background: 'rgba(236, 233, 216, 0.98)',
        border: isActive ? '3px solid #0054E3' : '3px solid #7A96DF',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: isActive ? 100 : 50
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-7 flex items-center justify-between px-2 cursor-move"
        style={{
          background: isActive 
            ? 'linear-gradient(180deg, #0054E3 0%, #0041C2 100%)'
            : 'linear-gradient(180deg, #7A96DF 0%, #6A86CF 100%)'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">{win.icon}</span>
          <span className="text-white text-sm font-bold drop-shadow">{win.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            className="w-5 h-5 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          >
            _
          </button>
          <button 
            className="w-5 h-5 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold"
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
          >
            □
          </button>
          <button 
            className="w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-xs font-bold"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-4">
        <WindowContent type={win.type} id={win.id} />
      </div>
    </div>
  );
}

function WindowContent({ type, id }) {
  if (id === 'about') {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-800">👋 Hello! I'm [Your Name]</h2>
        <p className="text-gray-700">
          Welcome to my nostalgic Windows XP portfolio! I'm a [Your Role/Title] passionate about 
          creating memorable digital experiences.
        </p>
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-bold text-blue-700">🎯 What I Do:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Skill or expertise #1</li>
            <li>Skill or expertise #2</li>
            <li>Skill or expertise #3</li>
          </ul>
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-bold text-blue-700">💡 Fun Facts:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Interesting fact about you</li>
            <li>Hobby or interest</li>
            <li>Something that makes you unique</li>
          </ul>
        </div>
      </div>
    );
  }

  if (id === 'projects') {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-800">💼 My Projects</h2>
        
        <div className="border-2 border-blue-300 p-3 rounded bg-white">
          <h3 className="text-lg font-bold text-blue-700">🚀 Project Name 1</h3>
          <p className="text-gray-700 mt-2">Brief description of what this project does and the technologies used.</p>
          <div className="mt-2 flex gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">TypeScript</span>
          </div>
        </div>

        <div className="border-2 border-blue-300 p-3 rounded bg-white">
          <h3 className="text-lg font-bold text-blue-700">🎨 Project Name 2</h3>
          <p className="text-gray-700 mt-2">Another cool project you've worked on.</p>
          <div className="mt-2 flex gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Node.js</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">MongoDB</span>
          </div>
        </div>

        <div className="border-2 border-blue-300 p-3 rounded bg-white">
          <h3 className="text-lg font-bold text-blue-700">✨ Project Name 3</h3>
          <p className="text-gray-700 mt-2">Yet another awesome project showcasing your skills.</p>
          <div className="mt-2 flex gap-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Python</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">AI/ML</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'contact') {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-800">📧 Get In Touch</h2>
        <p className="text-gray-700">
          I'd love to hear from you! Feel free to reach out through any of these channels:
        </p>
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 p-3 bg-white border-2 border-blue-200 rounded">
            <span className="text-2xl">📧</span>
            <div>
              <div className="font-bold text-blue-700">Email</div>
              <div className="text-gray-700">your.email@example.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white border-2 border-blue-200 rounded">
            <span className="text-2xl">🔗</span>
            <div>
              <div className="font-bold text-blue-700">LinkedIn</div>
              <div className="text-blue-600 cursor-pointer hover:underline" onClick={() => window.open(LINKEDIN_URL, '_blank')}>
                View my profile
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white border-2 border-blue-200 rounded">
            <span className="text-2xl">💻</span>
            <div>
              <div className="font-bold text-blue-700">GitHub</div>
              <div className="text-gray-700">github.com/yourusername</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'resume') {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-800">📄 Resume</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-blue-700">💼 Experience</h3>
            <div className="mt-2 space-y-3">
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="font-bold">Job Title at Company</div>
                <div className="text-sm text-gray-600">2020 - Present</div>
                <p className="text-gray-700 mt-1">Description of your role and achievements.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="font-bold">Previous Role at Company</div>
                <div className="text-sm text-gray-600">2018 - 2020</div>
                <p className="text-gray-700 mt-1">What you did and accomplished here.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-blue-700">🎓 Education</h3>
            <div className="mt-2 border-l-4 border-green-500 pl-3">
              <div className="font-bold">Degree in Field</div>
              <div className="text-sm text-gray-600">University Name, Year</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-blue-700">🛠️ Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">JavaScript</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">React</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">Node.js</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">Python</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">SQL</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center text-gray-500 mt-8">
      <p>Content for {id}</p>
    </div>
  );
}

function MenuItem({ icon, text, bold, light, onClick }) {
  return (
    <div 
      className={`px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-blue-600 hover:text-white ${light ? 'text-gray-700' : 'text-gray-800'}`}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className={`text-xs ${bold ? 'font-bold' : ''}`}>{text}</span>
    </div>
  );
}
