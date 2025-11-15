// Khởi tạo canvas và context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const selectedColorSpan = document.getElementById('selectedColor');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');
const presetColors = document.querySelectorAll('.preset-color');
const imageList = document.getElementById('imageList');

// Danh sách ảnh
const images = [
    { src: 'image.png', name: 'Dân tộc La Chí' },
    { src: '1.png', name: 'Dân tộc Giáy' },
    { src: '2.png', name: 'Dân tộc Gié-Triêng' },
    { src: '3.png', name: 'Dân tộc Hà Nhì' },
    { src: '4.png', name: 'Dân tộc Hoa' },
    { src: '5.png', name: 'Dân tộc Hrê' },
    { src: '6.png', name: 'Dân tộc Kháng' },
    { src: '7.png', name: 'Dân tộc Khmer' },
    { src: '8.png', name: 'Dân tộc Khơ mú' },
    { src: '9.png', name: 'Dân tộc Cơ Ho' },
    { src: '10.png', name: 'Dân tộc Cờ Lao' },
    { src: '11.png', name: 'Dân tộc Cơ Tu' },
    { src: '12.png', name: 'Dân tộc Co' },
    { src: '13.png', name: 'Dân tộc Cống' },
    { src: '15.png', name: 'Dân tộc Ê Đê' },
    { src: '16.png', name: 'Dân tộc Gia Rai' },
    { src: '17.png', name: 'Dân tộc Mảng' },
    { src: '18.png', name: 'Dân tộc M-Nông' },
    { src: '19.png', name: 'Dân tộc Mông' },
    { src: '20.png', name: 'Dân tộc Mường' },
    { src: '21.png', name: 'Dân tộc Ngái' },
    { src: '22.png', name: 'Dân tộc Nùng' },
    { src: '23.png', name: 'Dân tộc Ơ-Đu' },
    { src: '24.png', name: 'Dân tộc Pà Thẻn' },
    { src: '25.png', name: 'Dân tộc Phù Là' },
    { src: '26.png', name: 'Dân tộc Pu péo' },
    { src: '27.png', name: 'Dân tộc Ra Giai' },
    { src: '28.png', name: 'Dân tộc Rơ-Măm' },
    { src: '29.png', name: 'Dân tộc Sán Chay' },
    { src: '30.png', name: 'Dân tộc Sán Dìu' },
    { src: '31.png', name: 'Dân tộc Si La' },
    { src: '32.png', name: 'Dân tộc Tà Ôi' },
    { src: '33.png', name: 'Dân tộc Bana' },
    { src: '34.png', name: 'Dân tộc Bố Y' },
    { src: '35.png', name: 'Dân tộc Brâu' },
    { src: '36.png', name: 'Dân tộc Bru-Vân Kiều' },
    { src: '37.png', name: 'Dân tộc Chăm' },
    { src: '38.png', name: 'Dân tộc Chơ Ro' },
    { src: '39.png', name: 'Dân tộc Chu-ru' },
    { src: '40.png', name: 'Dân tộc Chứt' },
    { src: '41.png', name: 'Dân tộc Kinh' },
    { src: '42.png', name: 'Dân tộc La Ha' },
    { src: '43.png', name: 'Dân tộc La Hủ' },
    { src: '44.png', name: 'Dân tộc Lào' },
    { src: '45.png', name: 'Dân tộc Lô Lô' },
    { src: '46.png', name: 'Dân tộc Lự' },
    { src: '47.png', name: 'Dân tộc Mạ' },
    { src: '48.png', name: 'Dân tộc Xtiêng' },
    { src: '49.png', name: 'Dân tộc Tày' },
    { src: '50.png', name: 'Dân tộc Thái' },
    { src: '51.png', name: 'Dân tộc Thổ' },
    { src: '52.png', name: 'Dân tộc Xinh Mun' },
    { src: '53.png', name: 'Dân tộc Xơ Đăng' },
    { src: '14.png', name: 'Dân tộc Dao' },
]
// Biến lưu trữ
let urrentColor = '#ff6b9d';
let originalImage = null;
let imageData = null;
let currentImageSrc = images[0].src;
let currentImageIndex = 0;

