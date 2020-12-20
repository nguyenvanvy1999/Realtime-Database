package.json là file chứa thông tin của toàn dự án
package-lock.json là file chứa tên,ver của các module sử dụng trong project
thư mục node_modules chứa toàn bộ module của dự án. Khi gửi delete đi cho nhẹ.
Sau khi có dự án chỉ cần npm i --save sẽ tự động tải các module về máy
tương tự khi tải 1 module chỉ cần npm i module_name --save để cài
________________________________________________________
file index là file chịu trách nhiệm khởi tạo, kết nối server, khởi tạo mongodb,kết nối socketIO
Routers nhận các API từ index gửi đến, sau đó gọi hàm xử lý ở controllers,đồng thời đây là nơi auth,handlerError(xác thực API,bắt lỗi)
Controllers là nơi xử lý chính,định dạng dữ liệu trước khi trả về
Services là nơi tương tác với database
Handles là thư mục chứa các hàm thực thi bằng tay
Middleware là nơi chứa các hàm auth,handlerError
Models chứa Schema của data
Sockets khởi tạo sockets để giao tiếp realtime bằng socketIO
________________________________________________________
các module sử dụng
mongoose,express,body-parser,http,socket.io,bcrypt,...
_________________________________________________________
GET (SELECT): Trả về một Resource hoặc một danh sách Resource.
POST (CREATE): Tạo mới một Resource.
PUT (UPDATE): Cập nhật thông tin cho Resource.
DELETE (DELETE): Xoá một Resource.
_________________________________________________________
200 OK – Trả về thành công cho những phương thức GET, PUT, PATCH hoặc DELETE.
201 Created – Trả về khi một Resouce vừa được tạo thành công.
204 No Content – Trả về khi Resource xoá thành công.
304 Not Modified – Client có thể sử dụng dữ liệu cache.
400 Bad Request – Request không hợp lệ
401 Unauthorized – Request cần có auth.
403 Forbidden – bị từ chối không cho phép.
404 Not Found – Không tìm thấy resource từ URI
405 Method Not Allowed – Phương thức không cho phép với user hiện tại.
410 Gone – Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.
415 Unsupported Media Type – Không hỗ trợ kiểu Resource này.
422 Unprocessable Entity – Dữ liệu không được xác thực
429 Too Many Requests – Request bị từ chối do bị giới hạn
_________________________________________________________