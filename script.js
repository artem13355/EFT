let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Optional: Auto-play
setInterval(nextSlide, 10000);

// Функции для работы с фотографиями
for (let i = 1; i <= 3; i++) {
    const photoInput = document.getElementById(`photo${i}`);
    const preview = document.getElementById(`preview${i}`);
    const infoText = document.getElementById(`info${i}`);

    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Очищаем предыдущий контент
                preview.innerHTML = '';
                
                // Создаем и добавляем изображение
                const img = document.createElement('img');
                img.src = e.target.result;
                preview.appendChild(img);

                // Обновляем информацию
                infoText.innerHTML = `
                    Имя файла: ${file.name}<br>
                    Размер: ${Math.round(file.size / 1024)} KB<br>
                    Тип: ${file.type}
                `;
            }

            reader.readAsDataURL(file);
        }
    });

    // Добавляем возможность открытия диалога при клике на превью
    preview.addEventListener('click', function() {
        photoInput.click();
    });
}
