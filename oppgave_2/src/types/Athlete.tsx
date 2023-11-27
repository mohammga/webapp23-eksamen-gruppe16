export type AthleteFormData = {
    userId: string;
    gender: string;
    sportType: string;
    maxHeartRate: string;
    thresholdWatt: string;
    thresholdSpeed: string;
    intensityZoneHeartRate: string;
    intensityZoneWatt: string;
    intensityZoneSpeed: string;
    intensityZone: string;
    activities: {
      date: string;
      name: string;
      goalId: string;
    }[];

}