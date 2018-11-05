import React, { Component } from 'react';

import './styles.scss';

class WizardTabs extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentTab: null
  //   };
  // }

  render() {
    const { tabList, selected } = this.props;
    // const tabList = [
    //   { id: 1, value: 'Công việc mong muốn', active: true },
    //   { id: 2, value: 'Kinh nghiệm làm việc', active: true },
    //   { id: 3, value: 'Học vấn', active: true },
    //   { id: 4, value: 'Kỹ năng, ngoại ngữ', active: false }
    // ];
    if (!tabList || tabList.length === 0) {
      return null;
    }
    return (
      <div className="wizard-tabs">
        {tabList.map(item => {
          const activeClass = item.id <= selected ? ' active' : '';
          return (
            <div key={item.id} className="wizard-item">
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  // this.props.onChange(item);
                }}
                className="item"
              >
                <div className="first-retangle ">
                  <div className={activeClass} />
                </div>
                <div className={`main-retangle ${activeClass}`}>
                  <i className={item.icon} />
                </div>
                <div className="second-retangle">
                  <div className={activeClass} />
                </div>
              </a>
              <div className="content">{item.value}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default WizardTabs;
