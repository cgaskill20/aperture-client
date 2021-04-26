import React, { Component, useEffect, useRef, useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import currentLocationIcon from '../../../images/current-location.svg';
import L from 'leaflet';

export function goToLocation(pos, map) {
    map.flyTo({
        lat: pos.latitude,
        lng: pos.longitude
    });
}

const GEOCODING_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=pjson&outFields=Addr_type&forStorage=false&SingleLine=";
async function geocode(search) {
    return new Promise(resolve => {
        fetch(`${GEOCODING_URL}${search}`)
            .then((response) => {
                resolve(response.json());
            })
    });
}

async function search(searchFor, map) {
    if (searchFor.length) {
        //my proudest lines :)
        const addrRes = await geocode(searchFor);
        const { xmin, xmax, ymin, ymax } = addrRes?.candidates[0]?.extent;
        xmin && map.flyToBounds(L.latLngBounds(L.latLng(ymin, xmin), L.latLng(ymax, xmax)));
    }
}

export default function SearchLocation(props) {
    const locationSearchRef = useRef(null);
    return <InputGroup>
        <InputGroupAddon addonType="prepend">
            <Button onClick={() => {search(locationSearchRef.current.value, props.map)}}>
                🔍
            </Button>
        </InputGroupAddon>
        <Input innerRef={locationSearchRef} placeholder="Search for a location..." onKeyPress={(e) => e.key === 'Enter' && search(locationSearchRef.current.value, props.map)}/>
    </InputGroup>;
}