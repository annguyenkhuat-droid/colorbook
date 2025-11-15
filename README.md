# 🎨 Ứng Dụng Web Tô Màu

Ứng dụng web tô màu cho phép người dùng chọn hình ảnh và tô màu các vùng trắng bằng cách click chuột.

## 🚀 Cách Chạy Nhanh

### 1. Khởi động Web Server

#### Sử dụng Python:
```bash
python3 -m http.server 8000
```

#### Sử dụng Node.js:
```bash
npx http-server -p 8000
```

### 2. Mở trình duyệt
```
http://localhost:8000
```

## 📋 Tính Năng

- ✅ Chọn hình ảnh từ danh sách
- ✅ Chọn màu từ bảng màu hoặc color picker
- ✅ Click vào vùng trắng để tô màu (Flood Fill Algorithm)
- ✅ Reset hình ảnh về trạng thái ban đầu
- ✅ Tải xuống hình ảnh đã tô màu
- ✅ Giao diện đẹp, responsive

## 🛠️ Công Nghệ

- **HTML5** - Cấu trúc trang web
- **CSS3** - Styling và layout
- **JavaScript (ES6+)** - Logic xử lý
- **Canvas API** - Xử lý hình ảnh
- **Flood Fill Algorithm** - Thuật toán tô màu

## 📁 Cấu Trúc Dự Án

```
colorbook/
├── index.html          # File HTML chính
├── style.css           # File CSS styling
├── script.js           # File JavaScript logic
├── image.png           # Hình ảnh 1
├── image copy.png      # Hình ảnh 2
├── image copy 2.png    # Hình ảnh 3
├── README.md           # File này
└── DOCS.md            # Tài liệu chi tiết
```

## 📖 Tài Liệu

Xem file [DOCS.md](./DOCS.md) để biết:
- Công cụ cần có
- Kiến thức cần biết
- Giải thích code chi tiết
- Thuật toán Flood Fill
- Hướng dẫn thêm tính năng
- Debugging tips

## 🎯 Cách Sử Dụng

1. **Chọn hình ảnh**: Click vào thumbnail trong danh sách
2. **Chọn màu**: Chọn từ bảng màu preset hoặc color picker
3. **Tô màu**: Click vào các vùng trắng trong hình
4. **Reset**: Nhấn nút "Làm mới" để reset về trạng thái ban đầu
5. **Tải xuống**: Nhấn nút "Tải xuống" để lưu hình ảnh

## 🔧 Thêm Ảnh Mới

1. Thêm file ảnh vào thư mục `colorbook/`
2. Mở file `script.js`
3. Thêm vào mảng `images`:

```javascript
const images = [
    { src: 'image.png', name: 'Hình 1' },
    { src: 'image copy.png', name: 'Hình 2' },
    { src: 'image copy 2.png', name: 'Hình 3' },
    { src: 'new-image.png', name: 'Hình 4' }  // Thêm dòng này
];
```

## 📚 Kiến Thức Cần Có

- HTML5 cơ bản
- CSS3 (Flexbox)
- JavaScript (ES6+)
- Canvas API
- DOM Manipulation
- Event Handling

## 🐛 Troubleshooting

### Lỗi: Không thể tải ảnh
**Giải pháp**: Đảm bảo bạn đang chạy ứng dụng qua web server, không mở trực tiếp file HTML.

### Lỗi: Flood fill không hoạt động
**Giải pháp**: 
- Kiểm tra ảnh có phải màu trắng/đen không
- Kiểm tra console để xem lỗi
- Thử điều chỉnh tolerance trong hàm `isWhiteOrNearWhite()`

## 📝 License

MIT License - Tự do sử dụng và chỉnh sửa

## 👨‍💻 Tác Giả

Dự án được phát triển để học tập và thực hành.

---

**Chúc bạn code vui vẻ! 🎨✨**
