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

export default function SearchLocation(props) {
    const locationSearchRef = useRef(null);
    return <InputGroup>
        <InputGroupAddon addonType="prepend">
            <Button onClick={async () => {
                const search = locationSearchRef.current.value;
                if (search.length) {
                    const addrRes = await geocode(search);
                    console.log(addrRes)
                    const { xmin, xmax, ymin, ymax } = addrRes.candidates[0].extent;
                    props.map.flyToBounds(L.latLngBounds(L.latLng(ymin, xmin),L.latLng(ymax, xmax)));
                    
                }
            }
            }>
                🔍
            </Button>
        </InputGroupAddon>
        <Input innerRef={locationSearchRef} placeholder="Search for a location..." />
    </InputGroup>;
}