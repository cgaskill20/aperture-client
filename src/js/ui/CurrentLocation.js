import React, { Component, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import currentLocationIcon from '../../../images/current-location.svg';

export default function CurrentLocation(props) {
    return <Button >
        <img src={currentLocationIcon}/>
    </Button>;
}