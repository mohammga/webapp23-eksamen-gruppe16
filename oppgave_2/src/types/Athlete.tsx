export type AthleteFormData = {
    userId: string;
    gender: string;
    sportType: string;
    meta: {
        heartRate: string;
        watt: string;
        speed: string;
    };
}