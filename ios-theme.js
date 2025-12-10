// iOS Theme JavaScript - Only for visual elements
document.addEventListener('DOMContentLoaded', function() {
    // Update iOS status bar time
    function updateIOSTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        const timeElement = document.querySelector('.ios-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    // Initialize time
    updateIOSTime();
    setInterval(updateIOSTime, 60000);
    
    // Add fade-in animations to cards
    const cards = document.querySelectorAll('.ios-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // iOS notification function (optional)
    window.showIOSNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'ios-notification';
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'success' ? 'var(--ios-success)' : 
                       type === 'error' ? 'var(--ios-error)' : 'var(--ios-accent)'};
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            max-width: 300px;
            animation: iosFadeIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };
});