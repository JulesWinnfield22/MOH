import ApiService from '../../../services/ApiService';
import { getQueryFormObject } from '../../../utils/utils';

const api = new ApiService();

const path = '/contract';
const docuPath = '/document';
export function findAllByContractStatus() {
  return api
    .addAuthenticationHeader()
    .get(`${path}/findAllByContractStatus?contractStatus=Submitted`);
}
export function findAllByContractStatusDeclined() {
  return api
    .addAuthenticationHeader()
    .get(`${path}/findAllByContractStatus?contractStatus=Declined`);
}
export function findAllByContractStatusApproved() {
  return api
    .addAuthenticationHeader()
    .get(`${path}/findAllByContractStatus?contractStatus=Approved`);
}
export async function rejectContract(id, status, rejectionReason) {
  try {
    const response = await Promise.all([
      api
        .addAuthenticationHeader()
        .put(
          `${path}/updateContractStatus?id=${id}&status=${status}&reason=${rejectionReason}`
        ),
    ]);
    console.log('Reject Contract Response:', response);
    return response;
  } catch (error) {
    console.error('Failed to reject contract:', error);
    throw error;
  }
}

export async function confirmContract(id, status, rejectionReason) {
  try {
    const response = await Promise.all([
      api
        .addAuthenticationHeader()
        .put(
          `${path}/updateContractStatus?id=${id}&status=${status}&reason=${rejectionReason}`
        ),
    ]);
    console.log('Reject Contract Response:', response);
    return response;
  } catch (error) {
    console.error('Failed to reject contract:', error);
    throw error;
  }
}

export function getUserContract(userUuid) {
	return api.addAuthenticationHeader().get(`${path}/findByUserUuid/${userUuid}`)
}

export function getContractById(id) {
  return api.addAuthenticationHeader().get(`${path}/findByContractId/${id}`);
}

export function getContractFileById(documentName) {
  return api
    .addAuthenticationHeader()
    .get(`${docuPath}/findByDocumentName/${documentName}`, {
      params: { action: 'view' },
      responseType: 'blob', // Ensures that file data is handled correctly
    });
}
