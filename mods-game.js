document.addEventListener('DOMContentLoaded', () => {
    /* =======================================
       1. Image Slider Functionality
       ======================================= */
    const sliderContainer = document.querySelector('.slider-container');
    const sliderTrack = document.querySelector('.slider-track');
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    let currentSlide = 0;
    const totalSlides = sliderItems.length;
    let slideWidth;
    let autoSlideInterval;
    const autoSlideDelay = 3000; // 3 วินาที

    const getSlideWidth = () => sliderItems[0].offsetWidth;

    const createDots = () => {
        sliderDotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
            dot.dataset.slide = i;
            dot.addEventListener('click', (e) => {
                goToSlide(parseInt(e.target.dataset.slide));
                resetAutoSlide();
            });
            sliderDotsContainer.appendChild(dot);
        }
    };

    const updateDots = () => {
        const dots = document.querySelectorAll('.slider-dots .dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const goToSlide = (index) => {
        if (index >= totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = totalSlides - 1;
        }

        currentSlide = index;
        slideWidth = getSlideWidth();

        requestAnimationFrame(() => {
            sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            updateDots();
        });
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Event Listeners for Slider
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderContainer.addEventListener('mouseleave', () => startAutoSlide());

    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth();
        goToSlide(currentSlide);
        resetAutoSlide();
    });

    // Initial load for Slider
    createDots();
    goToSlide(currentSlide);
    startAutoSlide();


    /* =======================================
       2. Dynamic Background by Time of Day
       ======================================= */
    const body = document.body;

    // Object ที่เก็บ Path ของรูปภาพพื้นหลังและสีสำหรับแต่ละช่วงเวลา
    const imagePaths = {
        morning: {
            url: "url('https://example.com/images/morning-bg.jpg')", // <<== เปลี่ยน URL เป็นรูปของคุณ
            color: '#2a2e3a' // สีโทนสว่างขึ้น
        },
        day: {
            url: "url('https://example.com/images/day-bg.jpg')",     // <<== เปลี่ยน URL เป็นรูปของคุณ
            color: '#1a1a1a' // หรือสีเดิม
        },
        evening: {
            url: "url('https://example.com/images/evening-bg.jpg')", // <<== เปลี่ยน URL เป็นรูปของคุณ
            color: '#0e0e1a' // สีโทนเข้ม
        },
        night: {
            url: "url('https://example.com/images/night-bg.jpg')",   // <<== เปลี่ยน URL เป็นรูปของคุณ
            color: '#08080c' // สีโทนกลางคืน
        }
    };

    function setDynamicBackground() {
        const hour = new Date().getHours();
        let selectedBackground;

        if (hour >= 5 && hour < 12) {
            selectedBackground = imagePaths.morning;
        } else if (hour >= 12 && hour < 18) {
            selectedBackground = imagePaths.day;
        } else if (hour >= 18 && hour < 21) {
            selectedBackground = imagePaths.evening;
        } else {
            selectedBackground = imagePaths.night;
        }

        // Apply background and color with transition (CSS handles the transition)
        body.style.backgroundImage = selectedBackground.url;
        body.style.backgroundColor = selectedBackground.color;
    }

    // เรียกใช้ฟังก์ชัน Dynamic Background ครั้งแรกเมื่อโหลดหน้า
    setDynamicBackground();

   // เรียกใช้ฟังก์ชัน Dynamic Background ครั้งแรกเมื่อโหลดหน้า
    setDynamicBackground();

    // ตั้งเวลาให้เปลี่ยนพื้นหลังทุกๆ 2 นาที
    setInterval(setDynamicBackground, 120000); // 120000 ms = 2 นาที
});
    // หากต้องการให้แม่นยำยิ่งขึ้น คุณอาจจะคำนวณเวลาที่เหลือจนถึงต้นชั่วโมงถัดไป แล้วตั้ง setTimeout ให้เปลี่ยนเมื่อถึงต้นชั่วโมงพอดี
    // แต่สำหรับ Dynamic Background แบบนี้ การเช็คทุก 5 นาทีก็เพียงพอแล้วและจัดการง่ายกว่า
