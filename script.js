
const CHARSET = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};


const display = document.querySelector('#passwordDisplay');
const lengthInput = document.querySelector('#lengthInput');
const lengthLabel = document.querySelector('#lengthLabel');
const generateBtn = document.querySelector('#generateBtn');
const strengthBar = document.querySelector('#strengthBar');


lengthInput.addEventListener('input', (e) => {
    lengthLabel.textContent = `${e.target.value} chars`;
});


const showWarning = (msg) => {
    display.textContent = msg;
    display.classList.add('text-red-400');
    strengthBar.style.width = '0%';
};

const generatePassword = () => {
    const length = parseInt(lengthInput.value);
    const sets = {
        upper: document.querySelector('#checkUpper').checked,
        lower: document.querySelector('#checkLower').checked,
        numbers: document.querySelector('#checkNumbers').checked,
        symbols: document.querySelector('#checkSymbols').checked
    };

    
    let pool = "";
    if (sets.upper) pool += CHARSET.upper;
    if (sets.lower) pool += CHARSET.lower;
    if (sets.numbers) pool += CHARSET.numbers;
    if (sets.symbols) pool += CHARSET.symbols;

    
    if (!pool) {
        showWarning("SELECT OPTIONS");
        return;
    }

    
    let result = "";
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        result += pool[randomValues[i] % pool.length];
    }

    
    display.textContent = result;
    display.classList.remove('text-red-400');
    updateStrength(length, Object.values(sets).filter(Boolean).length);
};

const updateStrength = (len, count) => {
    const score = (len * count);
    let color = '#ef4444'; 
    let width = '33%';
    
    if (score > 40) { color = '#fbbf24'; width = '66%'; } 
    if (score > 80) { color = '#34d399'; width = '100%'; } 
    
    strengthBar.style.backgroundColor = color;
    strengthBar.style.width = width;
};


generateBtn.addEventListener('click', generatePassword);


document.querySelector('#copyBtn').addEventListener('click', () => {
    const text = display.textContent;
    if (text && text !== "SELECT OPTIONS" && text !== "••••••••") {
        navigator.clipboard.writeText(text);
        const btn = document.querySelector('#copyBtn');
        btn.textContent = "COPIED!";
        setTimeout(() => btn.textContent = "Copy to clipboard", 2000);
    }
});