import React from 'react';

const Filter = (props) => {
    const { value } = props;
    return (
        <div className="filters-available-size">
            <label>
                <input type="checkbox" value={value} />
                <span className="checkmark">{value}</span>
            </label>
        </div>
    );
};

export default Filter;