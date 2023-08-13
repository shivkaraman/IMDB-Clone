import React from "react";

import "./contentWrapper.css";

//This is a higher-order-component used to keep any component sent to it at the center of the page
const ContentWrapper = ({ children }) => {
    return (
        <div className="contentWrapper">
            {children}
        </div>
    );
};

export default ContentWrapper;
