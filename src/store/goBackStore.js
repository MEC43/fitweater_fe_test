
import { create } from "zustand";

const useGoBackStore = create((set) => ({
    goBack: (location, navigate) => {
        const queryParams = new URLSearchParams(location.search);
        const referrer = queryParams.get('referrer');

        if (referrer === 'completed') {
            navigate(-3);
        } else {
            navigate(-1);
        }
    }
}));

export { useGoBackStore };
