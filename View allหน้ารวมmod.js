document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderTrack = document.querySelector('.slider-track');
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    let currentSlide = 0;
    const totalSlides = sliderItems.length;
    let slideWidth;
    let autoSlideInterval; // สำหรับเก็บค่า interval ของ auto slide
    const autoSlideDelay = 3000; // 3 วินาทีสำหรับ auto slide

    // ฟังก์ชันสำหรับคำนวณความกว้างของสไลด์
    const getSlideWidth = () => {
        return sliderItems[0].offsetWidth; // ได้ความกว้างของ slider-item แรก
    };

    // ฟังก์ชันสำหรับสร้างจุด (dots)
    const createDots = () => {
        sliderDotsContainer.innerHTML = ''; // เคลียร์จุดเก่าออกก่อน
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
            dot.dataset.slide = i; // เก็บ index ของสไลด์ไว้ใน data attribute
            dot.addEventListener('click', (e) => {
                goToSlide(parseInt(e.target.dataset.slide));
                resetAutoSlide(); // รีเซ็ต auto slide เมื่อคลิกจุด
            });
            sliderDotsContainer.appendChild(dot);
        }
    };

    // ฟังก์ชันสำหรับอัปเดตสถานะของจุด (dots)
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

    // ฟังก์ชันสำหรับเลื่อนไปยังสไลด์ที่ระบุ
    const goToSlide = (index) => {
        // ตรวจสอบ Index เพื่อให้วนลูป
        if (index >= totalSlides) {
            index = 0; // ถ้าเกินสไลด์สุดท้าย ให้วนกลับไปที่สไลด์แรก
        } else if (index < 0) {
            index = totalSlides - 1; // ถ้าถอยหลังเกินสไลด์แรก ให้วนไปที่สไลด์สุดท้าย
        }

        currentSlide = index;
        slideWidth = getSlideWidth(); // ดึงความกว้างของสไลด์อีกครั้งเผื่อมีการปรับขนาดหน้าจอ

        // ใช้ setTimeout เพื่อให้แน่ใจว่า DOM ได้ render แล้วก่อนที่จะคำนวณ transform
        requestAnimationFrame(() => {
            sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            updateDots();
        });
    };

    // ฟังก์ชันสำหรับเลื่อนไปสไลด์ถัดไป
    const nextSlide = () => {
        goToSlide(currentSlide + 1);
    };

    // ฟังก์ชันสำหรับเลื่อนไปสไลด์ก่อนหน้า
    const prevSlide = () => {
        goToSlide(currentSlide - 1);
    };

    // ฟังก์ชันสำหรับเริ่มต้น auto slide
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    };

    // ฟังก์ชันสำหรับหยุดและรีเซ็ต auto slide (เมื่อผู้ใช้โต้ตอบ)
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Event Listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide(); // รีเซ็ต auto slide เมื่อคลิกปุ่ม
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide(); // รีเซ็ต auto slide เมื่อคลิกปุ่ม
    });

    // หยุด auto slide เมื่อเมาส์อยู่บน sliderContainer
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // เริ่ม auto slide ใหม่เมื่อเมาส์ออกจาก sliderContainer
    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // เมื่อหน้าจอถูกปรับขนาด (Responsive)
    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth(); // อัปเดตความกว้างของสไลด์
        goToSlide(currentSlide); // ปรับตำแหน่งสไลด์ปัจจุบันให้ถูกต้อง
        resetAutoSlide(); // รีเซ็ต auto slide
    });

    // การเริ่มต้นใช้งานเมื่อโหลดหน้าเว็บ
    createDots(); // สร้างจุดเริ่มต้น
    goToSlide(currentSlide); // กำหนดสไลด์เริ่มต้น
    startAutoSlide(); // เริ่ม auto slide
});