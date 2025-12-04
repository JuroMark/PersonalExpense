# 💰 Personal Expense Manager (PEM)

Ứng dụng quản lý tài chính cá nhân trên nền tảng web (ReactJS), tập trung vào trải nghiệm người dùng (UX) và khả năng trực quan hóa dữ liệu (Data Visualization) để giúp người dùng hiểu rõ thói quen chi tiêu của mình.

## ✨ Tính năng chính

### 📝 Quản lý Giao dịch (Transaction Management)

- ➕ **Thêm giao dịch**: Chọn danh mục bằng icon trực quan, nhập số tiền, ngày và mô tả
- ✏️ **Sửa/Xóa giao dịch**: Chỉnh sửa hoặc xóa các giao dịch đã lưu
- 🏷️ **Phân loại theo danh mục**: Hệ thống danh mục có sẵn với icon và màu sắc (Ăn uống, Di chuyển, Lương, Thưởng...)
- 🔍 **Lọc và tìm kiếm**: Tìm kiếm theo nội dung, lọc theo loại (thu/chi)

### 📊 Dashboard & Phân tích (Analytics Core)

#### Tổng quan (Overview Cards)

- 💵 Số dư hiện tại
- 📈 Tổng thu nhập trong tháng
- 📉 Tổng chi tiêu trong tháng

#### Biểu đồ đa dạng (Chart Specifications)

| Loại Chart                  | Tên Biểu Đồ          | Mục đích phân tích                                                  |
| --------------------------- | -------------------- | ------------------------------------------------------------------- |
| 🥧 **Pie Chart**            | Cơ cấu chi tiêu      | Xem tỉ trọng chi tiêu theo danh mục (VD: 50% Ăn uống, 20% Nhà ở)    |
| 📊 **Stacked Bar Chart**    | Thu/Chi theo ngày    | So sánh thu nhập và chi tiêu song song từng ngày (30 ngày gần nhất) |
| 📈 **Line Chart**           | Xu hướng dòng tiền   | Xem sự biến động tài sản tích lũy theo thời gian                    |
| 📊 **Horizontal Bar Chart** | Top danh mục tốn kém | Xếp hạng 5 khoản mục tiêu tốn nhất                                  |

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: React Bootstrap + Bootstrap Icons
- **Routing**: React Router DOM v6
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Mock API**: JSON Server

5. Mở trình duyệt tại `http://localhost:5174`

## 📁 Cấu trúc thư mục

```
PersonalExpense/
├── src/
│   ├── components/              # Các component UI
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── CategorySelector.jsx # Chọn category bằng icon
│   │   ├── TransactionForm.jsx # Form thêm/sửa giao dịch
│   │   ├── TransactionTable.jsx # Bảng hiển thị giao dịch
│   │   ├── SummaryCards.jsx    # Card tổng hợp thu/chi
│   │   ├── FilterBar.jsx       # Bộ lọc tìm kiếm
│   │   └── charts/             # Thư mục chứa các biểu đồ
│   │       ├── SpendingStructureChart.jsx    # Pie chart cơ cấu chi tiêu
│   │       ├── DailyIncomeExpenseChart.jsx   # Stacked bar thu/chi theo ngày
│   │       ├── CashFlowTrendChart.jsx        # Line chart xu hướng
│   │       └── TopExpenseCategoriesChart.jsx # Horizontal bar top danh mục
│   ├── pages/                  # Các trang chính
│   │   ├── HomePage.jsx        # Trang chủ với dashboard
│   │   ├── AddTransactionPage.jsx # Trang thêm giao dịch
│   │   ├── EditTransactionPage.jsx # Trang sửa giao dịch
│   │   └── ChartPage.jsx       # Trang xem chi tiết biểu đồ
│   ├── services/               # API services
│   │   ├── transactionService.js # API giao dịch
│   │   ├── categoryService.js    # API danh mục
│   │   └── budgetService.js      # API ngân sách
│   ├── utils/                  # Utility functions
│   │   └── currencyValidate.jsx # Format tiền tệ VND
│   ├── App.jsx                 # Root component với routing
│   └── main.jsx                # Entry point
├── db.json                     # Mock database
└── package.json
```

## 🚦 Routing

