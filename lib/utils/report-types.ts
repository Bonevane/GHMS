export const reportTypes = {
  'radiology': {
    fields: ['patientId', 'date', 'imagingType', 'findings', 'radiologist'],
    imagingTypes: ['xray', 'ct', 'mri', 'ultrasound'],
    title: 'Radiology Report',
  },
  'laboratory': {
    fields: ['patientId', 'date', 'testType', 'results', 'normalRange', 'technician'],
    testTypes: ['blood', 'urine', 'culture', 'biochemistry', 'microbiology'],
    title: 'Laboratory Report',
  },
};