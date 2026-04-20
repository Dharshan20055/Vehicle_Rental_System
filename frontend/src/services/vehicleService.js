import axios from 'axios';

const API_URL = 'http://localhost:8080/api/vehicles';

const getAllVehicles = (params) => {
    return axios.get(API_URL, { params });
};

const getVehicleById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const addVehicle = (vehicle) => {
    return axios.post(API_URL, vehicle);
};

const updateVehicle = (id, vehicle) => {
    return axios.put(`${API_URL}/${id}`, vehicle);
};

const deleteVehicle = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const vehicleService = {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle
};

export default vehicleService;
