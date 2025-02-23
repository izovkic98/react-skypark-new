import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader } from './base.service';


const API_URL = BASE_API_URL + '/api/reservation';

class ReservationService {

    saveReservation(reservation) {
        return axios.post(API_URL, reservation, {headers: authHeader()});
    }

    deleteReservation(reservation) {
        return axios.delete(API_URL + '/' + reservation.id, {headers: authHeader()});
    }

    getAllReservations() {
        return axios.get(API_URL + '/all', {headers: authHeader()});
    }

    getAllReservationsOfAUser() {
        return axios.get(API_URL + '/', {headers: authHeader()});
    }

    getReservationById(reservationId){
        return axios.get(API_URL + '/id/' + reservationId, {headers: authHeader()});
    }

    updateReservation(reservation){
        return axios.put(API_URL ,reservation, {headers: authHeader()});
    }

    changeReservationStatus(reservation){
        return axios.put(API_URL + '/change-status',reservation, {headers: authHeader()});
    }

    getAllCurrentReservationOfAUser() {
        return axios.get(API_URL + '/all/current' , {headers: authHeader()});
    }

    printReservation(code){
        return axios.get(API_URL + '/print/' + code ,{headers: authHeader()});
    }


}

export default new ReservationService();