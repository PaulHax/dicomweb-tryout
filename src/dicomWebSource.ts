// docker run -p 4242:4242 -p 8042:8042 --rm jodogne/orthanc-plugins
// docker run -p 4242:4242 -p 8042:8042 --rm -v ~/src/volview-stuff/dicomweb-tryout/orthanc/orthanc.json:/etc/orthanc/orthanc.json:ro jodogne/orthanc-plugins

import { api } from "dicomweb-client";

// const url = "http://localhost:8008/dcm4chee-arc/aets/DCM4CHEE/rs";
// const url = "http://localhost:8042/dicom-web/";
// const url = "https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs";
const url = "/dicom-web";

const client = new api.DICOMwebClient({ url, retrieveRendered: false });

export function setupSource(
  element: HTMLButtonElement,
  resultSpace: HTMLElement
) {
  const request = async () => {
    const studies = await client.searchForStudies();
    console.log(studies);
    resultSpace.innerHTML = JSON.stringify(studies, null, 2);

    const names = studies.map((study: any) => ({
      studyName: study["00100010"].Value[0].Alphabetic,
      studyInstanceUID: study["0020000D"].Value[0],
      seriesInstanceUID: study["0020000E"].Value[0],
      sopInstanceName: study["0008103E"].Value[0],
      sopInstanceUID: study["00080018"].Value[0],
    }));
    console.log(names);
  };
  element.addEventListener("click", () => request());
  request();
}

const getInstance = async () => {
  // from sample.dcm
  let options = {
    studyInstanceUID:
      "1.3.6.1.4.1.14519.5.2.1.2744.7002.271803936741289691489150315969",
    seriesInstanceUID:
      "1.3.6.1.4.1.14519.5.2.1.2744.7002.117357550898198415937979788256",
    sopInstanceUID:
      "1.3.6.1.4.1.14519.5.2.1.2744.7002.325971588264730726076978589153",
  };
  const study = await client.retrieveStudy(options);
  console.log("instance", study);

  const instance = await client.retrieveInstance(options);
  console.log("instance", instance);
};

export const setupGetInstance = (element: HTMLButtonElement) => {
  element.addEventListener("click", () => getInstance());
  getInstance();
};
