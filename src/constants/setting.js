import React, { Component } from 'react';
import language from '../config/language/index';

export default class Setting extends Component {
  static creatSetting = () => {
    let str = {
      billing_information: {
        test: language.components.AddressInput.index.citiesOpts.all,
        account_holder: 'CÔNG TY CỔ PHẦN ADT QUỐC TẾ',
        account_number: '0711000250468',
        bank: 'Vietcombank - Chi nhánh Thanh Xuân - Hà Nội'
      },
      companies: {
        size: {
          1: 'Dưới 10 người',
          2: 'Từ 10 đến 50 người',
          3: 'Từ 50 đến 100 người',
          4: 'Từ 100 đến 200 người',
          5: 'Từ 200 đến 300 người',
          6: 'Từ 300 đến 500 người',
          7: 'Trên 500 người'
        }
      },
      employer_save_profiles: {
        1: 'Chưa liên hệ',
        2: 'Đã liên hệ',
        3: 'Đã test',
        4: 'Đã phỏng vấn',
        5: 'Trúng tuyển',
        6: 'Không trúng'
      },
      job_applications: {
        comment_status: {
          1: 'Đủ điều kiện',
          2: 'Không đủ điều kiện'
        },
        status: {
          1: 'Chưa liên hệ',
          2: 'Đã liên hệ',
          3: 'Đã lên lịch phỏng vấn',
          4: 'Đã phỏng vấn',
          5: 'Đã có việc',
          6: 'Đã từ chối'
        }
      },
      jobs: {
        experience: {
          1: 'Chưa có kinh nghiệm',
          2: 'Dưới 1 năm',
          3: '1 năm',
          4: '2 năm',
          5: '3 năm',
          6: '4 năm',
          7: '5 năm',
          8: 'Trên 5 năm'
        },
        gender: {
          female: 'Nữ',
          male: 'Nam',
          male_female: 'Không yêu cầu'
        },
        level: {
          1: 'Trên đại học',
          2: 'Đại học',
          3: 'Cao đẳng',
          4: 'Trung cấp',
          5: 'Trung học',
          6: 'Chứng chỉ nghề',
          7: 'Không yêu cầu bằng cấp'
        },
        rank: {
          1: 'Quản lý cấp cao',
          2: 'Quản lý cấp trung',
          3: 'Quản lý nhóm - giám sát',
          4: 'Chuyên gia',
          5: 'Chuyên viên - Nhân viên',
          6: 'Cộng tác viên'
        },
        salary: {
          1: '1 - 3 triệu',
          2: '3 - 5 triệu',
          3: '5 - 7 triệu',
          4: '7 - 10 triệu',
          5: '10 - 15 triệu',
          6: '15 - 20 triệu',
          7: '20 - 30 triệu',
          8: '30 - 40 triệu',
          9: '40 - 50 triệu',
          10: 'Trên 50 triệu',
          11: 'Thoả thuận'
        },
        source: {
          affiliate: 'affiliate',
          google: 'google',
          marketing: 'marketing',
          sale: 'sale'
        },
        status: {
          active: 'Đang tuyển',
          expires: 'Đã hết hạn',
          hide: 'Đang ẩn',
          pending: 'Chờ xét duyệt'
        },
        type: {
          1: 'Toàn thời gian',
          2: 'Bán thời gian',
          3: 'Theo hợp đồng',
          4: 'Thực tập',
          5: 'Khác'
        },
        view_type: {
          full: 'Mẫu tin đầy đủ',
          standard: 'Mẫu tin cơ bản'
        }
      },
      order: {
        payment_methods: {
          1: 'Chuyển khoản ngân hàng',
          2: 'Thanh toán bằng Paypal',
          3: 'Thẻ ATM nội địa, Internet Banking',
          4: 'Thanh toán bằng thẻ quốc tế Visa, Master, JSB'
        },
        status: {
          cancelled: 'cancelled',
          completed: 'completed',
          failed: 'failed',
          on_hold: 'on hold',
          pending_payment: 'pending payment',
          processing: 'processing',
          refunded: 'refunded'
        }
      },
      products: {
        package: {
          1: 'Gói đăng tin',
          2: 'Gói lọc hồ sơ',
          3: 'Gói marketing'
        },
        status: {
          active: 'active',
          pending: 'pending'
        }
      },
      resumes: {
        classification: {
          1: 'Xuất sắc',
          2: 'Giỏi',
          3: 'Khá',
          4: 'Trung bình khá',
          5: 'Trung bình'
        },
        experience: {
          1: 'Chưa có kinh nghiệm',
          2: 'Dưới 1 năm',
          3: '1 năm',
          4: '2 năm',
          5: '3 năm',
          6: '4 năm',
          7: '5 năm',
          8: 'Trên 5 năm'
        },
        gender: {
          female: 'Nữ',
          male: 'Nam',
          male_female: 'Nam và Nữ'
        },
        languages: {
          1: 'Tiếng Anh',
          2: 'Tiếng Nhật',
          3: 'Tiếng Pháp',
          4: 'Tiếng Trung',
          5: 'Tiếng Nga',
          6: 'Tiếng Hàn',
          7: 'Tiếng Đức',
          8: 'Tiếng Ý',
          9: 'Tiếng Ả Rập',
          10: 'Ngoại ngữ khác'
        },
        languages_level: {
          1: 'Tốt',
          2: 'Khá',
          3: 'Trung bình',
          4: 'Kém'
        },
        level: {
          1: 'Phổ thông',
          2: 'Trung cấp',
          3: 'Chứng chỉ',
          4: 'Cao đẳng',
          5: 'Đại học',
          6: 'Trên đại học'
        },
        marital_status: {
          1: 'Độc thân',
          2: 'Có gia đình'
        },
        rank: {
          1: 'Quản lý cấp cao',
          2: 'Quản lý cấp trung',
          3: 'Quản lý nhóm - giám sát',
          4: 'Chuyên gia',
          5: 'Chuyên viên - Nhân viên',
          6: 'Cộng tác viên'
        },
        resume_type: {
          1: 'Bán thời gian',
          2: 'Freelance',
          3: 'Thời vụ',
          4: 'Thực tập sinh',
          5: 'Toàn thời gian',
          6: 'Việc làm Online'
        },
        salary: {
          1: '1 - 3 triệu',
          2: '3 - 5 triệu',
          3: '5 - 7 triệu',
          4: '7 - 10 triệu',
          5: '10 - 15 triệu',
          6: '15 - 20 triệu',
          7: '20 - 30 triệu',
          8: '30 - 40 triệu',
          9: '40 - 50 triệu',
          10: 'Trên 50 triệu',
          11: 'Thoả thuận'
        },
        status: {
          active: 'active',
          hide: 'hide',
          pending: 'pending'
        },
        type: {
          0: 'Tạo từng bước',
          1: 'Upload CV'
        },
        years: {
          1970: '1970',
          1971: '1971',
          1972: '1972',
          1973: '1973',
          1974: '1974',
          1975: '1975',
          1976: '1976',
          1977: '1977',
          1978: '1979',
          1979: '1979',
          1980: '1980',
          1981: '1981',
          1982: '1982',
          1983: '1983',
          1984: '1984',
          1985: '1985',
          1986: '1986',
          1987: '1987',
          1988: '1988',
          1989: '1989',
          1990: '1990',
          1991: '1991',
          1992: '1992',
          1993: '1993',
          1994: '1994',
          1995: '1995',
          1996: '1996',
          1997: '1997',
          1998: '1998',
          1999: '1999',
          2000: '2000',
          2001: '2001',
          2002: '2002',
          2003: '2003',
          2004: '2004',
          2005: '2005',
          2006: '2006'
        }
      },
      users: {
        gender: {
          female: 'Nữ',
          male: 'Nam',
          male_female: 'Nam và Nữ'
        },
        level: {
          1: 'Phổ thông',
          2: 'Trung cấp',
          3: 'Chứng chỉ',
          4: 'Cao đẳng',
          5: 'Đại học',
          6: 'Trên đại học'
        },
        marital_status: {
          1: 'Độc thân',
          2: 'Có gia đình'
        },
        role: {
          admin: 'admin',
          candidate: 'candidate',
          employer: 'employer',
          support: 'support'
        },
        status: {
          active: 'active',
          block: 'block',
          pending: 'pending'
        }
      }
    };
    return str;
  }
}