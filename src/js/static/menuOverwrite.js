/*                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/


Software in the Sustain Ecosystem are Released Under Terms of Apache Software License 

This research has been supported by funding from the US National Science Foundation's CSSI program through awards 1931363, 1931324, 1931335, and 1931283. The project is a joint effort involving Colorado State University, Arizona State University, the University of California-Irvine, and the University of Maryland - Baltimore County. All redistributions of the software must also include this information. 

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION


1. Definitions.

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:

You must give any other recipients of the Work or Derivative Works a copy of this License; and
You must cause any modified files to carry prominent notices stating that You changed the files; and
You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. 

You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability. 

END OF TERMS AND CONDITIONS
*/

import clone from 'just-clone';
import Util from '../library/apertureUtil';

function getEpochForYesterday() {
    const oneDay = (1000 * 60 * 60 * 24);
    return Date.now() - (oneDay + (Date.now() % oneDay));
}

const overwrite = { //leaving this commented cause it explains the schema really well 
    // "covid_county": {
    //     "group": "Tract, County, & State Data",
    //     "subGroup": "County Level",
    //     "constraints": {
    //         date_range: {
    //             "type": "slider",
    //             "label": "Date Range",
    //             "range": [1580169600000, 1580169600000 + 1000 * 60 * 60 * 24 * 266],
    //             "default": [1580169600000, 1580169600000 + 1000 * 60 * 60 * 24 * 266],
    //             "step": 1000 * 60 * 60 * 24,
    //             "isDate": true
    //         }
    //     },
    //     "onConstraintChange": function (layer, constraintName, value) {
    //         console.log(layer + "-" + constraintName + "-");
    //         COVID.dateStart = Number(value[0]);
    //         COVID.dateEnd = Number(value[1]);
    //         COVID.changeFlag = true;
    //         COVID.makeQuery(map);
    //     },
    //     "onAdd": function () {
    //         COVID.allowRender = true;
    //     },
    //     "onRemove": function () {
    //         COVID.allowRender = false;
    //         COVID.clear();
    //     },
    //     "onUpdate": function () {
    //         COVID.makeQuery(map);
    //     },
    //     "noAutoQuery": true
    // },
    gridmet_climate: {
        label: "Historical Climate",
        collection: "Gridmet_ALL_Partitioned",
        info: "Historical climate data from gridMET, a gridded dataset that spans the CONUS and includes variables such as air temperature, precipitation, humidity, evapotranspiration, and more.",
        constraints: {
            time_interval: {
                type: "slider",
                label: "Date Range",
                range: [283996800000, getEpochForYesterday()],
                "default": [283996800000, getEpochForYesterday()],
                isDate: true
            },
            m_air_temperature_max: {
                type: "slider",
                label: "Max Air Temperature",
                range: [233.1, 327.1],
                "default": [233.1, 327.1],
                step: 0.1,
                unit: "kelvin",
            },
            m_air_temperature_min: {
                type: "slider",
                label: "Min Air Temperature",
                range: [225.1, 312.6],
                "default": [225.1, 312.6],
                step: 0.1,
                unit: "kelvin",
            },
            m_dead_fuel_moisture_1000hr: {
                type: "slider",
                label: "1000 Hour Fuel Moisture",
                range: [0.4, 47.5],
                "default": [0.4, 47.5],
                step: 0.1,
                unit: "percent",
            },
            m_dead_fuel_moisture_100hr: {
                type: "slider",
                label: "100 Hour Fuel Moisture",
                range: [0.4, 46.7],
                "default": [0.4, 46.7],
                step: 0.1,
                unit: "percent"
            },
            m_potential_evapotranspiration_alfalfa: {
                type: "slider",
                label: "Reference Evapotranspiration (alfalfa)",
                range: [0, 31.8],
                "default": [0.4, 46.7],
                step: 0.1,
                unit: "mm"
            },
            m_potential_evapotranspiration_short_grass: {
                type: "slider",
                label: "Reference Evapotranspiration (short grass)",
                range: [0, 20],
                "default": [0, 20],
                step: 0.1,
                unit: "mm"
            },
            m_precipitation_amount: {
                type: "slider",
                label: "Accumulated Precipitation",
                range: [0, 6],
                "default": [0, 3],
                step: 0.1,
                unit: "mm"
            },
            m_relative_humidity_max: {
                type: "slider",
                label: "Maximum Relative Humidity",
                range: [0, 100],
                "default": [0, 100],
                step: 0.1,
                unit: "percent"
            },
            m_relative_humidity_min: {
                type: "slider",
                label: "Minimum Relative Humidity",
                range: [0, 100],
                "default": [0, 100],
                step: 0.1,
                unit: "percent"
            },
            m_specific_humidity_mean: {
                type: "slider",
                label: "Mean Specific Humidity",
                range: [0, 100],
                "default": [0, 100],
                step: 0.1,
                unit: "kg/kg"
            },
            m_surface_downwelling_shortwave_flux_in_air: {
                type: "slider",
                label: "Mean Downward Shortwave Radiation (at surface)",
                range: [0, 455.6],
                "default": [0, 455.6],
                step: 0.1,
                unit: "W m-2"
            },
            m_vapor_pressure_deficit_mean: {
                type: "slider",
                label: "Mean Vapor Pressure Deficit",
                range: [0, 10.04],
                "default": [0, 10.04],
                step: 0.1,
                unit: "kPa",
            },
            m_wind_direction_mean: {
                type: "slider",
                label: "Mean Wind Direction",
                range: [0, 360],
                "default": [0, 360],
                step: 0.1,
                unit: "degrees clockwise from north",
            },
            m_wind_speed_mean: {
                type: "slider",
                label: "Mean Wind Speed",
                range: [0, 29.1],
                "default": [0, 29.1],
                step: 0.1,
                unit: "m/s",
            },
        },
        color: {
            style: "gradient",
            variable: "m_air_temperature_max",
            border: 1
        },
        type: "druid",
        datasource: "Gridmet_ALL_Partitioned",
    },
    maca_climate: {
        label: "Future Climate",
        collection: "MACA_CanESM2_rcp45_2021_2050",
        info: "Predicted climate data from MACA, a predictive gridded dataset that uses earth system models to project several climate variables across the CONUS.",
        constraints: {
            time_interval: {
                type: "slider",
                label: "Date Range",
                range: [1609459200000, 2524608000000],
                "default": [1609459200000, 1735689600000],
                isDate: true
            },
            m_specific_humidity: {
                type: "slider",
                label: "Specific Humidity",
                range: [1.0, 100.0],
                "default": [1.0, 100.0],
                step: 0.1,
                unit: "kg kg-1",
            },
            m_max_relative_humidity: {
                type: "slider",
                label: "Maximum Relative Humidity",
                range: [1.0, 100.0],
                "default": [1.0, 100.0],
                step: 0.1,
                unit: "percent",
            },
            m_min_relative_humidity: {
                type: "slider",
                label: "Minimum Relative Humidity",
                range: [1.0, 100.0],
                "default": [1.0, 100.0],
                step: 0.1,
                unit: "percent",
            },
            m_maximum_air_temperature: {
                type: "slider",
                label: "Maximum Near-Surface Air Temperature",
                range: [236.3, 329.2],
                "default": [236.3, 329.2],
                step: 0.1,
                unit: "kelvin"
            },
            m_minimum_air_temperature: {
                type: "slider",
                label: "Minimum Near-Surface Air Temperature",
                range: [223.7, 314.7],
                "default": [223.7, 314.7],
                step: 0.1,
                unit: "kelvin"
            },
            m_downwelling_solar_radiation: {
                type: "slider",
                label: "Surface Downwelling Solar Radiation",
                range: [9.1, 453.8],
                "default": [9.1, 453.8],
                step: 0.1,
                unit: "W m-2"
            },
            m_eastward_wind_component: {
                type: "slider",
                label: "Eastward Wind Speed",
                range: [-21.9, 27.37],
                "default": [-21.9, 27.37],
                step: 0.1,
                unit: "m s-1"
            },
            m_northward_wind_component: {
                type: "slider",
                label: "Northward Wind Speed",
                range: [0, 10.3],
                "default": [0, 10.3],
                step: 0.1,
                unit: "m s-1"
            },
            m_precipitation: {
                type: "slider",
                label: "Precipitation",
                range: [0, 865.5],
                "default": [0, 865.5],
                step: 0.1,
                unit: "mm"
            },
            m_vapor_pressure_deficit: {
                type: "slider",
                label: "Mean Vapor Pressure Deficit",
                range: [0, 100],
                "default": [0, 100],
                step: 0.1,
                unit: "kPa"
            },
        },
        color: {
            style: "gradient",
            variable: "m_air_temperature_max",
            border: 1
        },
        type: "druid",
        datasource: "Gridmet_ALL_Partitioned",
    },
}

