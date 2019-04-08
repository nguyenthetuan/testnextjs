import LocalizedStrings from 'react-localization';
import en from './l18n/en.json';
import vi from './l18n/vi.json';

const strings = new LocalizedStrings({
  en: {
    components: {
      AddressInput: en.components.AddressInput.index,
      AdvanceSearchPopup: en.components.AdvanceSearchPopup.index,
      AdvancedSearch: {
        FastApply: {
          CVUploader: en.components.AdvancedSearch.FastApply.CVUploader,
          index: en.components.AdvancedSearch.FastApply.index
        },
        LoggedInApply: en.components.AdvancedSearch.LoggedInApply.index
      },
      AuthPopup: {
        index: en.components.AuthPopup.index,
      },
      footer: en.components.Footer.index,
      imgpicker: en.components.ImagePicker,
      jobitem: en.components.JobItem.index,
      menubar: {
        MobileMenu: en.components.MenuBar.MobileMenu.index,
        index: en.components.MenuBar.index,
        RightMenu: en.components.MenuBar.RightMenu,
      },
      select: en.components.Select.index,
      sidebar: en.components.SideBar.index,
      table: en.components.Table.index
    },
    setting: {
      billingInformation: en.setting.billing_information,
      companies: {
        size: en.setting.companies.size,
      },
      employersaveprofiles: en.setting.employer_save_profiles,
      jobApplications: {
        comment_status: en.setting.job_applications.comment_status,
        status: en.setting.job_applications.status
      },
      jobs: {
        experience: en.setting.jobs.experience,
        gender: en.setting.jobs.gender,
        level: en.setting.jobs.level,
        rank: en.setting.jobs.rank,
        salary: en.setting.jobs.salary,
        source: en.setting.jobs.source,
        status: en.setting.jobs.status,
        type: en.setting.jobs.type,
        viewType: en.setting.jobs.view_type
      },
      order: {
        paymentMethods: en.setting.order.paymentmethods,
        status: en.setting.order.status
      },
      products: {
        package: en.setting.products.package,
        status: en.setting.products.status
      },
      resumes: {
        classification: en.setting.resumes.classification,
        experience: en.setting.resumes.experience,
        gender: en.setting.resumes.gender,
        languages: en.setting.resumes.languages,
        languagesLevel: en.setting.resumes.languages_level,
        level: en.setting.resumes.level,
        maritalStatus: en.setting.resumes.marital_status,
        rank: en.setting.resumes.rank,
        resumeType: en.setting.resumes.resume_type,
        salary: en.setting.resumes.salary,
        status: en.setting.resumes.status,
        type: en.setting.resumes.type,
        users: {
          gender: en.setting.resumes.users.gender,
          level: en.setting.resumes.users.level,
          maritalStatus: en.setting.resumes.users.marital_status,
          role: en.setting.resumes.users.role,
          status: en.setting.resumes.users.status
        }

      }
    }
  },
  vi: {
    components: {
      AddressInput: vi.components.AddressInput.index,
      AdvanceSearchPopup: vi.components.AdvanceSearchPopup.index,
      AdvancedSearch: {
        FastApply: {
          CVUploader: vi.components.AdvancedSearch.FastApply.CVUploader,
          index: vi.components.AdvancedSearch.FastApply.index
        },
        LoggedInApply: vi.components.AdvancedSearch.LoggedInApply.index
      },
      AuthPopup: {
        index: vi.components.AuthPopup.index,
      },
      footer: vi.components.Footer.index,
      imgpicker: vi.components.ImagePicker,
      jobitem: vi.components.JobItem.index,
      menubar: {
        MobileMenu: vi.components.MenuBar.MobileMenu.index,
        index: vi.components.MenuBar.index,
        RightMenu: vi.components.MenuBar.RightMenu,
      },
      select: vi.components.Select.index,
      sidebar: vi.components.SideBar.index,
      table: vi.components.Table.index
    },
    setting: {
      billingInformation: vi.setting.billing_information,
      companies: {
        size: vi.setting.companies.size,
      },
      employersaveprofiles: vi.setting.employer_save_profiles,
      jobApplications: {
        comment_status: vi.setting.job_applications.comment_status,
        status: vi.setting.job_applications.status
      },
      jobs: {
        experience: vi.setting.jobs.experience,
        gender: vi.setting.jobs.gender,
        level: vi.setting.jobs.level,
        rank: vi.setting.jobs.rank,
        salary: vi.setting.jobs.salary,
        source: vi.setting.jobs.source,
        status: vi.setting.jobs.status,
        type: vi.setting.jobs.type,
        viewType: vi.setting.jobs.view_type
      },
      order: {
        paymentMethods: vi.setting.order.paymentmethods,
        status: vi.setting.order.status
      },
      products: {
        package: vi.setting.products.package,
        status: vi.setting.products.status
      },
      resumes: {
        classification: vi.setting.resumes.classification,
        experience: vi.setting.resumes.experience,
        gender: vi.setting.resumes.gender,
        languages: vi.setting.resumes.languages,
        languagesLevel: vi.setting.resumes.languages_level,
        level: vi.setting.resumes.level,
        maritalStatus: vi.setting.resumes.marital_status,
        rank: vi.setting.resumes.rank,
        resumeType: vi.setting.resumes.resume_type,
        salary: vi.setting.resumes.salary,
        status: vi.setting.resumes.status,
        type: vi.setting.resumes.type,
        users: {
          gender: vi.setting.resumes.users.gender,
          level: vi.setting.resumes.users.level,
          maritalStatus: vi.setting.resumes.users.marital_status,
          role: vi.setting.resumes.users.role,
          status: vi.setting.resumes.users.status
        }

      }
    }
  },
  jp: {
    components: {
      AddressInput: vi.components.AddressInput.index
    }
  }
});

export default strings;