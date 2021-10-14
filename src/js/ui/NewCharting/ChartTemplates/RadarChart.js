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

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from '../../../third-party/d3.min.js';
import Feature from '../../../library/charting/feature.js';
import { useGlobalState } from '../../global/GlobalState';

const NUM_RINGS = 5;

// The `size` value that comes through props determines how big the canvas
// should be, but it over-estimates because of margins in the charting window.
// This is how much the actual size of the canvas will be reduced
// to accomodate.
const SIZE_OFFSET = { width: 100, height: 30 };

export default function RadarChart(props) {
    let canvasRef = React.createRef();
    let [ctx, setCtx] = useState();
    let [globalState] = useGlobalState();

    let datasetSlices = useRef([]);

    let prepareData = data => {
        return Object.entries(data.map_features)
            .filter(kv => Feature.getCollection(kv[0]) == props.dataset);
    };

    let rerender = (width, height) => {
        if (!props.data?.map_features) {
            return;
        }

        if (!ctx) {
            return;
        }

        let center = { x: width / 2, y: height / 2 };

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = '#aaa';
        for (let i = 0; i < NUM_RINGS; i++) {
            ctx.beginPath();
            ctx.arc(center.x, center.y, d3.scaleLinear().domain([0, NUM_RINGS - 1]).range([30, height / 2 - 30])(i), 0, Math.PI * 2);
            ctx.stroke();
        }

        if (datasetSlices.current.length < 2) {
            return;
        }

        let slices = datasetSlices.current;

        ctx.save();
        let radStep = d3.scaleLinear().domain([0, slices.length]).range([0, Math.PI * 2])(1);
        ctx.translate(center.x, center.y);
        for (let slice of slices) {
            let range = d3.scaleLinear().domain([slice.min, slice.max]).range([0, height / 2]);

            ctx.rotate(radStep / 2);

            ctx.strokeStyle = '#111';
            ctx.beginPath();
            ctx.arc(0, 0, range(d3.min(slice.data, d => d.data)), Math.PI / 2 - radStep / 2, Math.PI / 2 + radStep / 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, range(d3.max(slice.data, d => d.data)), Math.PI / 2 - radStep / 2, Math.PI / 2 + radStep / 2);
            ctx.stroke();
            ctx.stroke();
            
            ctx.strokeStyle = '#aaa';
            ctx.beginPath();
            ctx.moveTo(0, range(d3.min(slice.data, d => d.data)));
            ctx.lineTo(0, range(d3.max(slice.data, d => d.data)));
            ctx.stroke();

            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#999';
            //ctx.fillText(`${slice.name}`, 0, (height / 2 - 50) + ((slice.index % 2 == 0) ? 20 : 0));
            for (let i = 2; i < NUM_RINGS; i++) {
                let value = d3.scaleLinear()
                    .domain([0, NUM_RINGS - 1])
                    .range([slice.min, slice.max])
                    (i);
                let offset = d3.scaleLinear()
                    .domain([0, NUM_RINGS - 1])
                    .range([30, height / 2 - 30])
                    (i);
                ctx.fillText(`${value.toFixed(2)}`, 0, offset - 5);
            }

            ctx.beginPath();
            ctx.rotate(radStep / 2);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, height / 2);
            ctx.stroke();

        }
        ctx.restore();

        let canvas = d3.select(canvasRef.current);
        canvas.on('mousemove', event => {
            if (!canvasRef.current || !ctx) {
                return;
            }

            let rawMouse = d3.pointer(event, canvasRef.current);
            
            let mouse = { x: rawMouse[0] - center.x, y: rawMouse[1] - center.y, };
            let radius = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
            let theta = Math.atan2(mouse.y / radius, mouse.x / radius);
            let thetaOffset = Math.PI / 2;
            theta += thetaOffset;
            if (theta > Math.PI) { 
                theta -= Math.PI * 2;
            }

            let slice = d3.scaleQuantize()
                .domain([-Math.PI, Math.PI])
                .range(datasetSlices.current)(theta);

            ctx.clearRect(mouse.x, mouse.y + 50, 200, 50);
        });
    };

    let updateSlices = () => {
        let data = prepareData(props.data);
        let metadata = Object.values(globalState.menuMetadata)
                .find(m => m.collection === props.dataset);
        console.log(metadata);
        datasetSlices.current = data.map((v, i) => {
            let constraint = metadata.constraints[Feature.getName(v[0])];
            return {
                data: v[1],
                max: constraint.range[1],
                min: constraint.range[0],
                units: constraint.unit,
                name: Feature.getFriendlyName(v[0]),
                index: i,
            };
        });
    };

    useEffect(() => setCtx(canvasRef.current.getContext('2d')), []);
    useEffect(rerender.bind(this, props.size.width - SIZE_OFFSET.width, props.size.height - SIZE_OFFSET.height));
    useEffect(updateSlices);

    return (
        <div>
            <canvas 
                width={props.size.width - SIZE_OFFSET.width} 
                height={props.size.height - SIZE_OFFSET.height}
                ref={canvasRef}
            >
            </canvas>
        </div>
    );
}
