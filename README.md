package.json là file chứa thông tin của toàn dự án
package-lock.json là file chứa tên,ver của các module sử dụng trong project
thư mục node_modules chứa toàn bộ module của dự án. Khi gửi delete đi cho nhẹ.
Sau khi có dự án chỉ cần npm i --save sẽ tự động tải các module về máy
tương tự khi tải 1 module chỉ cần npm i module_name --save để cài

________________________________________________________
file index là file chịu trách nhiệm khởi tạo, kết nối server, khởi tạo mongodb,...
thư mục routers là thư mục nhận các RESTful từ index gửi đến, sau đó phân chia cho thư mục khác
Thư mục controllers nhận lệnh từ thư mục views, chia tiếp cho thư mục khác như sockets và services, hoặc định dạng lại dữ liệu trước khi gửi về client
Thư mục services là thư mục chứa các hàm thực thi lệnh chính nhận được từ controllers(sử dụng các module)
Thư mục handles là thư mục chứa các hàm thực thi bằng tay
________________________________________________________
Models chứa định dạng obj của db sẽ tạo ra ???
Mongo kết nối, khởi tạo db ở mongodb ???
Sockets khởi tạo sockets để giao tiếp bằng RESTful API ???
________________________________________________________
requier từ views,mongo
________________________________________________________
các module sử dụng
mongoose,express,body-parser,http,socket.io,
________________________________________________________
khi nhận được 1 req từ client thì giải mã ở index,sau đó gửi đến routers
routers sẽ tùy vào router được nhận mà gọi đến controllers
controller gửi đến services để nó xử lý ở đó
thằng cotrollers cần requier ở socketssockets để gửi, nhận dữ liệu
đồng thời services phải lấy dữ liệu ở bên model nữa(có thể models là cái nơi định dạng kiểu của dữ liệu)
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
- folder socket chứa các xử lý của socket, socket sẽ được gọi ra khởi tạo ở index được lưu giữ ở đây ta có thể gọi socket ra sử dụng bất cứ đâu trong project
- folder router là nơi điều phối các api , các router sẽ gọi các controller
- folder controller chứa các xử lý của server, các controller sẽ gọi service
- folder service xử lý thao tác với data base
