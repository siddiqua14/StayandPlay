const nav = document.querySelector(".nav");
const mobileSearchIcon = document.querySelector("#mobileSearchIcon");
const mobileSearchInput = document.querySelector(".mobile-search-input");
const navOpenBtn = document.querySelector(".navOpenBtn");
const navCloseBtn = document.querySelector(".navCloseBtn");

mobileSearchIcon.addEventListener("click", () => {
    mobileSearchInput.classList.toggle("active");
    nav.classList.remove("openNav");
});

navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    mobileSearchInput.classList.remove("active");
});

navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
});

/////sliding 
document.querySelectorAll('.image-slider').forEach(slider => {
    const images = slider.querySelector('.slider-images');
    const dots = slider.querySelectorAll('.dot');
    const leftBtn = slider.querySelector('.left');
    const rightBtn = slider.querySelector('.right');
    let index = 0;
    let autoSlide;

    function showSlide(i) {
        index = i < 0 ? dots.length - 1 : i >= dots.length ? 0 : i;
        images.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => showSlide(index + 1), 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // Click navigation stops auto-slide and moves slides
    leftBtn.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index - 1);
    });

    rightBtn.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index + 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(i);
        });
    });

    // Start auto-slide initially
    // startAutoSlide();
});



function highlightSelectWrapper() {
    // Get the select-wrapper element
    const selectWrapper = document.getElementById('select-wrapper');

    // Add the highlight effect
    selectWrapper.style.border = '2px solid #007bff';

    // Function to remove highlight when clicking outside
    function handleClickOutside(event) {
        if (!selectWrapper.contains(event.target)) {
            // Reset the border
            selectWrapper.style.border = '1px solid #E5E7EB';
            // Remove this event listener
            document.removeEventListener('click', handleClickOutside);
        }
    }

    // Add a click event listener to the document
    document.addEventListener('click', handleClickOutside);
}

// Attach the function to the search-icon-wrapper click
document.querySelector('.search-icon-wrapper').addEventListener('click', (event) => {
    // Prevent the click from triggering the outside click listener immediately
    event.stopPropagation();
    highlightSelectWrapper();
});
// Attach the function to the mobile-search-icon-wrapper click
document.querySelector('.mobile-search-icon-wrapper').addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from triggering the outside click listener immediately
    highlightSelectWrapper();
});

///currency

///foooter
document.addEventListener('DOMContentLoaded', function () {
    const selectWrap = document.querySelector('.js-currency-sort');
    const defaultOption = selectWrap.querySelector('.default-option');
    const options = selectWrap.querySelectorAll('.select-ul li');

    // Toggle dropdown
    defaultOption.addEventListener('click', function (e) {
        e.stopPropagation();
        selectWrap.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            const selectedText = this.querySelector('p').textContent;
            const selectedCountry = this.getAttribute('data-currency-country');

            // Update default option text
            defaultOption.querySelector('p').textContent = selectedText;

            // Update data attribute
            selectWrap.setAttribute('data-currency-country', selectedCountry);

            // Close dropdown
            selectWrap.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!selectWrap.contains(e.target)) {
            selectWrap.classList.remove('active');
        }
    });

});



///input clear
document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('location');
    const clearButton = document.getElementById('clear-location');

    clearButton.addEventListener('click', function () {
        locationInput.value = '';
        clearButton.style.display = 'none';
    });

    locationInput.addEventListener('input', function () {
        clearButton.style.display = locationInput.value ? 'block' : 'none';
    });
});



// Gallery-related code
document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { url: './img/hotel.jpg', title: 'Beautiful lakefront view with private deck' },
        { url: './img/hotel1.png', title: 'Cozy cottage exterior with charming red door' },
        { url: './img/hotel2.png', title: 'Spacious living room with panoramic views' },
        { url: './img/hotel3.png', title: 'Spacious living room with panoramic views' },
        { url: './img/hotel5.jpeg', title: 'Master bedroom with ensuite' }
    ];

    let currentImageIndex = 0;
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const imageTitle = document.querySelector('.image-title');
    const imageCount = document.querySelector('.image-count');
    const morePhotos = document.querySelectorAll('.more-photos');

    // Update modal image, title, and count
    function updateModalImage() {
        const image = images[currentImageIndex];
        modalImg.src = image.url;
        modalImg.alt = image.title;
        imageTitle.textContent = image.title;
        imageCount.textContent = `${currentImageIndex + 1}/${images.length}`;

        // Hide or show navigation buttons based on the current image index
        prevBtn.style.display = currentImageIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentImageIndex === images.length - 1 ? 'none' : 'block';
    }

    // Open modal when 'See more' (desktop-more) is clicked
    morePhotos.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentImageIndex = 0;
            updateModalImage();
            modal.style.display = 'block';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Navigation: Prev and Next buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateModalImage();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateModalImage();
                }
            } else if (e.key === 'ArrowRight') {
                if (currentImageIndex < images.length - 1) {
                    currentImageIndex++;
                    updateModalImage();
                }
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });

    // Initialize the first image on page load
    updateModalImage();
});


// Add click handlers for filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    });
});

// Add click handlers for pagination
document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
            document.querySelector('.page-btn.active').classList.remove('active');
            btn.classList.add('active');
        }
    });
});

// Example function to load resorts
function loadResorts(page) {
    // Fetch resort data and update the results container
    // This would be implemented based on your backend API
}