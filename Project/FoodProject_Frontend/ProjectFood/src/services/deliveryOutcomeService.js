import api from "./api";

// DeliveryOutcomes
export const addDeliveryOutcome = (data) => api.post("/delivery-outcomes", data);
export const getOutcomeByDelivery = (deliveryId) =>
    api.get(`/delivery-outcomes/${deliveryId}`);

export default {
    addDeliveryOutcome,
    getOutcomeByDelivery,
};
