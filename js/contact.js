// Contact Form and FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // In a real application, you would send this to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We\'ll get back to you within 24 hours.\n\nThis is a demo store. In a real store, this would be connected to a backend.');
            
            // Reset form
            this.reset();
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isActive) {
                answer.classList.add('active');
                this.querySelector('span').textContent = '−';
            } else {
                this.querySelector('span').textContent = '+';
            }
        });
    });
});