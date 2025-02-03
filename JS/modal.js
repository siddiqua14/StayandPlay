//////////////////////  Date and Calendar ///////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    const calendarModal = document.getElementById('modal-calendar');
    const calendarClose = document.getElementById('js-calendar-close');
    const inputField = document.getElementById('input-id'); // Hidden input for date selection
    const calendarContainer = document.getElementById('calendar-container');
    const nightElement = document.getElementById('night');
    const clearButton = document.getElementById('clear-btn');
    const overlay = document.querySelector('.modal-overlay');

    let selectedStartDate = null;
    let selectedEndDate = null;
    let selectedInput = null;
    let datepicker = null;

    // Function to initialize the hotel datepicker
    function initializeDatepicker() {
        if (!datepicker) {
            datepicker = new HotelDatepicker(inputField, {
                container: calendarContainer,
                inline: true,
                format: 'YYYY-MM-DD',
                startOfWeek: 'monday',
                submitButton: false,
                enableCheckout: true,
                preventContainerClose: true, // Prevent it from closing automatically
                autoClose: false, // Don't close the calendar automatically after a date is selected
                showTopbar: true,
                moveBothMonths: true,
                minNights: 1,
                maxNights: 30,
                setValue: function (formatted, start, end) {
                    if (start && !selectedStartDate) {
                        selectedStartDate = start;
                        checkInInput.value = selectedStartDate;
                    }

                    if (end) {
                        selectedEndDate = end;
                        checkOutInput.value = selectedEndDate;
                    }

                    updateNightCount(selectedStartDate, selectedEndDate);
                }
            });
        }
    }

    // Open the calendar modal
    function openCalendar(input) {
        selectedInput = input;
        calendarModal.style.display = 'block'; 
        
        initializeDatepicker();
    }

    // Close the calendar modal
    function closeCalendar() {
        calendarModal.style.display = 'none'; // Hide the modal
    }
    // Clear calendar selection
    function clearSelection() {
        // Reset the datepicker
        if (datepicker) {
            datepicker.clear();
        }
        
        // Reset variables
        selectedStartDate = null;
        selectedEndDate = null;
        
        // Clear input values
        checkInInput.value = '';
        checkOutInput.value = '';
        
        // Reset night count
        if (nightElement) {
            nightElement.textContent = '1 Night';
        }
        
        // Add visual feedback
        const clearBtn = document.querySelector('.clear-btn');
        clearBtn.classList.add('clicked');
        setTimeout(() => clearBtn.classList.remove('clicked'), 200);
    }

    // Update night count between check-in and check-out dates
    function updateNightCount(start, end) {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

            if (nightElement) {
                nightElement.textContent = `${nights} ${nights === 1 ? 'Night' : 'Nights'}`;
            }
        }
    }

    // Open modal on check-in input click
    checkInInput.addEventListener('click', function () {
        selectedStartDate = null; // Reset when reopening the calendar
        selectedEndDate = null;
        openCalendar(checkInInput); // Open calendar for check-in
    });

    // Open modal on check-out input click (only if check-in date is selected)
    checkOutInput.addEventListener('click', function () {
        if (!selectedStartDate) {
            alert('Please select a check-in date first');
            return; // Prevent opening check-out calendar if no check-in date is selected
        }
        // Open the calendar for check-out and preset the check-in date
        openCalendar(checkOutInput);
    });

    // Close modal when clicking close button
    calendarClose.addEventListener('click', closeCalendar);
    // Close on overlay click (outside modal)
    calendarModal.addEventListener('click', function(e) {
        if (e.target === calendarModal) {
            closeCalendar();
        }
    });

    // Clear button functionality
    if (clearButton) {
        clearButton.addEventListener('click', clearSelection);
    }

    // Escape key closes modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && calendarModal.style.display === 'block') {
            closeCalendar();
        }
    });
});
