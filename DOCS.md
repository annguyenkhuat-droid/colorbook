# 📚 Tài Liệu Hướng Dẫn - Ứng Dụng Web Tô Màu

## 📋 Mục Lục

1. [Tổng Quan](#tổng-quan)
2. [Công Cụ Cần Có](#công-cụ-cần-có)
3. [Kiến Thức Cần Biết](#kiến-thức-cần-biết)
4. [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
5. [Giải Thích Code](#giải-thích-code)
6. [Thuật Toán Flood Fill](#thuật-toán-flood-fill)
7. [Cách Chạy Dự Án](#cách-chạy-dự-án)
8. [Hướng Dẫn Thêm Tính Năng](#hướng-dẫn-thêm-tính-năng)

---

## 🎯 Tổng Quan

Đây là một ứng dụng web tô màu cho phép người dùng:
- Chọn hình ảnh từ danh sách
- Chọn màu từ bảng màu hoặc color picker
- Click vào các vùng trắng để tô màu
- Reset hình ảnh về trạng thái ban đầu
- Tải xuống hình ảnh đã tô màu

**Công nghệ sử dụng:**
- HTML5 Canvas API
- JavaScript (ES6+)
- CSS3
- Thuật toán Flood Fill

---

## 🛠️ Công Cụ Cần Có

### 1. Trình Soạn Thảo Code
- **VS Code** (khuyến nghị) - https://code.visualstudio.com/
- Hoặc bất kỳ trình soạn thảo nào: Sublime Text, Atom, WebStorm, etc.

### 2. Trình Duyệt Web
- **Google Chrome** (khuyến nghị) - https://www.google.com/chrome/
- Firefox, Edge, Safari (hỗ trợ đầy đủ)

### 3. Web Server (Tùy chọn nhưng khuyến nghị)

#### Option 1: Python (Đơn giản nhất)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option 2: Node.js (http-server)
```bash
# Cài đặt
npm install -g http-server

# Chạy
http-server -p 8000
```

#### Option 3: VS Code Live Server Extension
- Cài đặt extension "Live Server" trong VS Code
- Click chuột phải vào `index.html` → "Open with Live Server"

### 4. Git (Tùy chọn)
- Để quản lý phiên bản code
- https://git-scm.com/

---

## 📖 Kiến Thức Cần Biết

### 1. HTML5 Basics
- Cấu trúc HTML
- Thẻ `<canvas>`, `<input>`, `<button>`
- Semantic HTML

### 2. CSS3
- Flexbox layout
- CSS Grid (tùy chọn)
- Responsive design
- CSS transitions và animations
- Media queries

### 3. JavaScript (ES6+)
- **DOM Manipulation**: `getElementById`, `querySelector`, `addEventListener`
- **Canvas API**: `getContext`, `drawImage`, `getImageData`, `putImageData`
- **Events**: `click`, `input`, `load`, `error`
- **Functions**: Arrow functions, Regular functions
- **Arrays**: `forEach`, `map`, `filter`
- **Objects**: Object destructuring, Object methods
- **Async/Aynchronous**: Promises, Callbacks

### 4. Canvas API (Quan trọng)
- **Context 2D**: `ctx.getContext('2d')`
- **Vẽ hình ảnh**: `ctx.drawImage()`
- **Lấy dữ liệu pixel**: `ctx.getImageData()`
- **Đặt dữ liệu pixel**: `ctx.putImageData()`
- **ImageData**: Cấu trúc dữ liệu RGBA (Red, Green, Blue, Alpha)

### 5. Thuật Toán
- **Flood Fill Algorithm**: Thuật toán tô màu vùng
- **Queue Data Structure**: Hàng đợi để duyệt pixels
- **Set Data Structure**: Lưu trữ pixels đã thăm

---

## 📁 Cấu Trúc Dự Án

```
colorbook/
├── index.html          # File HTML chính
├── style.css           # File CSS styling
├── script.js           # File JavaScript logic
├── image.png           # Hình ảnh 1
├── image copy.png      # Hình ảnh 2
├── image copy 2.png    # Hình ảnh 3
└── DOCS.md            # Tài liệu này
```

---

## 💻 Giải Thích Code

### 1. HTML Structure (`index.html`)

#### Canvas Element
```html
<canvas id="canvas"></canvas>
```
- Canvas là nơi hiển thị và xử lý hình ảnh
- Không có thuộc tính `width` và `height` trong HTML (set bằng JavaScript)

#### Color Picker
```html
<input type="color" id="colorPicker" value="#ff6b9d">
```
- Input type="color" cung cấp color picker mặc định của browser
- Giá trị mặc định: `#ff6b9d` (màu hồng)

#### Image Selector
```html
<div class="image-list" id="imageList">
    <!-- Danh sách ảnh được thêm bằng JavaScript -->
</div>
```
- Container để hiển thị danh sách thumbnail
- Được populate động bằng JavaScript

### 2. JavaScript Logic (`script.js`)

#### Khởi Tạo Canvas
```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```
- `canvas`: DOM element
- `ctx`: Context 2D để vẽ và thao tác trên canvas

#### Danh Sách Ảnh
```javascript
const images = [
    { src: 'image.png', name: 'Hình 1' },
    { src: 'image copy.png', name: 'Hình 2' },
    { src: 'image copy 2.png', name: 'Hình 3' }
];
```
- Array chứa thông tin các ảnh
- Mỗi object có `src` (đường dẫn) và `name` (tên hiển thị)

#### Load Hình Ảnh
```javascript
function loadImage(imageSrc, imageIndex) {
    const img = new Image();
    img.onload = function() {
        // Tính toán kích thước
        // Vẽ lên canvas
        // Lưu imageData gốc
    };
    img.src = imageSrc;
}
```

**Giải thích:**
1. Tạo đối tượng `Image()` mới
2. Event `onload`: Chạy khi ảnh load xong
3. Tính toán kích thước canvas dựa trên kích thước ảnh (max 800x800)
4. Vẽ ảnh lên canvas bằng `ctx.drawImage()`
5. Lưu `ImageData` gốc để reset sau này

#### Xử Lý Click trên Canvas
```javascript
canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tính toán tọa độ thực tế
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;
    
    floodFill(canvasX, canvasY, currentColor);
});
```

**Giải thích:**
1. `getBoundingClientRect()`: Lấy vị trí và kích thước canvas trên màn hình
2. `e.clientX`, `e.clientY`: Tọa độ click trên màn hình
3. Tính toán tọa độ thực tế trên canvas (vì canvas có thể được scale)
4. Gọi hàm `floodFill()` để tô màu

### 3. CSS Styling (`style.css`)

#### Flexbox Layout
```css
.controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}
```
- `display: flex`: Sử dụng Flexbox
- `flex-wrap: wrap`: Cho phép xuống dòng
- `gap: 20px`: Khoảng cách giữa các items
- `justify-content: center`: Căn giữa

#### Hover Effects
```css
.image-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
```
- `transform: translateY()`: Di chuyển lên trên khi hover
- `box-shadow`: Tạo bóng đổ
- `transition`: Tạo hiệu ứng mượt mà

---

## 🎨 Thuật Toán Flood Fill

### Giới Thiệu
Flood Fill là thuật toán tô màu một vùng liền kề có cùng màu. Giống như công cụ "Paint Bucket" trong Photoshop.

### Cách Hoạt Động

1. **Bắt đầu từ điểm click**
   - Lấy màu tại điểm click (startColor)

2. **Kiểm tra điều kiện**
   - Màu phải là màu trắng/gần trắng
   - Màu không được giống màu fill

3. **Duyệt các pixel lân cận**
   - Sử dụng Queue (hàng đợi)
   - Kiểm tra 4 hướng: trên, dưới, trái, phải
   - Nếu pixel có màu giống startColor → thêm vào queue

4. **Tô màu**
   - Thay đổi màu pixel thành màu fill
   - Đánh dấu đã thăm (dùng Set)

5. **Lặp lại**
   - Lấy pixel từ queue
   - Kiểm tra và tô màu
   - Thêm các pixel lân cận vào queue

### Code Implementation

```javascript
function floodFill(x, y, fillColor) {
    // 1. Lấy ImageData hiện tại
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // 2. Chuyển đổi fillColor từ hex sang RGB
    const fillRgb = hexToRgb(fillColor);
    
    // 3. Lấy màu tại điểm click
    const index = (Math.floor(y) * width + Math.floor(x)) * 4;
    const startR = data[index];
    const startG = data[index + 1];
    const startB = data[index + 2];
    const startA = data[index + 3];
    
    // 4. Kiểm tra điều kiện
    if (!isWhiteOrNearWhite(startR, startG, startB, startA)) {
        return; // Không phải màu trắng
    }
    
    // 5. Queue để duyệt
    const queue = [[Math.floor(x), Math.floor(y)]];
    const visited = new Set();
    
    // 6. Vòng lặp flood fill
    while (queue.length > 0) {
        const [px, py] = queue.shift();
        const key = `${px},${py}`;
        
        // Kiểm tra bounds và visited
        if (px < 0 || px >= width || py < 0 || py >= height) continue;
        if (visited.has(key)) continue;
        
        // Lấy màu pixel
        const idx = (py * width + px) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        
        // Kiểm tra màu có giống startColor không
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
        
        // Thêm các pixel lân cận vào queue
        queue.push([px + 1, py]);
        queue.push([px - 1, py]);
        queue.push([px, py + 1]);
        queue.push([px, py - 1]);
    }
    
    // 7. Vẽ lại canvas
    ctx.putImageData(imageData, 0, 0);
}
```

### Cấu Trúc ImageData

ImageData là một array một chiều chứa thông tin màu của từng pixel:

```
Pixel tại (x, y):
- Index = (y * width + x) * 4
- data[index]     = Red (0-255)
- data[index + 1] = Green (0-255)
- data[index + 2] = Blue (0-255)
- data[index + 3] = Alpha (0-255, 255 = không trong suốt)
```

### Hàm Hỗ Trợ

#### Kiểm Tra Màu Trắng
```javascript
function isWhiteOrNearWhite(r, g, b, a, tolerance = 30) {
    if (a < 128) return false; // Trong suốt
    const brightness = (r + g + b) / 3;
    return brightness > (255 - tolerance);
}
```

#### So Sánh Màu
```javascript
function colorsMatch(r1, g1, b1, a1, r2, g2, b2, a2, tolerance = 5) {
    return Math.abs(r1 - r2) < tolerance &&
           Math.abs(g1 - g2) < tolerance &&
           Math.abs(b1 - b2) < tolerance &&
           Math.abs(a1 - a2) < tolerance;
}
```

---

## 🚀 Cách Chạy Dự Án

### Bước 1: Mở Terminal/Command Prompt
```bash
cd "/home/dinh-tran/Documents/File lam viec/colorbook"
```

### Bước 2: Khởi Động Web Server

#### Sử dụng Python:
```bash
python3 -m http.server 8000
```

#### Sử dụng Node.js:
```bash
npx http-server -p 8000
```

### Bước 3: Mở Trình Duyệt
```
http://localhost:8000
```

### Bước 4: Sử Dụng Ứng Dụng
1. Chọn hình ảnh từ danh sách
2. Chọn màu từ bảng màu hoặc color picker
3. Click vào vùng trắng để tô màu
4. Nhấn "Làm mới" để reset
5. Nhấn "Tải xuống" để lưu hình ảnh

---

## 🔧 Hướng Dẫn Thêm Tính Năng

### 1. Thêm Ảnh Mới

#### Bước 1: Thêm file ảnh vào thư mục
```
colorbook/
└── new-image.png
```

#### Bước 2: Cập nhật danh sách ảnh trong `script.js`
```javascript
const images = [
    { src: 'image.png', name: 'Hình 1' },
    { src: 'image copy.png', name: 'Hình 2' },
    { src: 'image copy 2.png', name: 'Hình 3' },
    { src: 'new-image.png', name: 'Hình 4' }  // Thêm dòng này
];
```

### 2. Thêm Màu Preset Mới

#### Trong `index.html`:
```html
<button class="preset-color" data-color="#your-color" style="background-color: #your-color;"></button>
```

#### Trong `script.js` (tự động xử lý, không cần sửa)

### 3. Thay Đổi Kích Thước Canvas Tối Đa

#### Trong `script.js`, hàm `loadImage()`:
```javascript
const maxWidth = 1000;  // Thay đổi từ 800
const maxHeight = 1000; // Thay đổi từ 800
```

### 4. Thêm Tính Năng Undo/Redo

#### Thêm biến lưu lịch sử:
```javascript
let history = [];
let historyIndex = -1;

function saveState() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    history = history.slice(0, historyIndex + 1);
    history.push(imageData);
    historyIndex++;
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        ctx.putImageData(history[historyIndex], 0, 0);
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        ctx.putImageData(history[historyIndex], 0, 0);
    }
}
```

#### Gọi `saveState()` sau mỗi lần tô màu:
```javascript
// Trong hàm floodFill, sau khi putImageData
saveState();
```

### 5. Thêm Tính Năng Tô Màu Gradient

#### Sử dụng `createLinearGradient()`:
```javascript
function fillWithGradient(x, y, color1, color2) {
    const gradient = ctx.createLinearGradient(x, y, x + 100, y + 100);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    // Áp dụng gradient vào flood fill
}
```

### 6. Thêm Tính Năng Zoom In/Out

#### Thêm controls:
```javascript
let zoomLevel = 1;

function zoomIn() {
    zoomLevel *= 1.2;
    canvas.style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
    zoomLevel /= 1.2;
    canvas.style.transform = `scale(${zoomLevel})`;
}
```

### 7. Thêm Tính Năng Lưu Tiến Độ

#### Sử dụng LocalStorage:
```javascript
function saveProgress() {
    const imageData = canvas.toDataURL('image/png');
    localStorage.setItem('coloring-progress', imageData);
}

function loadProgress() {
    const saved = localStorage.getItem('coloring-progress');
    if (saved) {
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        };
        img.src = saved;
    }
}
```

---

## 🐛 Debugging Tips

### 1. Kiểm Tra Console
```javascript
console.log('Debug info:', variable);
```

### 2. Kiểm Tra Canvas Size
```javascript
console.log('Canvas size:', canvas.width, canvas.height);
```

### 3. Kiểm Tra ImageData
```javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
console.log('ImageData length:', imageData.data.length);
console.log('First pixel:', imageData.data[0], imageData.data[1], imageData.data[2], imageData.data[3]);
```

### 4. Kiểm Tra Event Listeners
```javascript
canvas.addEventListener('click', function(e) {
    console.log('Click at:', e.clientX, e.clientY);
    console.log('Canvas position:', canvas.getBoundingClientRect());
});
```

---

## 📚 Tài Liệu Tham Khảo

### MDN Web Docs
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
- [Flood Fill Algorithm](https://en.wikipedia.org/wiki/Flood_fill)

### Tutorials
- [HTML5 Canvas Tutorial](https://www.w3schools.com/html/html5_canvas.asp)
- [JavaScript Canvas](https://javascript.info/canvas)

---

## ❓ Câu Hỏi Thường Gặp (FAQ)

### Q: Tại sao cần web server?
**A:** Vì CORS (Cross-Origin Resource Sharing) policy của trình duyệt. Khi mở file HTML trực tiếp (`file://`), trình duyệt chặn việc load ảnh và các resource khác.

### Q: Tại sao flood fill không hoạt động?
**A:** Kiểm tra:
1. Ảnh có phải màu trắng/đen không?
2. Tolerance có phù hợp không?
3. Có lỗi trong console không?

### Q: Làm sao tối ưu hiệu suất?
**A:** 
1. Giảm kích thước canvas
2. Tối ưu thuật toán flood fill (sử dụng Set thay vì Array)
3. Sử dụng `requestAnimationFrame()` cho animations

### Q: Có thể thêm ảnh từ URL không?
**A:** Có, nhưng cần xử lý CORS:
```javascript
img.crossOrigin = "anonymous";
img.src = "https://example.com/image.png";
```

---

## 📝 Changelog

### Version 1.0.0
- ✅ Hiển thị hình ảnh trên canvas
- ✅ Chọn màu từ color picker và preset colors
- ✅ Tô màu bằng flood fill algorithm
- ✅ Reset hình ảnh
- ✅ Tải xuống hình ảnh
- ✅ Chọn ảnh từ danh sách
- ✅ Thumbnail preview

---

## 👨‍💻 Tác Giả

Dự án được phát triển bởi [Tên của bạn]

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa

---

**Chúc bạn code vui vẻ! 🎨✨**
