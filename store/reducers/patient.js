import Patient from '../../models/patient';
import {
	DELETE_PATIENT,
	CREATE_PATIENT,
	UPDATE_PATIENT,
	SET_PATIENTS
} from '../actions/patient';

// Finding initial state
const initialState = {
	clients: [],
	criticalPatients: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PATIENTS:
			return {
				clients: action.patients,
				criticalPatients: action.patients.filter((p) => p.isCritical === true)
			}
		case DELETE_PATIENT:
			return {
				...state,
				criticalPatients: state.criticalPatients.filter(
					(patient) => patient.id !== action.pid
				),
				clients: state.clients.filter((patient) => patient.id !== action.pid),
			};
		case CREATE_PATIENT:

			// Creating new patient
			const newPatient = new Patient(
				action.patientData.pid,
				'u1',
				// title and other properties populated with the help of data from action
				action.patientData.title,
				action.patientData.photo,
				action.patientData.diagnosis,
				action.patientData.age,
				action.patientData.phone,
				action.patientData.email,
				action.patientData.address,
				action.patientData.description,
				action.patientData.bodyTemperature,
				action.patientData.pulseRate,
				action.patientData.respirationRate,
				action.patientData.systolicBP,
				action.patientData.diastolicBP,
				action.patientData.o2Sat,
				action.patientData.isCritical,
				action.patientData.rid
			);

			return {
				// Adds newly created patient to store by updating state
				...state, // first copy the existing state
				clients: state.clients.concat(newPatient), // then add to client and
				criticalPatients: state.criticalPatients.concat(newPatient), // critical patient
			};

		case UPDATE_PATIENT:
			// To update first find the index of the current patient
			const patientIndex = state.criticalPatients.findIndex(
				(pat) => pat.id === action.pid
			);
			console.log(patientIndex)
			console.log(action.pid)
			console.log(state.criticalPatients);
			console.log(action.patientData.isCritical);
			const updatedPatient = new Patient(
				action.pid,
				'cp2',
				action.patientData.title,
				action.patientData.photo,
				action.patientData.diagnosis,
				action.patientData.age,
				action.patientData.phone,
				action.patientData.email,
				action.patientData.address,
				action.patientData.description,
				action.patientData.bodyTemperature,
				action.patientData.pulseRate,
				action.patientData.respirationRate,
				action.patientData.systolicBP,
				action.patientData.diastolicBP,
				action.patientData.o2Sat,
				action.patientData.isCritical,
				action.patientData.rid
			);

			// Updating state
			const updatedCriticalPatients = [...state.criticalPatients]; // copying existing critical patients
			if(patientIndex>=0) {// exists already
				if(action.patientData.isCritical === false) {// if critical is false
					// remove
					updatedCriticalPatients.splice(patientIndex, 1);// remove critical patient record
				} else {
					updatedCriticalPatients[patientIndex] = updatedPatient; // replace selected critical patient index with updated patient in the copy
				}
			} else {// do not exist
				if(action.patientData.isCritical === true) {// if true
					updatedCriticalPatients.push(updatedPatient);// add critical patient record
				}
			}

			const clientIndex = state.clients.findIndex(
				(pat) => pat.id === action.pid
			);
			const updatedClients = [...state.clients];
			updatedClients[clientIndex] = updatedPatient;
			return {
				...state,
				clients: updatedClients,
				criticalPatients: updatedCriticalPatients,
			};
	}
	return state;
};
