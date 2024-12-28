export const recordTypes = {
  'redo': {
    fields: ['patientId', 'date', 'reason', 'details', 'outcome'],
    title: 'Redo Register',
  },
  'blood-transfusion': {
    fields: ['patientId', 'date', 'bloodGroup', 'units', 'reaction', 'details'],
    title: 'Blood Transfusion Reaction',
  },
  'adverse-anesthesia': {
    fields: ['patientId', 'date', 'anesthesiaType', 'reaction', 'intervention'],
    title: 'Adverse Anesthesia Event',
  },
  'surgical-site': {
    fields: ['patientId', 'date', 'site', 'organism', 'treatment'],
    title: 'Surgical Site Infection',
  },
  'verbal-order': {
    fields: ['patientId', 'date', 'orderedBy', 'order', 'reason'],
    title: 'Verbal Order',
  },
  'ot-recall': {
    fields: ['patientId', 'date', 'reason', 'surgeon', 'outcome'],
    title: 'OT Recall',
  },
  'sterilization': {
    fields: ['date', 'equipment', 'method', 'operator', 'result'],
    title: 'Sterilization',
  },
};