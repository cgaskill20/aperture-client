import React, { useState, useEffect } from 'react';
import ConstraintCheckbox from './ConstraintCheckbox';

export default function ConstraintMultiSelect({ constraint, querier }) {
    useEffect(() => {
        querier.constraintSetActive(constraint.name, true);
        return () => {
            querier.constraintSetActive(constraint.name, false);
        }
    }, []);

    return (
        constraint.options.map((option, index) => {
            return (<div key={index}><ConstraintCheckbox option={option} querier={querier} constraintName={constraint.name} /></div>)
        })
    );
}