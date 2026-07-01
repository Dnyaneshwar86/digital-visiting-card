// Secure the site against basic inspection (Right-click, F12, Ctrl+Shift+I)
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});

function updatePrice() {
    const select = document.getElementById('serviceSelect');
    const priceDisplay = document.getElementById('priceDisplay');
    const priceValue = document.getElementById('priceValue');
    
    const selectedOption = select.options[select.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    
    if(price) {
        priceValue.innerText = price;
        priceDisplay.classList.remove('hidden');
    } else {
        priceDisplay.classList.add('hidden');
    }
}

function sendWhatsAppRequest() {
    const select = document.getElementById('serviceSelect');
    const budgetInput = document.getElementById('budgetInput').value;
    const service = select.value;
    const price = select.options[select.selectedIndex]?.getAttribute('data-price');
    
    if(!service) {
        alert('Please select a service first.');
        return;
    }

    // Basic sanitization
    const cleanBudget = budgetInput.replace(/[^0-9]/g, '');

    let message = `Hello Dnyaneshwar! I am interested in your *${service}* service.\n\n`;
    message += `Estimated Cost discussed: ₹${price}+\n`;
    if(cleanBudget) {
        message += `My Budget is: ₹${cleanBudget}\n`;
    }
    message += `\nPlease let me know how we can proceed further.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917507093235?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
}

function downloadVCard() {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:DNYANESHWAR ADAGALE\nTITLE:Professional Web & AI Solutions\nTEL;TYPE=WORK,VOICE:+917507093235\nEMAIL:contact@example.com\nURL:https://www.example.com\nADR;TYPE=WORK:;;Maharashtra;India\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Dnyaneshwar_Adagale.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function shareCard() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Dnyaneshwar Adagale - Digital Visiting Card',
                text: 'Check out Dnyaneshwar Adagale\'s Digital Visiting Card for Professional Web & AI Solutions.',
                url: window.location.href,
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        alert('Share feature is not supported on this browser. You can copy the URL to share.');
    }
}
