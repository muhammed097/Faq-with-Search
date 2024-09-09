const categories = document.querySelectorAll('.category');
const faqContainer = document.getElementById('faqContainer');
const faqs = faqContainer.querySelectorAll('.faq');
const searchInput = document.getElementById('searchInput');

function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    const toggle = question.querySelector('.faq-toggle img');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    toggle.src = answer.style.display === 'block' ? 'https://tripmonkey.in/wp-content/uploads/2024/07/Vector-4.svg' : 'https://tripmonkey.in/wp-content/uploads/2024/07/Vector-4-1.svg';
}

function filterFAQs(category) {
    faqs.forEach(faq => {
        if (category === 'overall' || faq.dataset.category === category) {
            faq.style.display = 'block';
        } else {
            faq.style.display = 'none';
        }
    });
    removeNotFoundMessage();
}

function createNotFoundMessage() {
    const message = document.createElement('div');
    message.id = 'not-found-message';
    message.textContent = 'No matching FAQs found. Please try a different search term.';
    message.style.textAlign = 'center';
    message.style.padding = '20px';
    message.style.color = '#666';
    return message;
}

function removeNotFoundMessage() {
    const existingMessage = document.getElementById('not-found-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

categories.forEach(category => {
    category.addEventListener('click', () => {
        categories.forEach(c => c.classList.remove('active-category'));
        category.classList.add('active-category');
        filterFAQs(category.dataset.category);
        searchInput.value = '';
    });
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => toggleFAQ(question));
});

searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    let foundMatch = false;

    faqs.forEach(faq => {
        const question = faq.querySelector('.faq-question').textContent.toLowerCase();
        const answer = faq.querySelector('.faq-answer').textContent.toLowerCase();

        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            faq.style.display = 'block';
            foundMatch = true;
        } else {
            faq.style.display = 'none';
        }
    });

    removeNotFoundMessage();

    if (!foundMatch) {
        faqContainer.appendChild(createNotFoundMessage());
    }

    categories.forEach(c => c.classList.remove('active-category'));
});

/* // Initially show all FAQs */
filterFAQs('overall');
categories[0].classList.add('active-category');