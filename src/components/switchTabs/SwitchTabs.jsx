import React, { useState } from 'react';

import './switchTabs.css';

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0); //Index of selected item
    const [left, setLeft] = useState(0); //This is used to set the left property of movingBg (left: 0px left:100px)

    const activeTab = (tab, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab);
    };

    return (
        <div className='switchingTabs'>
            <div className='tabItems'>
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectedTab === index ? 'active' : ''
                        }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span
                    className='movingBg'
                    style={{ left }}
                />
            </div>
        </div>
    );
};

export default SwitchTabs;