| Route     | Mô tả                                                   |
| --------- | ------------------------------------------------------- |
| `/`       | **Trang chủ** - Dashboard với biểu đồ và bảng giao dịch |
| `/add`    | **Thêm giao dịch** - Form thêm giao dịch mới            |
| `/edit`   | **Sửa giao dịch** - Form chỉnh sửa giao dịch            |
| `/charts` | **Biểu đồ chi tiết** - Xem tất cả biểu đồ phân tích     |

## 🔌 API Endpoints

JSON Server chạy tại `http://localhost:3001`

### Transactions

- `GET /transactions` - Lấy danh sách giao dịch
- `GET /transactions?_sort=date&_order=desc` - Lấy giao dịch sắp xếp theo ngày
- `POST /transactions` - Thêm giao dịch mới
- `PUT /transactions/:id` - Cập nhật giao dịch
- `DELETE /transactions/:id` - Xóa giao dịch

### Categories

- `GET /categories` - Lấy danh sách danh mục
- `GET /categories/:id` - Lấy thông tin danh mục theo ID

### Budgets

- `GET /budgets` - Lấy danh sách ngân sách
- `GET /budgets?categoryId=:id` - Lấy ngân sách theo danh mục

## 📊 Cấu trúc dữ liệu

### Transaction (Giao dịch)

```json
{
  "id": "1764829266067",
  "description": "Ăn sáng tại quán cô Tám",
  "amount": 35000,
  "type": "expense",
  "date": "2023-10-27",
  "categoryId": "cat_2"
}
```

### Category (Danh mục)

```json
{
  "id": "cat_2",
  "name": "Ăn uống",
  "type": "expense",
  "icon": "🍜",
  "color": "#FF5722"
}
```

### Budget (Ngân sách)

```json
{
  "id": "bg_1",
  "categoryId": "cat_2",
  "month": "10-2023",
  "limit": 4000000
}
```

## 🎯 Hướng dẫn sử dụng

### 1. Thêm giao dịch mới

1. Click nút **"Thêm mới"** trên navbar
2. Chọn loại giao dịch (Thu nhập/Chi tiêu)
3. **Chọn danh mục** bằng cách click vào icon card
4. Nhập ngày, mô tả chi tiết và số tiền
5. Click **"Thêm mới"** - Tự động quay về trang chủ

### 2. Sửa giao dịch

1. Click icon ✏️ **Edit** trên bảng giao dịch
2. Hệ thống tự động điền dữ liệu cũ vào form
3. Chỉnh sửa thông tin cần thiết
4. Click **"Lưu thay đổi"** hoặc **"Hủy bỏ"**

### 3. Xóa giao dịch

1. Click icon 🗑️ **Delete** trên bảng giao dịch
2. Xác nhận trong hộp thoại
3. Giao dịch được xóa ngay lập tức

### 4. Lọc và tìm kiếm

- **Tìm kiếm**: Nhập từ khóa vào ô tìm kiếm (tìm trong mô tả)
- **Lọc theo loại**: Chọn "Tất cả", "Thu nhập" hoặc "Chi tiêu"
- Biểu đồ và bảng tự động cập nhật theo bộ lọc

### 5. Xem biểu đồ phân tích

- **Trang chủ**: Hiển thị 2 biểu đồ chính (Cơ cấu chi tiêu + Thu/chi theo ngày)
- **Trang Biểu đồ**: Click nút "Biểu đồ" để xem tất cả 4 biểu đồ phân tích

## 🎨 Đặc điểm nổi bật

### UX Flow (Trải nghiệm người dùng)

- ⚡ **Form nhập liệu nhanh**: Chọn category bằng icon thay vì gõ text
- 🎯 **Dashboard trực quan**: Hiển thị ngay các biểu đồ tóm tắt
- 📱 **Responsive design**: Hoạt động tốt trên mọi thiết bị
- 🎨 **Màu sắc nhất quán**: Mỗi category có màu riêng trên tất cả biểu đồ

### Data Visualization

- 📊 Chuẩn hóa dữ liệu với categories
- 🎨 Icon và màu sắc cho mỗi danh mục
- 📈 Tính toán tích lũy dòng tiền theo thời gian
- 🏆 Xếp hạng top danh mục chi tiêu

## 📄 License

MIT License

## 👨‍💻 Author

**NguyenTranAn**  
Personal Expense Manager 
GitHub: [@JuroMark](https://github.com/JuroMark)
