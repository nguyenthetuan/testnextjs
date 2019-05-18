import React, { Component } from 'react';
import language from '../config/language/index';

export default class Setting extends Component {
  static creatSEO = () => {
    let str = {
      categories: [
        {
          id: '5ba9de3f74a4d74b92bc4533',
          url: 'viec-lam-tu-van',
          heading: language.seo.categories.consulting.heading,
          title: '1000+ Việc làm tư vấn chăm sóc khách hàng mới nhất | JOBNOW',
          description: 'Hơn 1000+ việc làm tư vấn, chăm sóc khách hàng, Telesale môi trường và phúc lợi hấp dẫn liên tục tuyển dụng tham gia ứng tuyển ngay'
        },
        {
          id: '5ba9de3374a4d74b92bc4532',
          url: 'viec-lam-bat-dong-san',
          heading: language.seo.categories.realEstate.heading,
          title: '1000+ Việc làm tư vấn chăm sóc khách hàng mới nhất | JOBNOW',
          description: 'Hơn 1000+ việc làm tư vấn, chăm sóc khách hàng, Telesale môi trường và phúc lợi hấp dẫn liên tục tuyển dụng tham gia ứng tuyển ngay'
        },
        {
          id: '5ba9de6974a4d74b92bc4537',
          url: 'viec-lam-xay-dung',
          heading: language.seo.categories.build.heading,
          title: 'Tuyển dụng tìm việc làm xây dựng lương cao 1.389 việc làm tại JOBNOW ',
          description: 'Tổng hợp tất cả các tin tuyển dụng việc làm xây dựng hàng đầu, lương cao, môi trường tốt đang chờ bạn. Tìm hiểu ngay tại JOBNOW. '
        },
        {
          id: '5bac4878f878a6220b1a7833',
          url: 'viec-lam-y-te-duoc-sy',
          heading: language.seo.categories.pharmacist.heading,
          title: 'Tuyển dụng tìm việc làm Y Tế/ Dược Sỹ mới nhất | JOBNOW',
          description: 'Tuyển dụng tìm nhanh việc làm Y tế/Dược sỹ lương cao, phúc lợi hấp dẫn mới nhất 2018. Nhận việc ngay tại JOBNOW  '
        },
        {
          id: '5bac48e0f878a6220b1a783d',
          url: 'viec-lam-xuat-nhap-khau',
          heading: language.seo.categories.warehouse.heading,
          title: 'Tuyển dụng tìm việc làm Xuất nhập khẩu lương cao mới nhất | JOBNOW',
          description: 'Tuyển dụng tìm nhân viên  Xuất nhập khẩu/Ngoại thương, lương thưởng hấp dẫn. 1.238 việc làm đang chờ bạn tại JOBNOW '
        },
        {
          id: '5bac489cf878a6220b1a7837',
          url: 'viec-lam-kien-truc-thiet-ke',
          heading: language.seo.categories.architecture.heading,
          title: 'Tuyển dụng tìm việc làm nhanh Kiến trúc/ Thiết kế nội thất |JOBNOW',
          description: 'Xem ngay 2.356 việc làm Kiến trúc - Thiết kế nội thất. Từ những công ty thiết kế nội thất uy tín tại JOBNOW '
        },
        {
          id: '5bac48c5f878a6220b1a783c',
          url: 'viec-lam-khach-san-nha-hang',
          heading: language.seo.categories.hotel.heading,
          title: 'Tuyển dụng tìm việc làm Nhà hàng - Khách sạn Lương cao | JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Nhà hàng Khách sạn gần nhà lương cao. Xem ngay 1.254 công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac60786b8e2325772953ba',
          url: 'viec-lam-thuong-mai-dien-tu',
          heading: language.seo.categories.ecommerce.heading,
          title: 'Tuyển dụng tìm việc làm nhanh Thương mại điện tử | JOBNOW.COM.VN ',
          description: 'Tìm việc làm Tuyển dụng việc làm Thương mại điện tử gần nhà lương cao môi trường tốt . Xem ngay 1.254 công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac60566b8e2325772953b7',
          url: 'viec-lam-quan-tri-kinh-doanh',
          heading: language.seo.categories.business.heading,
          title: 'Tuyển dụng tìm việc làm nhanh Quản trị kinh doanh - 2018 |JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Quản trị kinh doanh Gần nhà lương cao môi trường tốt . Xem ngay 2.254 công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac60906b8e2325772953bc',
          url: 'viec-lam-tiep-thi-quang-cao',
          heading: language.seo.categories.marketing.heading,
          title: 'Tuyển dụng tìm việc làm nhanh Tiếp thị quảng cáo - 2018 | JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Tiếp thị quảng cáo Gần nhà lương cao môi trường tốt . Xem ngay 1.123 công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac60d66b8e2325772953c2',
          url: 'viec-lam-dich-vu-an-uong',
          heading: language.seo.categories.service.heading,
          title: 'Tuyển dụng tìm việc làm nhanh Dịch vụ ăn uống 2018 |JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Thực phẩm / Dịch vụ ăn uống  Gần nhà lương cao môi trường tốt . Xem ngay 300+ công việc mới nhất đang chờ ứng tuyển  '
        },
        {
          id: '5bac60ef6b8e2325772953c4',
          url: 'viec-lam-thoi-trang',
          heading: language.seo.categories.fashion.heading,
          title: 'Tuyển dụng tìm việc làm nhân viên thiết kế thời trang 2018 | JOBNOW',
          description: 'Bạn đang cần tìm việc thiết kế thời trang? Cần tìm việc làm về thời trang lương cao môi trường và phúc lợi tốt. Xem ngay 500+ việc làm tốt nhất tại JOBNOW'
        },
        {
          id: '5bac61116b8e2325772953c7',
          url: 'viec-lam-quan-ly-cong-nghiep',
          heading: language.seo.categories.manager.heading,
          title: 'Tuyển dụng Tìm việc làm nghành quản lý công nghiệp 2018 | JOBNOW',
          description: 'Xem ngay 300+ Việc làm quản lý công nghiệp, đang cần tuyển dụng ngay lương thưởng hấp dẫn mới nhất 2018. Đăng ký đi làm ngay tại JOBNOW'
        },
        {
          id: '5bac60e86b8e2325772953c3',
          url: 'viec-lam-dau-tu-tai-chinh',
          heading: language.seo.categories.invest.heading,
          title: 'Việc làm tài chính , Tuyển dụng nhân viên tài chính, lương cao | JOBNOW',
          description: 'Tìm việc làm Tuyển dụng việc làm Đầu tư/ Tài chính  Gần nhà lương cao môi trường tốt . Xem ngay 600+ công việc mới nhất 2018 đang chờ ứng tuyển  '
        },
        {
          id: '5bac614b6b8e2325772953ce',
          url: 'viec-lam-cong-nghe-cao',
          heading: language.seo.categories.technology.heading,
          title: 'Tuyển dụng nhanh tìm việc làm công nghệ cao mới nhất 2018 | JOBNOW',
          description: 'Nhiều vị trí tìm việc hấp dẫn có tại JOBNOW – web tìm việc “nhanh như chớp”. Xem ngay 1000+ việc làm công nghệ cao mới nhất.'
        },
        {
          id: '5bac612d6b8e2325772953ca',
          url: 'viec-lam-chung-khoan',
          heading: language.seo.categories.stock.heading,
          title: 'Tuyển dụng tìm việc làm Chứng khoán/Vàng  lương (trên 10tr) | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Chứng khoán/ Vàng  lương trên 10 tr mới nhất trên toàn quốc môi trường tốt phúc lợi hấp dẫn. Ứng tuyển ngay tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-hoach-dinh-du-an',
          heading: language.seo.categories.zoning.heading,
          title: 'Tuyển dụng nhanh tìm việc làm Hoạch định/Dự án 11/2018 | JOBNOW',
          description: 'Có 100+ tin tuyển dụng việc làm Hoạch định/Dự án (Cần tuyển gấp) lương cao Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW việc làm uy tín '
        },
        {
          id: '',
          url: 'viec-lam-giao-hang-chuyen-phat-nhanh',
          heading: language.seo.categories.delivery.heading,
          title: 'Tuyển dụng tìm việc làm giao hàng chuyển phát nhanh 2018 | JOBNOW',
          description: 'Có 500+ Công ty vận chuyển tuyển dụng việc làm giao hàng chuyển phát nhanh lương cao (cần tuyển gấp). Mới nhất tại JOBNOW việc làm uy tín '
        },
        {
          id: '',
          url: 'viec-lam-san-xuat',
          heading: language.seo.categories.manufacturing.heading,
          title: 'Tuyển dụng tìm việc làm Quản lý sản xuất mới nhất 2018 | JOBNOW',
          description: 'Có 800+ tin tuyển dụng việc làm quản lý sản xuất  (Cần tuyển gấp) lương cao Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW việc làm uy tín '
        },
        {
          id: '',
          url: 'viec-lam-spa-lam-dep',
          heading: language.seo.categories.spa.heading,
          title: 'Tuyển dụng tìm việc làm Spa/Làm đẹp mới nhất 2018 | JOBNOW',
          description: 'Có 300+ tin tuyển dụng việc làm nhân viên spa làm đẹp(Cần tuyển gấp) lương cao. Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW việc làm uy tín '
        },
        {
          id: '',
          url: 'viec-lam-nghe-thuat-dien-anh',
          heading: language.seo.categories.art.heading,
          title: 'Tuyển dụng nhanh tìm việc làm Nghệ thuật/Điện ảnh 2018 | JOBNOW',
          description: 'Xem ngay 300+ tin tuyển dụng việc làm ngành giải trí, nghệ thuật (Cần tuyển gấp) lương cao. Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '',
          url: 'viec-lam-qa-qc-tham-dinh-giam-sat',
          heading: language.seo.categories.supervisor.heading,
          title: 'Tuyển dụng nhanh tìm việc làm QA/QC/Thẩm định/Giám sát | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm thẩm định tín dụng lương (8-10 tr) mới nhất trên toàn quốc môi trường tốt phúc lợi hấp dẫn. Ứng tuyển ngay tại JOBNOW'
        },
        {
          id: '5ba9de4d74a4d74b92bc4534',
          url: 'viec-lam-ke-toan-kiem-toan',
          heading: language.seo.categories.audit.heading,
          title: 'Tuyển dụng tìm việc làm Kế toán/Kiểm toán lương (8- 10tr) | JOBNOW',
          description: 'Có 800+ tin tuyển dụng việc làm Kế toán/Kiểm toán (Cần tuyển gấp) lương cao Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW việc tốt nhất'
        },
        {
          id: '5ba9de8b74a4d74b92bc4538',
          url: 'viec-lam-dien-dien-tu-dien-lanh',
          heading: language.seo.categories.electron.heading,
          title: 'Tuyển dụng tìm việc làm Điện/Điện Tử/Điện Lạnh lương cao | JOBNOW',
          description: 'Có 450+ việc làm điện tử điện lạnh  (Cần tuyển gấp) lương cao Từ các công ty tuyển dụng ngành điện hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '5bac483cf878a6220b1a7830',
          url: 'viec-lam-it-phan-mem',
          heading: language.seo.categories.it.heading,
          title: 'Tuyển dụng tìm việc làm IT/Phần Mềm lương up to $1000+ | JOBNOW',
          description: 'Xem ngay 1000+ tin tuyển dụng việc làm IT/ Phần mềm đang (Cần tuyển gấp) lương cao. Từ nhà tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '5bac488cf878a6220b1a7836',
          url: 'viec-lam-ngan-hang-tai-chinh',
          heading: language.seo.categories.finance.heading,
          title: 'Tuyển dụng tìm việc làm Ngân Hàng/Tài Chính mới nhất 2018 | JOBNOW',
          description: 'Tìm việc làm Tài chính Ngân hàng , tuyển dụng nhân viên Tài chính Ngân hàng nhanh chóng trong vòng 5 phút. Tiếp cận ngay 1000+  tại JOBNOW '
        },
        {
          id: '5bac48b6f878a6220b1a783b',
          url: 'viec-lam-bien-dich-phien-dich',
          heading: language.seo.categories.interpreters.heading,
          title: 'Tuyển dụng tìm việc làm Biên Dịch/Phiên Dịch mới nhất 2018 | JOBNOW',
          description: 'Tìm việc làm tuyển dụng Biên dịch/Phiên dịch nhận kết quả ứng tuyển sau 5 phút. Tiếp cận ngay với 15000+ công việc mới nhất  tại JOBNOW'
        },
        {
          id: '5bac4886f878a6220b1a7834',
          url: 'viec-lam-hanh-chinh-nhan-su',
          heading: language.seo.categories.office.heading,
          title: 'Tuyển dụng tìm việc làm Hành chính/Nhân sự lương trên 10 tr | JOBNOW',
          description: 'Tìm việc làm hành chính nhân sự, tuyển dụng chuyên viên nhân sự ứng tuyển nhận kết quả sau 5 phút. Trải nghiệm ngay tại JOBNOW'
        },
        {
          id: '5bac4a18f878a6220b1a7856',
          url: 'viec-lam-thiet-ke-mi-thuat',
          heading: language.seo.categories.design.heading,
          title: 'Tuyển dụng tìm việc làm Thiết kế/Mỹ thuật mới nhất 2018 | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Thiết kế/Mỹ Thuật lương cao môi trường tốt phúc lợi hấp dẫn. Ứng tuyển tiếp cận 15000+ việc làm mới tại JOBNOW'
        },
        {
          id: '5bac49fdf878a6220b1a7855',
          url: 'giao-nhan-van-chuyen-kho-bai',
          heading: language.seo.categories.depot.heading,
          title: 'Tìm việc làm Giao Nhận Hàng Hóa Kho Bãi lương cao 2018 | JOBNOW',
          description: 'Tổng hợp việc làm Vận chuyển / Giao nhận hàng hóa/ Kho bãi mới nhất 2018. Từ các công ty vận chuyển hàng đầu việt nam. Nhận việc làm ngay tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-dich-vu-khach-hang',
          heading: language.seo.categories.customerService.heading,
          title: 'Tuyển dụng Tìm việc làm Dịch vụ khách hàng lương cao 2018 | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Dịch vụ khách hàng lương cao môi trường tốt phúc lợi hấp dẫn. Ứng tuyển tiếp cận 15000+ việc làm mới tại JOBNOW'
        },
        {
          id: '5bac4ad2f878a6220b1a785d',
          url: 'viec-lam-det-may-da-day',
          heading: language.seo.categories.textile.heading,
          title: 'Tuyển dụng Tìm việc làm Dệt may/Da dày lương cao 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Dệt may/ Da dày/ Thời trang may mặc. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển ngay tại JOBNOW '
        },
        {
          id: '5bac60ad6b8e2325772953bf',
          url: 'viec-lam-ky-thuat-ung-dung',
          heading: language.seo.categories.engineering.heading,
          title: 'Tuyển dụng nhanh Tìm việc làm kỹ thuật ứng dụng 11/2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm kỹ thuật ứng dụng/ cơ khí . Gần nhà ngay tại khu vực sinh sống . Ứng tuyển đi làm ngay tại JOBNOW '
        },
        {
          id: '',
          url: 'viec-lam-van-tai-tai-xe-lai-xe',
          heading: language.seo.categories.carriage.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Vận Tải - Lái xe/Tài xế | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Vận tải - Lái xe/ Tài xế . Gần nhà ngay tại khu vực sinh sống . Ứng tuyển tiếp cận 15.000+ việc làm tại JOBNOW '
        },
        {
          id: '5bac60a26b8e2325772953be',
          url: 'viec-lam-bao-chi-truyen-hinh',
          heading: language.seo.categories.newspaper.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Báo chí/ Truyền hình | JOBNOW',
          description: 'Việc làm báo chí truyền hình, tuyển dụng biên tập viên truyền hình lương thưởng hấp dẫn. Ứng tuyển ngay để tiếp cận với công ty truyền thông hàng đầu'
        },
        {
          id: '5bac61286b8e2325772953c9',
          url: 'viec-lam-quan-he-doi-ngoai',
          heading: language.seo.categories.regulations.heading,
          title: 'Tuyển dụng nhanh  việc làm Chuyên viên quan hệ đối ngoại | JOBNOW',
          description: 'Tuyển nhân viên phòng đối ngoại, Tìm việc làm ngành quan hệ quốc tế mức lương cao môi trường tốt. Xem ngay 15.000+ việc làm tốt nhất tại JOBNOW'
        },
        {
          id: '5bac60f56b8e2325772953c5',
          url: 'viec-lam-in-an-xuat-ban',
          heading: language.seo.categories.publish.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm In Ấn/Xuất Bản | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm In Ấn/Xuất Bản . Gần nhà ngay tại khu vực sinh sống . Ứng tuyển đi làm ngay 300+ việc làm tại JOBNOW '
        },
        {
          id: '5bac61356b8e2325772953cb',
          url: 'viec-lam-hang-khong',
          heading: language.seo.categories.air.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Hàng Không 11/2018 | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Hàng Không/Du lịch nhân viên mặt đất lương cao môi trường tốt phúc lợi hấp dẫn. 300+ công việc tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tong-hop',
          heading: language.seo.categories.synthetic.heading,
          title: 'Tuyển dụng nhanh tất cả việc làm lương cao mới nhất 2018 | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm. Các ngành nghề mới nhất lương cao môi trường tốt phúc lợi hấp dẫn. 1000+ công việc mới tại JOBNOW'
        },
        {
          id: '5bac61466b8e2325772953cd',
          url: 'viec-lam-buu-chinh-vien-thong',
          heading: language.seo.categories.postal.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Bưu Chính Viễn Thông | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Bưu Chính Viễn Thông . Gần nhà ngay tại khu vực sinh sống . Ứng tuyển đi làm ngay 300+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-thuc-tap-sinh',
          heading: language.seo.categories.interns.heading,
          title: 'Tuyển dụng Thực tập sinh/ Mới tốt nghiệp lương (3-5 tr) 2018 | JOBNOW',
          description: 'Việc làm thực tập sinh , việc làm sinh viên mới ra trường tại các công ty lớn lương thưởng hấp dẫn môi trường tốt. Xem ngay 1000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-thu-cong-my-nghe',
          heading: language.seo.categories.crafts.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Thủ công mỹ nghệ | JOBNOW',
          description: 'Tổng hợp tin tuyển dụng việc làm Thủ công mỹ nghệ  lương cao môi trường tốt phúc lợi hấp dẫn.Nhận việc đi làm ngay với 300+ công việc tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-thiet-ke-do-hoa',
          heading: language.seo.categories.graphic.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Thiết kế đồ họa 2018 | JOBNOW',
          description: 'Có 300+ việc làm Thiết kế đồ họa  (Cần tuyển gấp) lương cao Từ các công ty tuyển dụng Thiết kế đồ họa hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '',
          url: 'viec-lam-moi-truong-xu-ly-chat-thai',
          heading: language.seo.categories.treatment.heading,
          title: 'Tìm việc đi làm ngay việc làm Môi trường/Xử lý chất thải  2018 | JOBNOW',
          description: 'Có 100+ việc làm Môi trường/Xử lý chất thải  (Cần tuyển gấp) lương cao. Từ các công ty tuyển dụng hàng đầu đăng tuyển. Mới nhất tại JOBNOW '
        },
        {
          id: '5ba9de1b74a4d74b92bc4530',
          url: 'viec-lam-kinh-doanh-ban-hang',
          heading: language.seo.categories.sell.heading,
          title: 'Tuyển dụng việc làm Nhân viên Kinh Doanh/Bán Hàng | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Nhân viên Kinh Doanh/Bán Hàng . Gần nhà ngay tại khu vực sinh sống . Có 1000+ việc làm tại JOBNOW'
        },
        {
          id: '5ba9de5874a4d74b92bc4535',
          url: 'viec-lam-hanh-chinh-van-phong',
          heading: language.seo.categories.administration.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Hành chính văn phòng | JOBNOW',
          description: 'Hơn 450+ Viêc làm nhân viên Hành Chính Văn Phòng. Lương cao môi trường phúc lợi hấp dẫn đang chờ ứng tuyển tại JOBNOW'
        },
        {
          id: '5ba9de6274a4d74b92bc4536',
          url: 'viec-lam-marketing-pr',
          heading: language.seo.categories.recruiter.heading,
          title: 'Tuyển dụng đi làm ngay việc làm chuyên viên Marketing/Pr | JOBNOW',
          description: 'Hơn 650+ Viêc làm Chuyên viên Marketing/PR. Lương cao(8-10tr) môi trường phúc lợi hấp dẫn. Đang chờ ứng tuyển tại JOBNOW'
        },
        {
          id: '5bac4866f878a6220b1a7832',
          url: 'viec-lam-giao-duc-dao-tao',
          heading: language.seo.categories.education.heading,
          title: 'Tuyển dụng đi làm ngay việc làm Giáo dục- Đào tạo 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Giáo dục-Đào tạo . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5ba9dea074a4d74b92bc4539',
          url: 'viec-lam-co-khi-che-tao',
          heading: language.seo.categories.mechanical.heading,
          title: 'Tuyển dụng đi làm ngay việc làm Cơ Khí/Chế Tạo 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Cơ khí/Chế tạo . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac48a6f878a6220b1a7838',
          url: 'viec-lam-nhan-vien-ky-thuat',
          heading: language.seo.categories.technicians.heading,
          title: 'Tuyển dụng đi làm ngay việc làm Nhân viên kỹ thuật 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Nhân viên Kỹ Thuật . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac4a69f878a6220b1a785a',
          url: 'viec-lam-thu-ky-tro-ly',
          heading: language.seo.categories.secretary.heading,
          title: 'Tuyển dụng đi làm ngay việc làm Thư ký trợ lý 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Thư Ký Trợ Lý Giám Đốc . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac605f6b8e2325772953b8',
          url: 'viec-lam-dien-tu-truyen-thong',
          heading: language.seo.categories.communication.heading,
          title: 'Tuyển dụng đi làm ngay việc làm Điện tử truyển thông 11/2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Điện Tử Truyền Thông . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac4a31f878a6220b1a7858',
          url: 'viec-lam-it-phan-cung',
          heading: language.seo.categories.hardware.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm IT-Phần Cứng/Mạng | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm IT-Phần Cứng/Mạng . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac60986b8e2325772953bd',
          url: 'viec-lam-du-lich-khach-san',
          heading: language.seo.categories.travel.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Du Lịch Khách Sạn | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Du Lịch Khách Sạn . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac60866b8e2325772953bb',
          url: 'viec-lam-phap-ly-luat',
          heading: language.seo.categories.law.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Pháp Lý/Luật 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Chuyên ngành Luật/Pháp lý . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển ngay tại JOBNOW '
        },
        {
          id: '5bac60c66b8e2325772953c1',
          url: 'viec-lam-o-to-xe-may',
          heading: language.seo.categories.motorbike.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Ô Tô/ Xe Máy 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Ô Tô/ Xe Máy. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac60ba6b8e2325772953c0',
          url: 'viec-lam-hoa-hoc-sinh-hoc',
          heading: language.seo.categories.chemistry.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Hóa Học/Sinh Học | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Hóa Học/Sinh Học. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac61036b8e2325772953c6',
          url: 'viec-lam-my-pham-trang-suc',
          heading: language.seo.categories.jewelry.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Mỹ Phẩm/Trang Sức | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Mỹ Phẩm/Trang Sức. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac613e6b8e2325772953cc',
          url: 'viec-lam-bao-ve-an-ninh',
          heading: language.seo.categories.security.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Bảo vệ an ninh/Vệ sĩ | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Bảo vệ an ninh/Vệ sĩ. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac611d6b8e2325772953c8',
          url: 'viec-lam-nong-lam-ngu-nghiep',
          heading: language.seo.categories.farmer.heading,
          title: 'Tuyển dụng đi làm ngay việc làm Nông/Lâm/Ngư Nghiệp | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Nông/Lâm/Ngư Nghiệp. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bad94e5fcc5ec3813719c66',
          url: 'viec-lam-quan-ly-dieu-hanh',
          heading: language.seo.categories.executive.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Quản lý/Điều hành | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Quản lý/Điều hành . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bac61596b8e2325772953cf',
          url: 'viec-lam-to-chuc-su-kien',
          heading: language.seo.categories.even.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Tổ Chức Sự Kiện | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Tổ Chức Sự Kiện/Quà Tặng . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển với 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bad94dcfcc5ec3813719c65',
          url: 'viec-lam-lao-dong-pho-thong',
          heading: language.seo.categories.labor.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Lao động phổ thông | JOBNOW',
          description: 'Tuyển dụng tìm việc làm lao động phổ thông Lương cao (7-10 tr) môi trường phúc lợi tốt. Ứng tuyển nhận việc làm ngay tại JOBNOW.COM.VN'
        },
        {
          id: '5bb326a00113f31c10ce0de5',
          url: 'viec-lam-pb-pg-le-tan',
          heading: language.seo.categories.receptionist.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm PB/PG/Lễ Tân 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm PB/PG/Lễ Tân 2018. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển với 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bb194edf0c200661edc6272',
          url: 'viec-lam-lai-xe',
          heading: language.seo.categories.diver.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Lái Xe 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Lái Xe 2018. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển với 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bb3439e49b2af1faa66a33c',
          url: 'viec-lam-hang-gia-dung',
          heading: language.seo.categories.household.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc làm Hàng Gia Dụng 2018 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Hàng Gia Dụng 2018. Gần nhà ngay tại khu vực sinh sống. Ứng tuyển với 25.000+ việc làm tại JOBNOW'
        }
      ],
      provinces: [
        {
          id: '5bab55c0a6ea74192e76e1e3',
          url: 'viec-lam-tai-an-giang',
          heading: language.seo.provinces.angiang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại An Giang 2019 | JOBNOW',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm An Giang mới nhất . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e399',
          url: 'viec-lam-tai-can-tho',
          heading: language.seo.provinces.cantho.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Cần Thơ 2019 |JOBNOW ',
          description: 'Tuyển gấp lương thưởng hấp dẫn việc làm Cần Thơ mới nhất . Gần nhà ngay tại khu vực sinh sống. Ứng tuyển tiếp cận 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e332',
          url: 'viec-lam-tai-binh-thuan',
          heading: language.seo.provinces.binhthuan.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bình Thuận 2019 |JOBNOW ',
          description: 'Sàn giao dịch việc làm Bình Thuận - Tìm việc làm tại Bình Thuận mới nhất. Đăng tin tuyển dụng Bình Thuận miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c1a6ea74192e76e442',
          url: 'viec-lam-tai-dong-thap',
          heading: language.seo.provinces.dongthap.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đồng Tháp 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đồng Tháp - Tìm việc làm tại Đồng Tháp mới nhất. Đăng tin tuyển dụng Đồng Tháp miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '',
          url: 'viec-lam-tai-bac-ninh',
          heading: language.seo.provinces.bacninh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bắc Ninh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bắc Ninh - Tìm việc làm tại Bắc Ninh mới nhất. Đăng tin tuyển dụng Bắc Ninh miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e219',
          url: 'viec-lam-tai-hung-yen',
          heading: language.seo.provinces.hungyen.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hưng Yên 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hưng Yên - Tìm việc làm tại Hưng Yên mới nhất. Đăng tin tuyển dụng Hưng Yên miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c1a6ea74192e76e33d',
          url: 'viec-lam-tai-hai-phong',
          heading: language.seo.provinces.haiphong.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hải Phòng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hải Phòng - Tìm việc làm tại Hải Phòng mới nhất. Đăng tin tuyển dụng Hải Phòng miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e25f',
          url: 'viec-lam-tai-ha-noi',
          heading: language.seo.provinces.hanoi.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hà Nội  2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hà Nội - Tìm việc làm tại Hà Nội mới nhất. Đăng tin tuyển dụng Hà Nội miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e2f4',
          url: 'viec-lam-tai-son-la',
          heading: language.seo.provinces.sonla.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Sơn La 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Sơn La - Tìm việc làm tại Sơn La mới nhất. Đăng tin tuyển dụng Sơn La miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e20d',
          url: 'viec-lam-tai-binh-phuoc',
          heading: language.seo.provinces.binhphuoc.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bình Phước 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bình Phước - Tìm việc làm tại Bình Phước mới nhất. Đăng tin tuyển dụng Bình Phước miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e23e',
          url: 'viec-lam-tai-quang-tri',
          heading: language.seo.provinces.quangtri.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Trị 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Trị - Tìm việc làm tại Quảng Trị mới nhất. Đăng tin tuyển dụng Quảng Trị miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c1a6ea74192e76e3a3',
          url: 'viec-lam-tai-thua-thien-hue',
          heading: language.seo.provinces.hue.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Thừa Thiên Huế 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Thừa Thiên Huế - Tìm việc làm tại Thừa Thiên Huế mới nhất. Đăng tin tuyển dụng Thừa Thiên Huế miễn phí – Tại Jobnow.com.vn'
        },
        {
          id: '',
          url: 'viec-lam-tai-thai-nguyen',
          heading: language.seo.provinces.thainguyen.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Thái Nguyên 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Thái Nguyên - Tìm việc làm tại Thái Nguyên mới nhất. Đăng tin tuyển dụng Thái Nguyên miễn phí – Tại Jobnow.com.vn'
        },
        {
          id: '5bab55c0a6ea74192e76e1ef',
          url: 'viec-lam-tai-kon-tum',
          heading: language.seo.provinces.kontum.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Kon Tum 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Kon Tum - Tìm việc làm tại Kon Tum mới nhất. Đăng tin tuyển dụng Kon Tum miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c1a6ea74192e76e43a',
          url: 'viec-lam-tai-ninh-thuan',
          heading: language.seo.provinces.ninhthuan.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Ninh Thuận 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Ninh Thuận - Tìm việc làm tại Ninh Thuận mới nhất. Đăng tin tuyển dụng Ninh Thuận miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e2bd',
          url: 'viec-lam-tai-kien-giang',
          heading: language.seo.provinces.kiengiang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Kiên Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Kiên Giang - Tìm việc làm tại Kiên Giang mới nhất. Đăng tin tuyển dụng Kiên Giang miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e202',
          url: 'viec-lam-tai-soc-trang',
          heading: language.seo.provinces.soctrang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Sóc Trăng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Sóc Trăng - Tìm việc làm tại Sóc Trăng mới nhất. Đăng tin tuyển dụng Sóc Trăng miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '',
          url: 'viec-lam-tai-ha-nam',
          heading: language.seo.provinces.hanam.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hà Nam 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hà Nam - Tìm việc làm tại Hà Nam mới nhất. Đăng tin tuyển dụng Hà Nam miễn phí – Hàng ngàn hồ sơ ứng viên chất lượng '
        },
        {
          id: '5bab55c0a6ea74192e76e250',
          url: 'viec-lam-tai-quang-ngai',
          heading: language.seo.provinces.quangngai.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Ngãi 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Ngãi - Tìm việc làm tại Quảng Ngãi mới nhất. Đăng tin tuyển dụng Quảng Ngãi miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW '
        },
        {
          id: '',
          url: 'viec-lam-tai-quang-binh',
          heading: language.seo.provinces.quangbinh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Bình  2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Bình  - Tìm việc làm tại Quảng Bình  mới nhất. Đăng tin tuyển dụng Quảng Bình  miễn phí –Ứng tuyển 25.000+ việc làm tại JOBNOW '
        },
        {
          id: '5bab55c0a6ea74192e76e2d6',
          url: 'viec-lam-tai-phu-yen',
          heading: language.seo.provinces.phuyen.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Phú Yên 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Phú Yên - Tìm việc làm tại Phú Yên mới nhất. Đăng tin tuyển dụng Phú Yên miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e37d',
          url: 'viec-lam-tai-ba-ria-vung-tau',
          heading: language.seo.provinces.vungtau.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bà Rịa Vũng Tàu 2019 | JOBNOW',
          description: 'Tìm việc làm tại Bà Rịa Vũng Tàu mới nhất. Đăng tin tuyển dụng Bà Rịa Vũng Tàu miễn phí – Ứng tuyển ngay với 25.000+ việc làm tại JOBNOW.COM.VN '
        },
        {
          id: '5bab55c1a6ea74192e76e38f',
          url: 'viec-lam-tai-binh-duong',
          heading: language.seo.provinces.binhduong.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bình Dương 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bình Dương - Tìm việc làm tại Bình Dương mới nhất. Đăng tin tuyển dụng Bình Dương miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e328',
          url: 'viec-lam-tai-khanh-hoa',
          heading: language.seo.provinces.khanhhoa.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Khánh Hòa 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Khánh Hòa - Tìm việc làm tại Khánh Hòa mới nhất. Đăng tin tuyển dụng Khánh Hòa miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e35f',
          url: 'viec-lam-tai-gia-lai',
          heading: language.seo.provinces.gialai.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Gia Lai 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Gia Lai - Tìm việc làm tại Gia Lai mới nhất. Đăng tin tuyển dụng Gia Lai miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3c4',
          url: 'viec-lam-tai-dien-bien',
          heading: language.seo.provinces.dienbien.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Điện Biên 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Điện Biên - Tìm việc làm tại Điện Biên mới nhất. Đăng tin tuyển dụng Điện Biên miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e224',
          url: 'viec-lam-tai-thanh-hoa',
          heading: language.seo.provinces.thanhhoa.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Thanh Hóa 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Thanh Hóa - Tìm việc làm tại Thanh Hóa mới nhất. Đăng tin tuyển dụng Thanh Hóa miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e2aa',
          url: 'viec-lam-tai-nghe-an',
          heading: language.seo.provinces.nghean.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Nghệ An 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Nghệ An - Tìm việc làm tại Nghệ An mới nhất. Đăng tin tuyển dụng Nghệ An miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-ha-tinh',
          heading: language.seo.provinces.hatinh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hà Tĩnh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hà Tĩnh - Tìm việc làm tại Hà Tĩnh mới nhất. Đăng tin tuyển dụng Hà Tĩnh miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-thai-binh',
          heading: language.seo.provinces.thaibinh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Thái Bình 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Thái Bình - Tìm việc làm tại Thái Bình mới nhất. Đăng tin tuyển dụng Thái Bình miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e248',
          url: 'viec-lam-tai-tuyen-quang',
          heading: language.seo.provinces.tuyenquang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Tuyên Quang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Tuyên Quang - Tìm việc làm tại Tuyên Quang mới nhất. Đăng tin tuyển dụng Tuyên Quang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3d9',
          url: 'viec-lam-tai-quang-nam',
          heading: language.seo.provinces.quangnam.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Nam 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Nam - Tìm việc làm tại Quảng Nam mới nhất. Đăng tin tuyển dụng Quảng Nam miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e412',
          url: 'viec-lam-tai-bac-lieu',
          heading: language.seo.provinces.baclieu.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bạc Liêu 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bạc Liêu - Tìm việc làm tại Bạc Liêu mới nhất. Đăng tin tuyển dụng Bạc Liêu miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-bac-kan',
          heading: language.seo.provinces.bacKan.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bắc Kạn 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bắc Kạn - Tìm việc làm tại Bắc Kạn mới nhất. Đăng tin tuyển dụng Bắc Kạn miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e1f9',
          url: 'viec-lam-tai-dak-nong',
          heading: language.seo.provinces.daknong.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đắk Nông 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đắk Nông - Tìm việc làm tại Đắk Nông mới nhất. Đăng tin tuyển dụng Đắk Nông miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-cao-bang',
          heading: language.seo.provinces.coabang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Cao Bằng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Cao Bằng - Tìm việc làm tại Cao Bằng mới nhất. Đăng tin tuyển dụng Cao Bằng miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e385',
          url: 'viec-lam-tai-ca-mau',
          heading: language.seo.provinces.camau.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Cà Mau  2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Cà Mau  - Tìm việc làm tại Cà Mau  mới nhất. Đăng tin tuyển dụng Cà Mau  miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e27e',
          url: 'viec-lam-tai-lao-cai',
          heading: language.seo.provinces.laocai.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Lào Cai 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Lào Cai - Tìm việc làm tại Lào Cai mới nhất. Đăng tin tuyển dụng Lào Cai miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e2e0',
          url: 'viec-lam-tai-lang-son',
          heading: language.seo.provinces.langson.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Lạng Sơn 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Lạng Sơn - Tìm việc làm tại Lạng Sơn mới nhất. Đăng tin tuyển dụng Lạng Sơn miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-quang-ninh',
          heading: language.seo.provinces.quangninh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Quảng Ninh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Quảng Ninh - Tìm việc làm tại Quảng Ninh mới nhất. Đăng tin tuyển dụng Quảng Ninh miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e288',
          url: 'viec-lam-tai-vinh-long',
          heading: language.seo.provinces.vinhlong.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Vĩnh Long 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Vĩnh Long - Tìm việc làm tại Vĩnh Long mới nhất. Đăng tin tuyển dụng Vĩnh Long miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3b9',
          url: 'viec-lam-tai-tien-giang',
          heading: language.seo.provinces.tiengiang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Tiền Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Tiền Giang - Tìm việc làm tại Tiền Giang mới nhất. Đăng tin tuyển dụng Tiền Giang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-bac-giang',
          heading: language.seo.provinces.bacgiang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bắc Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bắc Giang - Tìm việc làm tại Bắc Giang mới nhất. Đăng tin tuyển dụng Bắc Giang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e2cb',
          url: 'viec-lam-tai-ha-giang',
          heading: language.seo.provinces.hagiang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hà Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hà Giang - Tìm việc làm tại Hà Giang mới nhất. Đăng tin tuyển dụng Hà Giang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e29e',
          url: 'viec-lam-tai-binh-dinh',
          heading: language.seo.provinces.binhdinh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bình Định 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bình Định - Tìm việc làm tại Bình Định mới nhất. Đăng tin tuyển dụng Bình Định miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e477',
          url: 'viec-lam-tai-phu-tho',
          heading: language.seo.provinces.phutho.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Phú Thọ 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Phú Thọ - Tìm việc làm tại Phú Thọ mới nhất. Đăng tin tuyển dụng Phú Thọ miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e405',
          url: 'viec-lam-tai-hai-duong',
          heading: language.seo.provinces.haiduong.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hải Dương 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hải Dương - Tìm việc làm tại Hải Dương mới nhất. Đăng tin tuyển dụng Hải Dương miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e2ec',
          url: 'viec-lam-tai-da-nang',
          heading: language.seo.provinces.danang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đà Nẵng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đà Nẵng - Tìm việc làm tại Đà Nẵng mới nhất. Đăng tin tuyển dụng Đà Nẵng miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e34c',
          url: 'viec-lam-tai-ninh-binh',
          heading: language.seo.provinces.ninhbinh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Ninh Bình 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Ninh Bình - Tìm việc làm tại Ninh Bình mới nhất. Đăng tin tuyển dụng Ninh Bình miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-long-an',
          heading: language.seo.provinces.longan.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Long An 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Long An - Tìm việc làm tại Long An mới nhất. Đăng tin tuyển dụng Long An miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e315',
          url: 'viec-lam-tai-lai-chau',
          heading: language.seo.provinces.laichau.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Lai Châu 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Lai Châu - Tìm việc làm tại Lai Châu mới nhất. Đăng tin tuyển dụng Lai Châu miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e355',
          url: 'viec-lam-tai-yen-bai',
          heading: language.seo.provinces.yenbai.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Yên Bái 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Yên Bái - Tìm việc làm tại Yên Bái mới nhất. Đăng tin tuyển dụng Yên Bái miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3ec',
          url: 'viec-lam-tai-dak-lak',
          heading: language.seo.provinces.daklak.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đắk Lắk 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đắk Lắk - Tìm việc làm tại Đắk Lắk mới nhất. Đăng tin tuyển dụng Đắk Lắk miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e31e',
          url: 'viec-lam-tai-ben-tre',
          heading: language.seo.provinces.bentre.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Bến Tre 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Bến Tre - Tìm việc làm tại Bến Tre mới nhất. Đăng tin tuyển dụng Bến Tre miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3ad',
          url: 'viec-lam-tai-dong-nai',
          heading: language.seo.provinces.dongnai.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Đồng Nai 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Đồng Nai - Tìm việc làm tại Đồng Nai mới nhất. Đăng tin tuyển dụng Đồng Nai miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-ho-chi-minh',
          heading: language.seo.provinces.hochiminh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại TP.HCM 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm TP. HCM - Tìm việc làm tại TP. Hồ Chí Minh mới nhất. Đăng tin tuyển dụng TP.HCM miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e371',
          url: 'viec-lam-tai-hoa-binh',
          heading: language.seo.provinces.hoabinh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hòa Bình 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hòa Bình  - Tìm việc làm tại Hòa Bình  mới nhất. Đăng tin tuyển dụng Hòa Bình  miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '',
          url: 'viec-lam-tai-hau-giang',
          heading: language.seo.provinces.haugiang.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Hậu Giang 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Hậu Giang - Tìm việc làm tại Hậu Giang mới nhất. Đăng tin tuyển dụng Hậu Giang miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e30a',
          url: 'viec-lam-tai-nam-dinh',
          heading: language.seo.provinces.namdinh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Nam Định 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Nam Định - Tìm việc làm tại Nam Định mới nhất. Đăng tin tuyển dụng Nam Định miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e3cf',
          url: 'viec-lam-tai-vinh-phuc',
          heading: language.seo.provinces.vinhphuc.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Vĩnh Phúc 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Vĩnh Phúc - Tìm việc làm tại Vĩnh Phúc mới nhất. Đăng tin tuyển dụng Vĩnh Phúc miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e291',
          url: 'viec-lam-tai-lam-dong',
          heading: language.seo.provinces.lamdong.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Lâm Đồng 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Lâm Đồng - Tìm việc làm tại Lâm Đồng mới nhất. Đăng tin tuyển dụng Lâm Đồng miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c1a6ea74192e76e41a',
          url: 'viec-lam-tai-tra-vinh',
          heading: language.seo.provinces.travinh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Trà Vinh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Trà Vinh  - Tìm việc làm tại Trà Vinh  mới nhất. Đăng tin tuyển dụng Trà Vinh  miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        },
        {
          id: '5bab55c0a6ea74192e76e301',
          url: 'viec-lam-tai-tay-ninh',
          heading: language.seo.provinces.tayninh.heading,
          title: 'Tuyển dụng nhanh đi làm ngay việc tại Tây Ninh 2019 | JOBNOW',
          description: 'Sàn giao dịch việc làm Tây Ninh - Tìm việc làm tại Tây Ninh mới nhất. Đăng tin tuyển dụng Tây Ninh miễn phí – Ứng tuyển 25.000+ việc làm tại JOBNOW'
        }
      ],
      others: [
        {
          url: 'tim-viec-gan-nha',
          heading: language.seo.other.nerhouse.heading,
          title: 'Việc làm quanh đây, việc làm nhà cập nhật theo vị trí tốt nhất | JOBNOW',
          description: 'Jobnow mạng việc làm tuyển dụng với công nghệ tìm việc theo định vị giúp ứng viej đễ dàng tìm được công việc gần nhà tại nơi đang sinh sống'
        },
        {
          url: 'viec-lam-hap-dan',
          heading: language.seo.other.attractivejobs.heading,
          title: 'Việc làm hấp dẫn Lương cao chế độ đãi ngộ tốt mới nhất 2018 | JOBNOW',
          description: 'Xem ngay 4.376 Việc làm hấp dẫn lương cao được cập nhật mỗi ngày tại JOBNOW'
        },
        {
          url: 'viec-lam-tuyen-gap',
          heading: language.seo.other.flashjob.heading,
          title: '3000+ Việc làm tuyển gấp đi làm ngay uy tín chất lượng | JOBNOW',
          description: 'Tuyển dụng đi làm ngay với 5.383 Việc làm đang cần tuyển gấp - JOBNOW'
        },
        {
          url: 'viec-lam-moi-nhat',
          heading: language.seo.other.newjob.heading,
          title: 'Cập nhật 1000+ việc làm mới nhất chất lượng cao mỗi ngày | JOBNOW',
          description: 'Với hàng nghìn việc làm mới nhất \'Lương cao\' được cập nhật mỗi ngày tại - JOBNOW.COM.VN'
        },
        {
          url: 'flash-jobs',
          heading: language.seo.other.quickjob.heading,
          title: 'FLASH JOBS tuyển dụng tìm việc nhanh chỉ với 30 phút',
          description: 'Flash Job là một tính năng nổi bật của JobNow giúp cho việc tuyển dụng và tìm việc nhanh chóng trong vòng 30 phút. Trải nghiệm ngay'
        },
        {
          url: 'tim-viec-lam-theo-dia-diem',
          heading: language.seo.other.joblocation.heading,
          title: 'Kênh Tuyển dụng, tìm việc làm nhanh uy tín mới nhất  2018 | JOBNOW',
          description: 'Với 1000+ việc làm mới được cập nhật mỗi ngày tại JOBNOW theo từng khu vực sinh sống giúp ứng viên dễ dàng tìm được công việc phù hợp nhất.'
        },
        {
          url: 'tim-viec-lam',
          heading: language.seo.other.category.heading,
          title: 'Tuyển dụng , tìm việc làm nhanh theo ngành nghề | JOBNOW',
          description: 'Tìm kiếm nhanh tất cả công việc theo ngành nghề tại  JOBNOW với hơn 1000+ việc làm mới,lương cao môi trường hấp dẫn được cập nhật mỗi ngày .'
        }
      ]
    };
    return str;
  }
}
