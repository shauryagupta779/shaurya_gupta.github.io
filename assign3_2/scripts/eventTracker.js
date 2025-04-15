function trackUserActivity() {
    // Add error tracking
    window.addEventListener('error', function(e) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, error, ${e.message} at ${e.filename}:${e.lineno}`);
    });

    document.addEventListener('click', function(e) {
        const target = e.target;
        const timestamp = new Date().toISOString();
        const elementType = getElementType(target);
        console.log(`${timestamp}, click, ${elementType}`);
    });

    window.addEventListener('load', function() {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, view, page_load`);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timestamp = new Date().toISOString();
                const elementType = getElementType(entry.target);
                console.log(`${timestamp}, view, ${elementType}`);
            }
        });
    });

    document.querySelectorAll('.trackable').forEach(element => {
        observer.observe(element);
    });
}

function getElementType(element) {
    if (!element) return 'unknown';
    
    if (element.tagName === 'IMG') return 'image';
    if (element.tagName === 'SELECT') return 'drop-down';
    if (element.tagName === 'BUTTON') return 'button';
    if (element.tagName === 'A') return 'link';
    if (element.classList.contains('content')) return 'content-section';
    
    return element.tagName.toLowerCase();
}

document.addEventListener('DOMContentLoaded', trackUserActivity);
