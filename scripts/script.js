document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Load saved theme or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleButton.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    
    toggleButton.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
                        ? 'light' 
                        : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleButton.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });

    createFloatingCircles();

    // Log page view
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, view, page loaded`);

    // Track clicks on all elements
    document.addEventListener('click', (event) => {
        const timestamp = new Date().toISOString();
        const objectType = getObjectType(event.target);
        console.log(`${timestamp}, click, ${objectType}`);
    });

    // Track specific interactions
    document.querySelectorAll('a, button, img').forEach(element => {
        element.addEventListener('click', (event) => {
            const timestamp = new Date().toISOString();
            const objectType = getObjectType(event.target);
            const additionalInfo = element.textContent || element.alt || element.id || '';
            console.log(`${timestamp}, click, ${objectType} - ${additionalInfo}`);
        });
    });
});

function analyzeText() {
    const text = document.getElementById("inputText").value;

    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const wordCount = (text.match(/\b\w+\b/g) || []).length;
    const spaceCount = (text.match(/ /g) || []).length;
    const newlineCount = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    const pronouns = ['i','you','he','she','it','we','they','me','him','her','us','them','my','your','his','its','our','their','mine','yours','hers','ours','theirs'];
    const prepositions = ['in','on','at','by','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','of','off','over','under'];
    const articles = ['a', 'an'];

    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

    const countTokens = (list) => {
        const counts = {};
        list.forEach(word => {
            const count = tokens.filter(t => t === word).length;
            if (count > 0) counts[word] = count;
        });
        return counts;
    };

    const output = document.getElementById("output");
    output.innerHTML = `
        <h3>Basic Stats</h3>
        <p>Letters: ${letterCount}</p>
        <p>Words: ${wordCount}</p>
        <p>Spaces: ${spaceCount}</p>
        <p>Newlines: ${newlineCount}</p>
        <p>Special Symbols: ${specialSymbols}</p>

        <h3>Pronoun Counts</h3>
        <pre>${JSON.stringify(countTokens(pronouns), null, 2)}</pre>

        <h3>Preposition Counts</h3>
        <pre>${JSON.stringify(countTokens(prepositions), null, 2)}</pre>

        <h3>Indefinite Article Counts</h3>
        <pre>${JSON.stringify(countTokens(articles), null, 2)}</pre>
    `;
}

function createFloatingCircles() {
    const container = document.querySelector('.floating-circles');
    const circleCount = 20;

    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        
        // Random properties
        const size = Math.random() * 30 + 10;
        const startPosition = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 10;
        
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${startPosition}vw`;
        circle.style.animationDelay = `${delay}s`;
        circle.style.animationDuration = `${duration}s`;
        
        container.appendChild(circle);
    }
}

// Function to identify object types
function getObjectType(target) {
    if (target.matches('img')) return 'image';
    if (target.matches('p, span')) return 'text';
    if (target.matches('a[href$=".pdf"]')) return 'CV link';
    if (target.matches('button')) return 'button';
    if (target.matches('textarea')) return 'textbox';
    if (target.matches('li, ul')) return 'list';
    if (target.matches('h1, h2, h3')) return 'heading';
    if (target.matches('section')) return 'section';
    if (target.matches('nav')) return 'navigation';
    return target.tagName.toLowerCase();
}
