import React, { Component } from 'react';
import language from '../config/language/index';

export default class Setting extends Component {
  static creatSetting = () => {
    let str = {
      billing_information: {
        test: language.components.AddressInput.citiesOpts.all,
        account_holder: 'CÔNG TY CỔ PHẦN ADT QUỐC TẾ',
        account_number: '0711000250468',
        bank: 'Vietcombank - Chi nhánh Thanh Xuân - Hà Nội'
      },
      companies: {
        size: {
          1: language.setting.companies.size.size1,
          2: language.setting.companies.size.size2,
          3: language.setting.companies.size.size3,
          4: language.setting.companies.size.size4,
          5: language.setting.companies.size.size5,
          6: language.setting.companies.size.size6,
          7: language.setting.companies.size.size7
        }
      },
      employer_save_profiles: {
        1: language.setting.employersaveprofiles.status1,
        2: language.setting.employersaveprofiles.status2,
        3: language.setting.employersaveprofiles.status3,
        4: language.setting.employersaveprofiles.status4,
        5: language.setting.employersaveprofiles.status5,
        6: language.setting.employersaveprofiles.status6
      },
      job_applications: {
        comment_status: {
          1: language.setting.jobApplications.comment_status.status1,
          2: language.setting.jobApplications.comment_status.status2
        },
        status: {
          1: language.setting.jobApplications.status.status1,
          2: language.setting.jobApplications.status.status2,
          3: language.setting.jobApplications.status.status3,
          4: language.setting.jobApplications.status.status4,
          5: language.setting.jobApplications.status.status5,
          6: language.setting.jobApplications.status.status6
        }
      },
      jobs: {
        experience: {
          1: language.setting.jobs.experience.experience1,
          2: language.setting.jobs.experience.experience2,
          3: language.setting.jobs.experience.experience3,
          4: language.setting.jobs.experience.experience4,
          5: language.setting.jobs.experience.experience5,
          6: language.setting.jobs.experience.experience6,
          7: language.setting.jobs.experience.experience7,
          8: language.setting.jobs.experience.experience8,
        },
        gender: {
          female: language.setting.jobs.gender.female,
          male: language.setting.jobs.gender.male,
          male_female: language.setting.jobs.gender.male_female,
        },
        level: {
          1: language.setting.jobs.level.level1,
          2: language.setting.jobs.level.level2,
          3: language.setting.jobs.level.level3,
          4: language.setting.jobs.level.level4,
          5: language.setting.jobs.level.level5,
          6: language.setting.jobs.level.level6,
          7: language.setting.jobs.level.level7
        },
        rank: {
          1: language.setting.jobs.rank.rank1,
          2: language.setting.jobs.rank.rank2,
          3: language.setting.jobs.rank.rank3,
          4: language.setting.jobs.rank.rank4,
          5: language.setting.jobs.rank.rank5,
          6: language.setting.jobs.rank.rank6
        },
        salary: {
          1: language.setting.jobs.salary.salary1,
          2: language.setting.jobs.salary.salary2,
          3: language.setting.jobs.salary.salary3,
          4: language.setting.jobs.salary.salary4,
          5: language.setting.jobs.salary.salary5,
          6: language.setting.jobs.salary.salary6,
          7: language.setting.jobs.salary.salary7,
          8: language.setting.jobs.salary.salary8,
          9: language.setting.jobs.salary.salary9,
          10: language.setting.jobs.salary.salary10,
          11: language.setting.jobs.salary.salary11,
        },
        source: {
          affiliate: 'affiliate',
          google: 'google',
          marketing: 'marketing',
          sale: 'sale'
        },
        status: {
          active: language.setting.jobs.status.active,
          expires: language.setting.jobs.status.expires,
          hide: language.setting.jobs.status.hide,
          pending: language.setting.jobs.status.pending
        },
        type: {
          1: language.setting.jobs.type.type1,
          2: language.setting.jobs.type.type2,
          3: language.setting.jobs.type.type3,
          4: language.setting.jobs.type.type4,
          5: language.setting.jobs.type.type5
        },
        view_type: {
          full: language.setting.jobs.viewType.full,
          standard: language.setting.jobs.viewType.full
        }
      },
      order: {
        payment_methods: {
          1: language.setting.order.paymentMethods.payment1,
          2: language.setting.order.paymentMethods.payment2,
          3: language.setting.order.paymentMethods.payment3,
          4: language.setting.order.paymentMethods.payment4,
        },
        status: {
          cancelled: language.setting.order.status.cancelled,
          completed: language.setting.order.status.completed,
          failed: language.setting.order.status.failed,
          on_hold: language.setting.order.status.on_hold,
          pending_payment: language.setting.order.status.pending_payment,
          processing: language.setting.order.status.processing,
          refunded: language.setting.order.status.refunded
        }
      },
      products: {
        package: {
          1: language.setting.products.package.package1,
          2: language.setting.products.package.package2,
          3: language.setting.products.package.package3
        },
        status: {
          active: language.setting.products.status.active,
          pending: language.setting.products.status.pending
        }
      },
      resumes: {
        classification: {
          1: language.setting.resumes.classification.classification1,
          2: language.setting.resumes.classification.classification2,
          3: language.setting.resumes.classification.classification3,
          4: language.setting.resumes.classification.classification4,
          5: language.setting.resumes.classification.classification5
        },
        experience: {
          1: language.setting.resumes.experience.experience1,
          2: language.setting.resumes.experience.experience2,
          3: language.setting.resumes.experience.experience3,
          4: language.setting.resumes.experience.experience4,
          5: language.setting.resumes.experience.experience5,
          6: language.setting.resumes.experience.experience6,
          7: language.setting.resumes.experience.experience7,
          8: language.setting.resumes.experience.experience8
        },
        gender: {
          female: language.setting.resumes.gender.female,
          male: language.setting.resumes.gender.male,
          male_female: language.setting.resumes.gender.male_female,
        },
        languages: {
          1: language.setting.resumes.languages.languages1,
          2: language.setting.resumes.languages.languages2,
          3: language.setting.resumes.languages.languages3,
          4: language.setting.resumes.languages.languages4,
          5: language.setting.resumes.languages.languages5,
          6: language.setting.resumes.languages.languages6,
          7: language.setting.resumes.languages.languages7,
          8: language.setting.resumes.languages.languages8,
          9: language.setting.resumes.languages.languages9,
          10: language.setting.resumes.languages.languages10,
        },
        languages_level: {
          1: language.setting.resumes.languagesLevel.languages_level1,
          2: language.setting.resumes.languagesLevel.languages_level2,
          3: language.setting.resumes.languagesLevel.languages_level3,
          4: language.setting.resumes.languagesLevel.languages_level4
        },
        level: {
          1: language.setting.resumes.level.level1,
          2: language.setting.resumes.level.level2,
          3: language.setting.resumes.level.level3,
          4: language.setting.resumes.level.level4,
          5: language.setting.resumes.level.level5,
          6: language.setting.resumes.level.level6
        },
        marital_status: {
          1: language.setting.resumes.maritalStatus.marital_status1,
          2: language.setting.resumes.maritalStatus.marital_status2
        },
        rank: {
          1: language.setting.resumes.rank.rank1,
          2: language.setting.resumes.rank.rank2,
          3: language.setting.resumes.rank.rank3,
          4: language.setting.resumes.rank.rank4,
          5: language.setting.resumes.rank.rank5,
          6: language.setting.resumes.rank.rank6
        },
        resume_type: {
          1: language.setting.resumes.resumeType.resume_type1,
          2: language.setting.resumes.resumeType.resume_type2,
          3: language.setting.resumes.resumeType.resume_type3,
          4: language.setting.resumes.resumeType.resume_type4,
          5: language.setting.resumes.resumeType.resume_type5,
          6: language.setting.resumes.resumeType.resume_type6
        },
        salary: {
          1: language.setting.resumes.salary.salary1,
          2: language.setting.resumes.salary.salary2,
          3: language.setting.resumes.salary.salary3,
          4: language.setting.resumes.salary.salary4,
          5: language.setting.resumes.salary.salary5,
          6: language.setting.resumes.salary.salary6,
          7: language.setting.resumes.salary.salary7,
          8: language.setting.resumes.salary.salary8,
          9: language.setting.resumes.salary.salary9,
          10: language.setting.resumes.salary.salary10,
          11: language.setting.resumes.salary.salary11
        },
        status: {
          active: language.setting.resumes.status.active,
          hide: language.setting.resumes.status.hide,
          pending: language.setting.resumes.status.pending
        },
        type: {
          0: language.setting.resumes.type.type0,
          1: language.setting.resumes.type.type1
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
          female: language.setting.resumes.users.gender.female,
          male: language.setting.resumes.users.gender.male,
          male_female: language.setting.resumes.users.gender.male_female
        },
        level: {
          1: language.setting.resumes.users.level.level1,
          2: language.setting.resumes.users.level.level2,
          3: language.setting.resumes.users.level.level3,
          4: language.setting.resumes.users.level.level4,
          5: language.setting.resumes.users.level.level5,
          6: language.setting.resumes.users.level.level6
        },
        marital_status: {
          1: language.setting.resumes.users.maritalStatus.marital_status1,
          2: language.setting.resumes.users.maritalStatus.marital_status2
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