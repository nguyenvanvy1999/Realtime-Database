A project realtime database, usign NodeJS,Express,MongoDB,SocketIO
_________________________________________________________
- package.json là file chứa thông tin của toàn dự án
- package-lock.json là file chứa tên,ver của các module sử dụng trong project
- file index là file chịu trách nhiệm khởi tạo, kết nối server, khởi tạo mongodb,kết nối socketIO
- Routers nhận các API từ index gửi đến, sau đó gọi hàm xử lý ở controllers,đồng thời đây là nơi auth,handlerError(xác thực API,bắt lỗi)
- Controllers là nơi xử lý chính,định dạng dữ liệu trước khi trả về
- Services là nơi tương tác với database
- Handles là thư mục chứa các hàm thực thi bằng tay
- Middleware là nơi chứa các hàm auth,handlerError
- Models chứa Schema của data
- Sockets khởi tạo sockets để giao tiếp realtime bằng socketIO
________________________________________________________
some module used:
- mongoose: Thao tác với MongoDB
- express: web application framework cho NodeJS
- body-parser: Làm việc với data-form
- socket.io:Giúp kết nối realtime giữa các bên ở những địa điểm khác nhau nhờ server trung gian
- bcrypt:Hash mật khẩu trước khi lưu
- multer: xử lý dữ liệu multipart/form-data khi người dùng upload file
- morgan: middleware dùng để request logger
- jsonwebtoken: Tạo và xác thực JWT khi user đăng nhập
- nodemailer: Gửi email
_________________________________________________________
- install: clone repo and open folder in terminal and :npm -i