// Hàm cập nhật active state của thumbnail
function updateActiveThumbnail(index) {
    document.querySelectorAll('.image-item').forEach((el, idx) => {
        if (idx === index) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

// Hàm load hình ảnh lên canvas
function loadImage(imageSrc, imageIndex) {
    const img = new Image();
    img.onload = function() {
        // Thiết lập kích thước canvas
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;
        
        // Tính toán kích thước phù hợp
        if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
        }
        if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Vẽ hình ảnh lên canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Lưu hình ảnh gốc
        originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Cập nhật active state nếu có index
        if (imageIndex !== undefined) {
            updateActiveThumbnail(imageIndex);
        }
    };
    img.onerror = function() {
        console.error('Không thể tải hình ảnh:', imageSrc);
        alert('Không thể tải hình ảnh: ' + imageSrc);
    };
    img.src = imageSrc;
}

// Hàm tạo thumbnail cho danh sách ảnh
function createImageThumbnail(image, index) {
    const item = document.createElement('div');
    item.className = 'image-item';
    if (index === currentImageIndex) {
        item.classList.add('active');
    }
    
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.name;
    img.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120"%3E%3Crect fill="%23ddd" width="120" height="120"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial"%3ELỗi%3C/text%3E%3C/svg%3E';
    };
    
    const label = document.createElement('div');
    label.className = 'image-label';
    label.textContent = image.name;
    
    item.appendChild(img);
    item.appendChild(label);
    
    item.addEventListener('click', function() {
        // Cập nhật index và load ảnh mới
        currentImageSrc = image.src;
        currentImageIndex = index;
        loadImage(image.src, index);
    });
    
    return item;
}

// Khởi tạo danh sách ảnh
function initImageList() {
    images.forEach((image, index) => {
        const thumbnail = createImageThumbnail(image, index);
        imageList.appendChild(thumbnail);
    });
}

// Khởi tạo danh sách ảnh và load ảnh đầu tiên
initImageList();
loadImage(currentImageSrc, currentImageIndex);

// Cập nhật màu được chọn
function updateColor(color) {
    currentColor = color;
    colorPicker.value = color;
    selectedColorSpan.textContent = color;
    
    // Cập nhật preset color active
    presetColors.forEach(btn => {
        if (btn.dataset.color === color) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Color picker event
colorPicker.addEventListener('input', function(e) {
    updateColor(e.target.value);
});

// Preset colors event
presetColors.forEach(btn => {
    btn.addEventListener('click', function() {
        updateColor(this.dataset.color);
    });
});

// Hàm chuyển đổi RGB sang hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Hàm chuyển đổi hex sang RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Hàm kiểm tra màu có phải là màu trắng/gần trắng không
function isWhiteOrNearWhite(r, g, b, a, tolerance = 30) {
    // Kiểm tra độ trong suốt
    if (a < 128) return false;
    
    // Tính độ sáng trung bình
    const brightness = (r + g + b) / 3;
    
    // Kiểm tra xem có phải màu trắng hoặc gần trắng không
    // và màu phải khác màu đen
    return brightness > (255 - tolerance) && (r > tolerance || g > tolerance || b > tolerance);
}

// Hàm kiểm tra hai màu có giống nhau không (với tolerance)
function colorsMatch(r1, g1, b1, a1, r2, g2, b2, a2, tolerance = 5) {
    return Math.abs(r1 - r2) < tolerance &&
           Math.abs(g1 - g2) < tolerance &&
           Math.abs(b1 - b2) < tolerance &&
           Math.abs(a1 - a2) < tolerance;
}

// Flood fill algorithm
function floodFill(x, y, fillColor) {
    // Lấy imageData hiện tại
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;
    
    // Chuyển đổi fillColor từ hex sang RGB
    const fillRgb = hexToRgb(fillColor);
    if (!fillRgb) return;
    
    // Lấy màu tại điểm click
    const index = (Math.floor(y) * width + Math.floor(x)) * 4;
    const startR = data[index];
    const startG = data[index + 1];
    const startB = data[index + 2];
    const startA = data[index + 3];
    
    // Nếu màu tại điểm click đã là màu fill hoặc không phải màu trắng, thì không làm gì
    if (!isWhiteOrNearWhite(startR, startG, startB, startA)) {
        return;
    }
    
    // Nếu màu tại điểm click đã là màu fill, không làm gì
    if (colorsMatch(startR, startG, startB, startA, fillRgb.r, fillRgb.g, fillRgb.b, 255)) {
        return;
    }
    
    // Queue cho flood fill
    const queue = [[Math.floor(x), Math.floor(y)]];
    const visited = new Set();
    
    while (queue.length > 0) {
        const [px, py] = queue.shift();
        const key = `${px},${py}`;
        
        // Kiểm tra bounds
        if (px < 0 || px >= width || py < 0 || py >= height) continue;
        if (visited.has(key)) continue;
        
        const idx = (py * width + px) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        
        // Kiểm tra xem có phải màu cần thay thế không
        if (!colorsMatch(r, g, b, a, startR, startG, startB, startA, 10)) {
            continue;
        }
        
        // Đánh dấu đã thăm
        visited.add(key);
        
        // Tô màu
        data[idx] = fillRgb.r;
        data[idx + 1] = fillRgb.g;
        data[idx + 2] = fillRgb.b;
        data[idx + 3] = 255;
        
        // Thêm các điểm lân cận vào queue
        queue.push([px + 1, py]);
        queue.push([px - 1, py]);
        queue.push([px, py + 1]);
        queue.push([px, py - 1]);
    }
    
    // Vẽ lại canvas với dữ liệu mới
    ctx.putImageData(imageData, 0, 0);
}

// Xử lý click trên canvas
canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tính toán tọa độ thực tế trên canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;
    
    // Thực hiện flood fill
    floodFill(canvasX, canvasY, currentColor);
});

// Reset hình ảnh
resetBtn.addEventListener('click', function() {
    if (originalImage) {
        ctx.putImageData(originalImage, 0, 0);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
});

// Tải xuống hình ảnh
downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    const imageName = images[currentImageIndex].name.replace(/\s+/g, '-').toLowerCase();
    link.download = `colored-${imageName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// Khởi tạo màu mặc định
updateColor(currentColor);