/* The options object can have the following fields:
 *  .raw: If true, return the overwrite object exactly as it is written above, 
 *        with no additional processing.
 */
export default function getOverwriteObject(options = {}) {
    if (options.raw) {
        return overwrite;
    }

    let modifiedOverwrite = splitDatasetsToCountyAndTract(overwrite, entry => entry.type === "druid");

    return modifiedOverwrite;
}

function splitDatasetsToCountyAndTract(overwrite, condition = (() => true)) {
    let reformat = (kv, level, infoSuffix) => [
        `${kv[0]}_${level}`, Object.assign(clone(kv[1]), {
            label: `${kv[1].label} (${Util.capitalizeString(level)})`,
            level: level,
            info: `${kv[1].info} ${infoSuffix}`,
            linkedGeometry: level == "tract" 
                ? "tract_geo_140mb_no_2d_index"
                : "county_geo_30mb_no_2d_index",
        }), 
    ];

    return Object.fromEntries(Object.entries(overwrite).map(kv => {
        if (condition(kv[1])) {
            return [ 
                reformat(kv, "tract", "This is a tract-level version of the dataset, which is aggregated over individual census tracts."),
                reformat(kv, "county", "This is a county-level version of the dataset, which is aggregated over individual counties."),
            ];
        }

        return kv;
    }).flat());
}
