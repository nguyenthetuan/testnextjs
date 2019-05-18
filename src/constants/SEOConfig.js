import React, { Component } from 'react';
import language from '../config/language/index';

export default class Setting extends Component {
  static creatSEO = () => {
    let str = {
      categories: [
        {
          id: '5ba9de3f74a4d74b92bc4533',
          url: 'viec-lam-tu-van',
          heading: 'Việc làm tư vấn/Chăm sóc khách hàng/Telesale',
          title: '1000+ Việc làm tư vấn chăm sóc khách hàng mới nhất | JOBNOW',
          description: 'Hơn 1000+ việc làm tư vấn, chăm sóc khách hàng, Telesale môi trường và phúc lợi hấp dẫn liên tục tuyển dụng tham gia ứng tuyển ngay'
        },
        {
          id: '5ba9de3374a4d74b92bc4532',
          url: 'viec-lam-bat-dong-san',
          heading: 'Việc làm Bất động sản',
          title: '1000+ Việc làm tư vấn chăm sóc khách hàng mới nhất | JOBNOW',
          description: 'Hơn 1000+ việc làm tư vấn, chăm sóc khách hàng, Telesale môi trường và phúc lợi hấp dẫn liên tục tuyển dụng tham gia ứng tuyển ngay'
        },
        {
          id: '5ba9de6974a4d74b92bc4537',
          url: 'viec-lam-xay-dung',
          heading: 'Thông tin tuyển dụng tìm việc làm ngành xây dựng lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm xây dựng lương cao 1.389 việc làm tại JOBNOW ',
          description: 'Tổng hợp tất cả các tin tuyển dụng việc làm xây dựng hàng đầu, lương cao, môi trường tốt đang chờ bạn. Tìm hiểu ngay tại JOBNOW. '
        },
        {
          id: '5bac4878f878a6220b1a7833',
          url: 'viec-lam-y-te-duoc-sy',
          heading: 'Thông tin tuyển dụng tìm việc làm Y tế/Dược sỹ lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Y Tế/ Dược Sỹ mới nhất | JOBNOW',
          description: 'Tuyển dụng tìm nhanh việc làm Y tế/Dược sỹ lương cao, phúc lợi hấp dẫn mới nhất 2018. Nhận việc ngay tại JOBNOW  '
        },
        {
          id: '5bac48e0f878a6220b1a783d',
          url: 'viec-lam-xuat-nhap-khau',
          heading: 'Thông tin tuyển dụng tìm việc làm Xuất nhập khẩu/ Ngoại thương lương cao uy tín',
          title: 'Tuyển dụng tìm việc làm Xuất nhập khẩu lương cao mới nhất | JOBNOW',
          description: 'Tuyển dụng tìm nhân viên  Xuất nhập khẩu/Ngoại thương, lương thưởng hấp dẫn. 1.238 việc làm đang chờ bạn tại JOBNOW '
        },
        {
          id: '5bac489cf878a6220b1a7837',
          url: 'viec-lam-kien-truc-thiet-ke',
          heading: 'Thông tin tuyển dụng tìm việc làm Kiến trúc / Thiết kế nội thất lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm nhanh Kiến trúc/ Thiết kế nội thất |JOBNOW',
          description: 'Xem ngay 2.356 việc làm Kiến trúc - Thiết kế nội thất. Từ những công ty thiết kế nội thất uy tín tại JOBNOW '
        },
        {
          id: '5bac48c5f878a6220b1a783c',
          url: 'viec-lam-khach-san-nha-hang',
          heading: 'Thông tin tuyển dụng tìm việc làm Nhà hàng / Khách sạn lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Nhà hàng - Khách sạn Lương cao | JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Nhà hàng Khách sạn gần nhà lương cao. Xem ngay 1.254 công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac60786b8e2325772953ba',
          url: 'viec-lam-thuong-mai-dien-tu',
          heading: 'Thông tin tuyển dụng tìm việc làm Thương mại điện tử lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm nhanh Thương mại điện tử | JOBNOW.COM.VN ',
          description: 'Tìm việc làm Tuyển dụng việc làm Thương mại điện tử gần nhà lương cao môi trường tốt . Xem ngay 1.254 công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac60566b8e2325772953b7',
          url: 'viec-lam-quan-tri-kinh-doanh',
          heading: 'Thông tin tuyển dụng tìm việc làm Quản trị kinh doanh lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm nhanh Quản trị kinh doanh - 2018 |JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Quản trị kinh doanh Gần nhà lương cao môi trường tốt . Xem ngay 2.254 công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac60906b8e2325772953bc',
          url: 'viec-lam-tiep-thi-quang-cao',
          heading: 'Thông tin tuyển dụng tìm việc làm Tiếp thị/Quảng cáo lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm nhanh Tiếp thị quảng cáo - 2018 | JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Tiếp thị quảng cáo Gần nhà lương cao môi trường tốt . Xem ngay 1.123 công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac60d66b8e2325772953c2',
          url: 'viec-lam-dich-vu-an-uong',
          heading: 'Thông tin tuyển dụng tìm việc làm Thực phẩm/Dịch vụ ăn uống lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm nhanh Dịch vụ ăn uống 2018 |JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Thực phẩm / Dịch vụ ăn uống  Gần nhà lương cao môi trường tốt . Xem ngay 300+ công việc mới nhất đang chờ ứng tuyển  '
        },
        {
          id: '5bac60ef6b8e2325772953c4',
          url: 'viec-lam-thoi-trang',
          heading: 'Thông tin tuyển dụng tìm việc làm Thời trang lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm nhân viên thiết kế thời trang 2018 | JOBNOW',
          description: 'Bạn đang cần tìm việc thiết kế thời trang? Cần tìm việc làm về thời trang lương cao môi trường và phúc lợi tốt. Xem ngay 500+ việc làm tốt nhất tại JOBNOW'
        },
        {
          id: '5bac61116b8e2325772953c7',
          url: 'viec-lam-quan-ly-cong-nghiep',
          heading: 'Thông tin tuyển dụng tìm việc làm Công nghiệp lương cao, uy tín',
          title: 'Tuyển dụng Tìm việc làm nghành quản lý công nghiệp 2018 | JOBNOW',
          description: 'Xem ngay 300+ Việc làm quản lý công nghiệp, đang cần tuyển dụng ngay lương thưởng hấp dẫn mới nhất 2018. Đăng ký đi làm ngay tại JOBNOW'
        },
        {
          id: '5bac60e86b8e2325772953c3',
          url: 'viec-lam-dau-tu-tai-chinh',
          heading: 'Thông tin tuyển dụng tìm việc làm Đầu tư lương cao, uy tín',
          title: 'Việc làm tài chính , Tuyển dụng nhân viên tài chính, lương cao | JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Đầu tư/ Tài chính  Gần nhà lương cao môi trường tốt . Xem ngay 600+ công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac614b6b8e2325772953ce',
          url: 'viec-lam-cong-nghe-cao',
          heading: 'Thông tin tuyển dụng tìm việc làm Công nghệ cao lương cao, uy tín',
          title: 'Tuyển dụng nhanh tìm việc làm công nghệ cao mới nhất 2018 | JOBNOW',
          description: 'Nhiều vị trí tìm việc hấp dẫn có tại JOBNOW – web tìm việc “nhanh như chớp”. Xem ngay 1000+ việc làm công nghệ cao mới nhất.'
        },
        {
          id: '5bac612d6b8e2325772953ca',
          url: 'viec-lam-chung-khoan',
          heading: 'Thông tin tuyển dụng tìm việc làm Chứng khoán/Vàng lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Chứng khoán/Vàng  lương (trên 10tr) | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Chứng khoán/ Vàng  lương trên 10 tr mới nhất trên toàn quốc môi trường tốt phúc lợi hấp dẫn. Ứng tuyển ngay tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-hoach-dinh-du-an',
          heading: 'Thông tin tuyển dụng tìm việc làm Hoạch định - Dự án lương cao, uy tín',
          title: 'Tuyển dụng nhanh tìm việc làm Hoạch định/Dự án 11/2018 | JOBNOW',
          description: 'Có 100+ tin tuyển dụng việc làm Hoạch định/Dự án (Cần tuyển gấp) lương cao Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW việc làm uy tín '
        },
        {
          id: '',
          url: 'viec-lam-giao-hang-chuyen-phat-nhanh',
          heading: 'Thông tin tuyển dụng tìm việc làm Logistic / Chuyển Phát Nhanh lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm giao hàng chuyển phát nhanh 2018 | JOBNOW',
          description: 'Có 500+ Công ty vận chuyển tuyển dụng việc làm giao hàng chuyển phát nhanh lương cao (cần tuyển gấp). Mới nhất tại JOBNOW việc làm uy tín '
        },
        {
          id: '',
          url: 'viec-lam-san-xuat',
          heading: 'Thông tin tuyển dụng tìm việc làm Sản Xuất lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Quản lý sản xuất mới nhất 2018 | JOBNOW',
          description: 'Có 800+ tin tuyển dụng việc làm quản lý sản xuất  (Cần tuyển gấp) lương cao Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW việc làm uy tín '
        },
        {
          id: '',
          url: 'viec-lam-spa-lam-dep',
          heading: 'Thông tin tuyển dụng tìm việc làm Spa/Làm đẹp/Thể lực lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Spa/Làm đẹp mới nhất 2018 | JOBNOW',
          description: 'Có 300+ tin tuyển dụng việc làm nhân viên spa làm đẹp(Cần tuyển gấp) lương cao. Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW việc làm uy tín '
        },
        {
          id: '',
          url: 'viec-lam-nghe-thuat-dien-anh',
          heading: 'Thông tin tuyển dụng tìm việc làm Nghệ Thuật/Điện Ảnh lương cao, uy tín',
          title: 'Tuyển dụng nhanh tìm việc làm Nghệ thuật/Điện ảnh 2018 | JOBNOW',
          description: 'Xem ngay 300+ tin tuyển dụng việc làm ngành giải trí, nghệ thuật (Cần tuyển gấp) lương cao. Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '',
          url: 'viec-lam-qa-qc-tham-dinh-giam-sat',
          heading: 'Thông tin tuyển dụng tìm việc làm QA/QC/Thẩm định/Giám sát lương cao, uy tín',
          title: 'Tuyển dụng nhanh tìm việc làm QA/QC/Thẩm định/Giám sát | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm thẩm định tín dụng lương (8-10 tr) mới nhất trên toàn quốc môi trường tốt phúc lợi hấp dẫn. Ứng tuyển ngay tại JOBNOW'
        },
        {
          id: '5ba9de4d74a4d74b92bc4534',
          url: 'viec-lam-ke-toan-kiem-toan',
          heading: 'Thông tin tuyển dụng tìm việc làm Kế toán/Kiểm toán lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Kế toán/Kiểm toán lương (8- 10tr) | JOBNOW',
          description: 'Có 800+ tin tuyển dụng việc làm Kế toán/Kiểm toán (Cần tuyển gấp) lương cao Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW việc tốt nhất'
        },
        {
          id: '5ba9de8b74a4d74b92bc4538',
          url: 'viec-lam-dien-dien-tu-dien-lanh',
          heading: 'Thông tin tuyển dụng tìm việc làm Điện/Điện tử/Điện lạnh lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Điện/Điện Tử/Điện Lạnh lương cao | JOBNOW',
          description: 'Có 450+ việc làm điện tử điện lạnh  (Cần tuyển gấp) lương cao Từ các công ty tuyển dụng ngành điện hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '5bac483cf878a6220b1a7830',
          url: 'viec-lam-it-phan-mem',
          heading: 'Thông tin tuyển dụng tìm việc làm IT Phần mềm lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm IT/Phần Mềm lương up to $1000+ | JOBNOW',
          description: 'Xem ngay 1000+ tin tuyển dụng việc làm IT/ Phần mềm đang (Cần tuyển gấp) lương cao. Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '5bac488cf878a6220b1a7836',
          url: 'viec-lam-ngan-hang-tai-chinh',
          heading: 'Thông tin tuyển dụng tìm việc làm Ngân hàng/Tài chính lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Ngân Hàng/Tài Chính mới nhất 2018 | JOBNOW',
          description: 'Tìm việc làm Tài chính Ngân hàng , tuyển dụng nhân viên Tài chính Ngân hàng nhanh chóng trong vòng 5 phút. Tiếp cận ngay 1000+  tại JOBNOW '
        },
        {
          id: '5bac48b6f878a6220b1a783b',
          url: 'viec-lam-bien-dich-phien-dich',
          heading: 'Thông tin tuyển dụng tìm việc làm Biên dịch/Phiên dịch lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Biên Dịch/Phiên Dịch mới nhất 2018 | JOBNOW',
          description: 'Tìm việc làm tuyển dụng Biên dịch/Phiên dịch nhận kết quả ứng tuyển sau 5 phút. Tiếp cận ngay với 15000+ công việc mới nhất  tại JOBNOW'
        },
        {
          id: '5bac4886f878a6220b1a7834',
          url: 'viec-lam-hanh-chinh-nhan-su',
          heading: 'Thông tin tuyển dụng tìm việc làm Nhân sự lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Hành chính/Nhân sự lương trên 10 tr | JOBNOW',
          description: 'Tìm việc làm hành chính nhân sự, tuyển dụng chuyên viên nhân sự ứng tuyển nhận kết quả sau 5 phút. Trải nghiệm ngay tại JOBNOW'
        },
        {
          id: '5bac4a18f878a6220b1a7856',
          url: 'viec-lam-thiet-ke-mi-thuat',
          heading: 'Thông tin tuyển dụng tìm việc làm Thiết kế/Mỹ thuật lương cao, uy tín',
          title: 'Tuyển dụng tìm việc làm Thiết kế/Mỹ thuật mới nhất 2018 | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Thiết kế/Mỹ Thuật lương cao môi trường tốt phúc lợi hấp dẫn. Ứng tuyển tiếp cận 15000+ việc làm mới tại JOBNOW'
        },
        {
          id: '5bac49fdf878a6220b1a7855',
          url: 'giao-nhan-van-chuyen-kho-bai',
          heading: 'Thông tin tuyển dụng tìm việc làm Giao nhận/Vận chuyển kho bãi lương cao, uy tín',
          title: 'Tìm việc làm Giao Nhận Hàng Hóa Kho Bãi lương cao 2018 | JOBNOW',
          description: 'Tổng hợp việc làm Vận chuyển / Giao nhận hàng hóa/ Kho bãi mới nhất 2018. Từ các công ty vận chuyển hàng đầu việt nam. Nhận việc làm ngay tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-dich-vu-khach-hang',
          heading: 'Thông tin tuyển dụng tìm việc làm Dịch vụ lương cao, uy tín',
          title: 'Tuyển dụng Tìm việc làm Dịch vụ khách hàng lương cao 2018 | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Dịch vụ khách hàng lương cao môi trường tốt phúc lợi hấp dẫn. Ứng tuyển tiếp cận 15000+ việc làm mới tại JOBNOW'
        },
        {
          id: '5bac4ad2f878a6220b1a785d',
          url: 'viec-lam-det-may-da-day',
          heading: 'Thông tin tuyển dụng tìm việc làm Dệt may/Da dày lương cao, uy tín',
          title: 'Tuyển dụng Tìm việc làm Dệt may/Da dày lương cao 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Dệt may/ Da dày/ Thời trang may mặc. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển ngay tại JOBNOW '
        },
        {
          id: '5bac60ad6b8e2325772953bf',
          url: 'viec-lam-ky-thuat-ung-dung',
          heading: 'Thông tin tuyển dụng tìm việc làm kỹ thuật ứng dụng lương cao, uy tín',
          title: 'Tuyển dụng nhanh Tìm việc làm kỹ thuật ứng dụng 11/2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm kỹ thuật ứng dụng/ cơ khí . Gần nhà ngay tại khu vực sinh sống . Ứng tuyển đi làm ngay tại JOBNOW '
        },
        {
          id: '',
          url: 'viec-lam-van-tai-tai-xe-lai-xe',
          heading: 'Thông tin tuyển dụng tìm việc làm vận tải lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Vận Tải - Lái xe/Tài xế | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Vận tải - Lái xe/ Tài xế . Gần nhà ngay tại khu vực sinh sống . Ứng tuyển tiếp cận 15.000+ việc làm tại JOBNOW '
        },
        {
          id: '5bac60a26b8e2325772953be',
          url: 'viec-lam-bao-chi-truyen-hinh',
          heading: 'Thông tin tuyển dụng tìm việc làm Báo Chí Truyền Hình lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Báo chí/ Truyền hình | JOBNOW',
          description: 'Việc làm báo chí truyền hình, tuyển dụng biên tập viên truyền hình lương thưởng hấp dẫn. Ứng tuyển ngay để tiếp cận với công ty truyền thông hàng đầu'
        },
        {
          id: '5bac61286b8e2325772953c9',
          url: 'viec-lam-quan-he-doi-ngoai',
          heading: 'Thông tin tuyển dụng tìm việc làm Quan Hệ Đối Ngoại lương cao, uy tín',
          title: 'Tuyển dụng nhanh  việc làm Chuyên viên quan hệ đối ngoại | JOBNOW',
          description: 'Tuyển nhân viên phòng đối ngoại, Tìm việc làm ngành quan hệ quốc tế mức lương cao môi trường tốt. Xem ngay 15.000+ việc làm tốt nhất tại JOBNOW'
        },
        {
          id: '5bac60f56b8e2325772953c5',
          url: 'viec-lam-in-an-xuat-ban',
          heading: 'Thông tin tuyển dụng tìm việc làm In ấn/Xuất bản lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm In Ấn/Xuất Bản | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm In Ấn/Xuất Bản . Gần nhà ngay tại khu vực sinh sống . Ứng tuyển đi làm ngay 300+ việc làm tại JOBNOW '
        },
        {
          id: '5bac61356b8e2325772953cb',
          url: 'viec-lam-hang-khong',
          heading: 'Thông tin tuyển dụng tìm việc làm Hàng Không lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Hàng Không 11/2018 | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Hàng Không/Du lịch nhân viên mặt đất lương cao môi trường tốt phúc lợi hấp dẫn. 300+ công việc tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tong-hop',
          heading: 'Thông tin tuyển dụng tìm việc làm Ngành nghề khác lương cao, uy tín',
          title: 'Tuyển dụng nhanh tất cả việc làm lương cao mới nhất 2018 | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm. Các ngành nghề mới nhất lương cao môi trường tốt phúc lợi hấp dẫn. 1000+ công việc mới tại JOBNOW'
        },
        {
          id: '5bac61466b8e2325772953cd',
          url: 'viec-lam-buu-chinh-vien-thong',
          heading: 'Thông tin tuyển dụng tìm việc làm Bưu Chính Viễn Thông lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Bưu Chính Viễn Thông | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Bưu Chính Viễn Thông . Gần nhà ngay tại khu vực sinh sống . Ứng tuyển đi làm ngay 300+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-thuc-tap-sinh',
          heading: 'Thông tin tuyển dụng tìm việc làm Sinh viên thực tập / Mới ra trường lương cao, uy tín',
          title: 'Tuyển dụng Thực tập sinh/ Mới tốt nghiệp lương (3-5 tr) 2018 | JOBNOW',
          description: 'Việc làm thực tập sinh , việc làm sinh viên mới ra trường tại các công ty lớn lương thưởng hấp dẫn môi trường tốt. Xem ngay 1000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-thu-cong-my-nghe',
          heading: 'Thông tin tuyển dụng tìm việc làm Thủ Công Mỹ Nghệ lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Thủ công mỹ nghệ | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Thủ công mỹ nghệ  lương cao môi trường tốt phúc lợi hấp dẫn.Nhận việc đi làm ngay với 300+ công việc tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-thiet-ke-do-hoa',
          heading: 'Thông tin tuyển dụng tìm việc làm Thiết kế đồ họa lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Thiết kế đồ họa 2018 | JOBNOW',
          description: 'Có 300+ việc làm Thiết kế đồ họa  (Cần tuyển gấp) lương cao Từ các công ty tuyển dụng Thiết kế đồ họa hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '',
          url: 'viec-lam-moi-truong-xu-ly-chat-thai',
          heading: 'Thông tin tuyển dụng tìm việc làm Môi Trường lương cao, uy tín',
          title: 'Tìm việc đi làm ngay việc làm Môi trường/Xử lý chất thải  2018 | JOBNOW',
          description: 'Có 100+ việc làm Môi trường/Xử lý chất thải  (Cần tuyển gấp) lương cao. Từ các công ty tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '5ba9de1b74a4d74b92bc4530',
          url: 'viec-lam-kinh-doanh-ban-hang',
          heading: 'Thông tin tuyển dụng tìm việc làm Kinh doanh/Bán hàng lương cao, uy tín',
          title: 'Tuyển dụng việc làm Nhân viên Kinh Doanh/Bán Hàng | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Nhân viên Kinh Doanh/Bán Hàng . Gần nhà ngay tại khu vực sinh sống . Có 1000+ việc làm tại JOBNOW'
        },
        {
          id: '5ba9de5874a4d74b92bc4535',
          url: 'viec-lam-hanh-chinh-van-phong',
          heading: 'Thông tin tuyển dụng tìm việc làm Hành chính/Văn phòng lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Hành chính văn phòng | JOBNOW',
          description: 'Hơn 450+ Viêc làm nhân viên Hành Chính Văn Phòng. Lương cao môi trường phúc lợi hấp dẫn đang chờ ứng tuyển tại JOBNOW'
        },
        {
          id: '5ba9de6274a4d74b92bc4536',
          url: 'viec-lam-marketing-pr',
          heading: 'Thông tin tuyển dụng tìm việc làm Marketing/PR lương cao, uy tín',
          title: 'Tuyển dụng đi làm ngay việc làm chuyên viên Marketing/Pr | JOBNOW',
          description: 'Hơn 650+ Viêc làm Chuyên viên Marketing/PR. Lương cao(8-10tr) môi trường phúc lợi hấp dẫn. Đang chờ ứng tuyển tại JOBNOW'
        },
        {
          id: '5bac4866f878a6220b1a7832',
          url: 'viec-lam-giao-duc-dao-tao',
          heading: 'Thông tin tuyển dụng tìm việc làm Giáo dục/Đào tạo lương cao, uy tín',
          title: 'Tuyển dụng đi làm ngay việc làm Giáo dục- Đào tạo 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Giáo dục-Đào tạo . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5ba9dea074a4d74b92bc4539',
          url: 'viec-lam-co-khi-che-tao',
          heading: 'Thông tin tuyển dụng tìm việc làm Cơ khí/Chế tạo lương cao, uy tín',
          title: 'Tuyển dụng đi làm ngay việc làm Cơ Khí/Chế Tạo 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Cơ khí/Chế tạo . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac48a6f878a6220b1a7838',
          url: 'viec-lam-nhan-vien-ky-thuat',
          heading: 'Thông tin tuyển dụng tìm việc làm Kỹ Thuật lương cao, uy tín',
          title: 'Tuyển dụng đi làm ngay việc làm Nhân viên kỹ thuật 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Nhân viên Kỹ Thuật . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac4a69f878a6220b1a785a',
          url: 'viec-lam-thu-ky-tro-ly',
          heading: 'Thông tin tuyển dụng tìm việc làm Thư ký/Trợ lý lương cao, uy tín',
          title: 'Tuyển dụng đi làm ngay việc làm Thư ký trợ lý 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Thư Ký Trợ Lý Giám Đốc . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac605f6b8e2325772953b8',
          url: 'viec-lam-dien-tu-truyen-thong',
          heading: 'Thông tin tuyển dụng tìm việc làm Điện tử/Viễn thông lương cao, uy tín',
          title: 'Tuyển dụng đi làm ngay việc làm Điện tử truyển thông 11/2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Điện Tử Truyền Thông . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac4a31f878a6220b1a7858',
          url: 'viec-lam-it-phan-cung',
          heading: 'Thông tin tuyển dụng tìm việc làm IT phần cứng lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm IT-Phần Cứng/Mạng | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm IT-Phần Cứng/Mạng . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac60986b8e2325772953bd',
          url: 'viec-lam-du-lich-khach-san',
          heading: 'Thông tin tuyển dụng tìm việc làm Du Lịch lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Du Lịch Khách Sạn | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Du Lịch Khách Sạn . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac60866b8e2325772953bb',
          url: 'viec-lam-phap-ly-luat',
          heading: 'Thông tin tuyển dụng tìm việc làm Pháp Lý/Luật lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Pháp Lý/Luật 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Chuyên ngành Luật/Pháp lý . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển ngay tại JOBNOW '
        },
        {
          id: '5bac60c66b8e2325772953c1',
          url: 'viec-lam-o-to-xe-may',
          heading: 'Thông tin tuyển dụng tìm việc làm Ô Tô/Xe Máy lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Ô Tô/ Xe Máy 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Ô Tô/ Xe Máy. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac60ba6b8e2325772953c0',
          url: 'viec-lam-hoa-hoc-sinh-hoc',
          heading: 'Thông tin tuyển dụng tìm việc làm Hóa Học/Sinh Học lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Hóa Học/Sinh Học | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Hóa Học/Sinh Học. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac61036b8e2325772953c6',
          url: 'viec-lam-my-pham-trang-suc',
          heading: 'Thông tin tuyển dụng tìm việc làm Mỹ phẩm/Trang sức lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Mỹ Phẩm/Trang Sức | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Mỹ Phẩm/Trang Sức. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac613e6b8e2325772953cc',
          url: 'viec-lam-bao-ve-an-ninh',
          heading: 'Thông tin tuyển dụng tìm việc làm Bảo vệ an ninh/Vệ sĩ lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Bảo vệ an ninh/Vệ sĩ | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Bảo vệ an ninh/Vệ sĩ. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac611d6b8e2325772953c8',
          url: 'viec-lam-nong-lam-ngu-nghiep',
          heading: 'Thông tin tuyển dụng tìm việc làm Nông/Lâm/Ngư nghiệp lương cao, uy tín',
          title: 'Tuyển dụng đi làm ngay việc làm Nông/Lâm/Ngư Nghiệp | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Nông/Lâm/Ngư Nghiệp. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bad94e5fcc5ec3813719c66',
          url: 'viec-lam-quan-ly-dieu-hanh',
          heading: 'Thông tin tuyển dụng tìm việc làm Quản lý điều hành lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Quản lý/Điều hành | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Quản lý/Điều hành . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac61596b8e2325772953cf',
          url: 'viec-lam-to-chuc-su-kien',
          heading: 'Thông tin tuyển dụng tìm việc làm Tổ chức sự kiện/Quà tặng lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Tổ Chức Sự Kiện | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Tổ Chức Sự Kiện/Quà Tặng . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển với 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bad94dcfcc5ec3813719c65',
          url: 'viec-lam-lao-dong-pho-thong',
          heading: 'Thông tin tuyển dụng tìm việc làm Lao động phổ thông lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Lao động phổ thông | JOBNOW',
          description: 'Tuyển dụng tìm việc làm lao động phổ thông Lương cao (7-10 tr) môi trường phúc lợi tốt. Ứng tuyển nhận việc làm ngay tại JOBNOW.COM.VN'
        },
        {
          id: '5bb326a00113f31c10ce0de5',
          url: 'viec-lam-pb-pg-le-tan',
          heading: 'Thông tin tuyển dụng tìm việc làm PG/PB/Lễ tân lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm PB/PG/Lễ Tân 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm PB/PG/Lễ Tân 2018. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển với 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bb194edf0c200661edc6272',
          url: 'viec-lam-lai-xe',
          heading: 'Thông tin tuyển dụng tìm việc làm Lái Xe lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Lái Xe 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Lái Xe 2018. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển với 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bb3439e49b2af1faa66a33c',
          url: 'viec-lam-hang-gia-dung',
          heading: 'Thông tin tuyển dụng tìm việc làm Hàng Gia Dụng lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Hàng Gia Dụng 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Hàng Gia Dụng 2018. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển với 25.000+ việc làm tại JOBNOW'
        }
      ],
      provinces: [
        {
          id: '5bab55c0a6ea74192e76e1e3',
          url: 'viec-lam-tai-an-giang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại An giang Lương cao, uy tín ',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại An Giang 2019 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm An Giang mới nhất . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e399',
          url: 'viec-lam-tai-can-tho',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Cần Thơ Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Cần Thơ 2019 |JOBNOW ',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Cần Thơ mới nhất . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e332',
          url: 'viec-lam-tai-binh-thuan',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bình Thuận Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bình Thuận 2019 |JOBNOW ',
          description: 'Sàn giao dịch việc làm Bình Thuận - Tìm việc làm tại Bình Thuận mới nhất. Đăng tin tuyển dụng Bình Thuận miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c1a6ea74192e76e442',
          url: 'viec-lam-tai-dong-thap',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Đồng Tháp Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đồng Tháp 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đồng Tháp - Tìm việc làm tại Đồng Tháp mới nhất. Đăng tin tuyển dụng Đồng Tháp miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '',
          url: 'viec-lam-tai-bac-ninh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bắc Ninh Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bắc Ninh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bắc Ninh - Tìm việc làm tại Bắc Ninh mới nhất. Đăng tin tuyển dụng Bắc Ninh miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e219',
          url: 'viec-lam-tai-hung-yen',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hưng Yên Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hưng Yên 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hưng Yên - Tìm việc làm tại Hưng Yên mới nhất. Đăng tin tuyển dụng Hưng Yên miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c1a6ea74192e76e33d',
          url: 'viec-lam-tai-hai-phong',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hải Phòng Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hải Phòng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hải Phòng - Tìm việc làm tại Hải Phòng mới nhất. Đăng tin tuyển dụng Hải Phòng miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e25f',
          url: 'viec-lam-tai-ha-noi',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hà Nội Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hà Nội  2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hà Nội - Tìm việc làm tại Hà Nội mới nhất. Đăng tin tuyển dụng Hà Nội miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e2f4',
          url: 'viec-lam-tai-son-la',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Sơn La Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Sơn La 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Sơn La - Tìm việc làm tại Sơn La mới nhất. Đăng tin tuyển dụng Sơn La miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e20d',
          url: 'viec-lam-tai-binh-phuoc',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bình Phước Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bình Phước 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bình Phước - Tìm việc làm tại Bình Phước mới nhất. Đăng tin tuyển dụng Bình Phước miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e23e',
          url: 'viec-lam-tai-quang-tri',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Quảng Trị Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Trị 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Trị - Tìm việc làm tại Quảng Trị mới nhất. Đăng tin tuyển dụng Quảng Trị miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c1a6ea74192e76e3a3',
          url: 'viec-lam-tai-thua-thien-hue',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Thừa Thiên Huế Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Thừa Thiên Huế 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Thừa Thiên Huế - Tìm việc làm tại Thừa Thiên Huế mới nhất. Đăng tin tuyển dụng Thừa Thiên Huế miễn phí – Tại Jobnow.com.vn'
        },
        {
          id: '',
          url: 'viec-lam-tai-thai-nguyen',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Thái Nguyên Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Thái Nguyên 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Thái Nguyên - Tìm việc làm tại Thái Nguyên mới nhất. Đăng tin tuyển dụng Thái Nguyên miễn phí – Tại Jobnow.com.vn'
        },
        {
          id: '5bab55c0a6ea74192e76e1ef',
          url: 'viec-lam-tai-kon-tum',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Kon Tum Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Kon Tum 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Kon Tum - Tìm việc làm tại Kon Tum mới nhất. Đăng tin tuyển dụng Kon Tum miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c1a6ea74192e76e43a',
          url: 'viec-lam-tai-ninh-thuan',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Ninh Thuận Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Ninh Thuận 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Ninh Thuận - Tìm việc làm tại Ninh Thuận mới nhất. Đăng tin tuyển dụng Ninh Thuận miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e2bd',
          url: 'viec-lam-tai-kien-giang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Kiên giang Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Kiên Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Kiên Giang - Tìm việc làm tại Kiên Giang mới nhất. Đăng tin tuyển dụng Kiên Giang miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e202',
          url: 'viec-lam-tai-soc-trang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Sóc Trăng Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Sóc Trăng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Sóc Trăng - Tìm việc làm tại Sóc Trăng mới nhất. Đăng tin tuyển dụng Sóc Trăng miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '',
          url: 'viec-lam-tai-ha-nam',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hà Nam Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hà Nam 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hà Nam - Tìm việc làm tại Hà Nam mới nhất. Đăng tin tuyển dụng Hà Nam miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e250',
          url: 'viec-lam-tai-quang-ngai',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Quảng Ngãi Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Ngãi 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Ngãi - Tìm việc làm tại Quảng Ngãi mới nhất. Đăng tin tuyển dụng Quảng Ngãi miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW '
        },
        {
          id: '',
          url: 'viec-lam-tai-quang-binh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Quảng Bình Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Bình  2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Bình  - Tìm việc làm tại Quảng Bình  mới nhất. Đăng tin tuyển dụng Quảng Bình  miễn phí –Ứng tuyển 25.000+ việc làm tại JOBNOW '
        },
        {
          id: '5bab55c0a6ea74192e76e2d6',
          url: 'viec-lam-tai-phu-yen',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Phú Yên Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Phú Yên 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Phú Yên - Tìm việc làm tại Phú Yên mới nhất. Đăng tin tuyển dụng Phú Yên miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e37d',
          url: 'viec-lam-tai-ba-ria-vung-tau',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bà rịa Vũng Tàu Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bà Rịa Vũng Tàu 2019 | JOBNOW',
          description: 'Tìm việc làm tại Bà Rịa Vũng Tàu mới nhất. Đăng tin tuyển dụng Bà Rịa Vũng Tàu miễn phí – Ứng tuyển ngay với 25.000+ việc làm tại JOBNOW.COM.VN '
        },
        {
          id: '5bab55c1a6ea74192e76e38f',
          url: 'viec-lam-tai-binh-duong',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bình Dương Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bình Dương 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bình Dương - Tìm việc làm tại Bình Dương mới nhất. Đăng tin tuyển dụng Bình Dương miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e328',
          url: 'viec-lam-tai-khanh-hoa',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Khánh Hòa Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Khánh Hòa 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Khánh Hòa - Tìm việc làm tại Khánh Hòa mới nhất. Đăng tin tuyển dụng Khánh Hòa miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e35f',
          url: 'viec-lam-tai-gia-lai',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Gia Lai Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Gia Lai 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Gia Lai - Tìm việc làm tại Gia Lai mới nhất. Đăng tin tuyển dụng Gia Lai miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3c4',
          url: 'viec-lam-tai-dien-bien',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Điện Biên Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Điện Biên 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Điện Biên - Tìm việc làm tại Điện Biên mới nhất. Đăng tin tuyển dụng Điện Biên miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e224',
          url: 'viec-lam-tai-thanh-hoa',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Thanh Hóa Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Thanh Hóa 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Thanh Hóa - Tìm việc làm tại Thanh Hóa mới nhất. Đăng tin tuyển dụng Thanh Hóa miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e2aa',
          url: 'viec-lam-tai-nghe-an',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Nghệ An Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Nghệ An 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Nghệ An - Tìm việc làm tại Nghệ An mới nhất. Đăng tin tuyển dụng Nghệ An miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-ha-tinh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hà Tĩnh Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hà Tĩnh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hà Tĩnh - Tìm việc làm tại Hà Tĩnh mới nhất. Đăng tin tuyển dụng Hà Tĩnh miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-thai-binh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Thái Bình Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Thái Bình 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Thái Bình - Tìm việc làm tại Thái Bình mới nhất. Đăng tin tuyển dụng Thái Bình miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e248',
          url: 'viec-lam-tai-tuyen-quang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Tuyên Quang Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Tuyên Quang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Tuyên Quang - Tìm việc làm tại Tuyên Quang mới nhất. Đăng tin tuyển dụng Tuyên Quang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3d9',
          url: 'viec-lam-tai-quang-nam',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Quảng Nam Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Nam 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Nam - Tìm việc làm tại Quảng Nam mới nhất. Đăng tin tuyển dụng Quảng Nam miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e412',
          url: 'viec-lam-tai-bac-lieu',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bạc Liêu Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bạc Liêu 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bạc Liêu - Tìm việc làm tại Bạc Liêu mới nhất. Đăng tin tuyển dụng Bạc Liêu miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-bac-kan',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bắc Kạn Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bắc Kạn 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bắc Kạn - Tìm việc làm tại Bắc Kạn mới nhất. Đăng tin tuyển dụng Bắc Kạn miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e1f9',
          url: 'viec-lam-tai-dak-nong',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Đắk Nông Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đắk Nông 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đắk Nông - Tìm việc làm tại Đắk Nông mới nhất. Đăng tin tuyển dụng Đắk Nông miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-cao-bang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Cao Bằng Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Cao Bằng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Cao Bằng - Tìm việc làm tại Cao Bằng mới nhất. Đăng tin tuyển dụng Cao Bằng miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e385',
          url: 'viec-lam-tai-ca-mau',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Cà Mau Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Cà Mau  2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Cà Mau  - Tìm việc làm tại Cà Mau  mới nhất. Đăng tin tuyển dụng Cà Mau  miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e27e',
          url: 'viec-lam-tai-lao-cai',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Lào Cai Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Lào Cai 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Lào Cai - Tìm việc làm tại Lào Cai mới nhất. Đăng tin tuyển dụng Lào Cai miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e2e0',
          url: 'viec-lam-tai-lang-son',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Lạng Sơn Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Lạng Sơn 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Lạng Sơn - Tìm việc làm tại Lạng Sơn mới nhất. Đăng tin tuyển dụng Lạng Sơn miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-quang-ninh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Quảng Ninh Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Ninh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Ninh - Tìm việc làm tại Quảng Ninh mới nhất. Đăng tin tuyển dụng Quảng Ninh miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e288',
          url: 'viec-lam-tai-vinh-long',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Vĩnh Long Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Vĩnh Long 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Vĩnh Long - Tìm việc làm tại Vĩnh Long mới nhất. Đăng tin tuyển dụng Vĩnh Long miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3b9',
          url: 'viec-lam-tai-tien-giang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Tiền Giang Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Tiền Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Tiền Giang - Tìm việc làm tại Tiền Giang mới nhất. Đăng tin tuyển dụng Tiền Giang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-bac-giang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bắc Giang Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bắc Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bắc Giang - Tìm việc làm tại Bắc Giang mới nhất. Đăng tin tuyển dụng Bắc Giang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e2cb',
          url: 'viec-lam-tai-ha-giang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hà Giang Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hà Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hà Giang - Tìm việc làm tại Hà Giang mới nhất. Đăng tin tuyển dụng Hà Giang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e29e',
          url: 'viec-lam-tai-binh-dinh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bình Định Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bình Định 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bình Định - Tìm việc làm tại Bình Định mới nhất. Đăng tin tuyển dụng Bình Định miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e477',
          url: 'viec-lam-tai-phu-tho',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Phú Thọ Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Phú Thọ 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Phú Thọ - Tìm việc làm tại Phú Thọ mới nhất. Đăng tin tuyển dụng Phú Thọ miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e405',
          url: 'viec-lam-tai-hai-duong',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hải Dương Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hải Dương 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hải Dương - Tìm việc làm tại Hải Dương mới nhất. Đăng tin tuyển dụng Hải Dương miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e2ec',
          url: 'viec-lam-tai-da-nang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Đà Nẵng Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đà Nẵng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đà Nẵng - Tìm việc làm tại Đà Nẵng mới nhất. Đăng tin tuyển dụng Đà Nẵng miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e34c',
          url: 'viec-lam-tai-ninh-binh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Ninh Bình Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Ninh Bình 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Ninh Bình - Tìm việc làm tại Ninh Bình mới nhất. Đăng tin tuyển dụng Ninh Bình miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-long-an',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Long An Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Long An 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Long An - Tìm việc làm tại Long An mới nhất. Đăng tin tuyển dụng Long An miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e315',
          url: 'viec-lam-tai-lai-chau',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Lai Châu Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Lai Châu 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Lai Châu - Tìm việc làm tại Lai Châu mới nhất. Đăng tin tuyển dụng Lai Châu miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e355',
          url: 'viec-lam-tai-yen-bai',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Yên Bái Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Yên Bái 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Yên Bái - Tìm việc làm tại Yên Bái mới nhất. Đăng tin tuyển dụng Yên Bái miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3ec',
          url: 'viec-lam-tai-dak-lak',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Đắk Lắk Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đắk Lắk 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đắk Lắk - Tìm việc làm tại Đắk Lắk mới nhất. Đăng tin tuyển dụng Đắk Lắk miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e31e',
          url: 'viec-lam-tai-ben-tre',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Bến Tre Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bến Tre 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bến Tre - Tìm việc làm tại Bến Tre mới nhất. Đăng tin tuyển dụng Bến Tre miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3ad',
          url: 'viec-lam-tai-dong-nai',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Đồng Nai Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đồng Nai 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đồng Nai - Tìm việc làm tại Đồng Nai mới nhất. Đăng tin tuyển dụng Đồng Nai miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-ho-chi-minh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại TP. Hồ Chí Minh Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại TP.HCM 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm TP. HCM - Tìm việc làm tại TP. Hồ Chí Minh mới nhất. Đăng tin tuyển dụng TP.HCM miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e371',
          url: 'viec-lam-tai-hoa-binh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hòa Bình Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hòa Bình 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hòa Bình  - Tìm việc làm tại Hòa Bình  mới nhất. Đăng tin tuyển dụng Hòa Bình  miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-hau-giang',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Hậu Giang Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hậu Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hậu Giang - Tìm việc làm tại Hậu Giang mới nhất. Đăng tin tuyển dụng Hậu Giang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e30a',
          url: 'viec-lam-tai-nam-dinh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Nam Định Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Nam Định 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Nam Định - Tìm việc làm tại Nam Định mới nhất. Đăng tin tuyển dụng Nam Định miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3cf',
          url: 'viec-lam-tai-vinh-phuc',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Vĩnh Phúc Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Vĩnh Phúc 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Vĩnh Phúc - Tìm việc làm tại Vĩnh Phúc mới nhất. Đăng tin tuyển dụng Vĩnh Phúc miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e291',
          url: 'viec-lam-tai-lam-dong',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Lâm Đồng Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Lâm Đồng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Lâm Đồng - Tìm việc làm tại Lâm Đồng mới nhất. Đăng tin tuyển dụng Lâm Đồng miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e41a',
          url: 'viec-lam-tai-tra-vinh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Trà Vinh Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Trà Vinh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Trà Vinh  - Tìm việc làm tại Trà Vinh  mới nhất. Đăng tin tuyển dụng Trà Vinh  miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e301',
          url: 'viec-lam-tai-tay-ninh',
          heading: 'Thông tin tuyển dụng tìm việc làm tại Tây Ninh Lương cao, uy tín',
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Tây Ninh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Tây Ninh - Tìm việc làm tại Tây Ninh mới nhất. Đăng tin tuyển dụng Tây Ninh miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        }
      ],
      others: [
        {
          url: 'tim-viec-gan-nha',
          heading: 'Tìm việc làm gần nhà',
          title: 'Việc làm quanh đây, việc làm nhà cập nhật theo vị trí tốt nhất | JOBNOW',
          description: 'Jobnow mạng việc làm tuyển dụng với công nghệ tìm việc theo định vị giúp ứng viej đễ dàng tìm được công việc gần nhà tại nơi đang sinh sống'
        },
        {
          url: 'viec-lam-hap-dan',
          heading: 'Tìm việc làm hấp dẫn',
          title: 'Việc làm hấp dẫn Lương cao chế độ đãi ngộ tốt mới nhất 2018 | JOBNOW',
          description: 'Xem ngay 4.376 Việc làm hấp dẫn lương cao được cập nhật mỗi ngày tại JOBNOW'
        },
        {
          url: 'viec-lam-tuyen-gap',
          heading: 'Tìm việc làm tuyển gấp',
          title: '3000+ Việc làm tuyển gấp đi làm ngay uy tín chất lượng | JOBNOW',
          description: 'Tuyển dụng đi làm ngay với 5.383 Việc làm đang cần tuyển gấp - JOBNOW'
        },
        {
          url: 'viec-lam-moi-nhat',
          heading: 'Tìm việc làm mới nhất',
          title: 'Cập nhật 1000+ việc làm mới nhất chất lượng cao mỗi ngày | JOBNOW',
          description: 'Với hàng nghìn việc làm mới nhất \'Lương cao\' được cập nhật mỗi ngày tại - JOBNOW.COM.VN'
        },
        {
          url: 'flash-jobs',
          heading: 'Flash Jobs tìm việc nhanh như chớp',
          title: 'FLASH JOBS tuyển dụng tìm việc nhanh chỉ với 30 phút',
          description: 'Flash Job là một tính năng nổi bật của JobNow giúp cho việc tuyển dụng và tìm việc nhanh chóng trong vòng 30 phút. Trải nghiệm ngay'
        },
        {
          url: 'tim-viec-lam-theo-dia-diem',
          heading: 'Tìm việc làm theo địa điểm',
          title: 'Kênh Tuyển dụng, tìm việc làm nhanh uy tín mới nhất  2018 | JOBNOW',
          description: 'Với 1000+ việc làm mới được cập nhật mỗi ngày tại JOBNOW theo từng khu vực sinh sống giúp ứng viên dễ dàng tìm được công việc phù hợp nhất.'
        },
        {
          url: 'tim-viec-lam',
          heading: 'Tìm việc làm theo ngành nghề',
          title: 'Tuyển dụng , tìm việc làm nhanh theo ngành nghề | JOBNOW',
          description: 'Tìm kiếm nhanh tất cả công việc theo ngành nghề tại  JOBNOW với hơn 1000+ việc làm mới,lương cao môi trường hấp dẫn được cập nhật mỗi ngày .'
        }
      ]
    };
    return str;
  }
}
