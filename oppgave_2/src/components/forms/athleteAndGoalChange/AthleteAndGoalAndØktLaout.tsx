"use client"
import React from "react";
import GoalEditForm from "@/components/forms/goal/EditGoalForm"
import ShowAthlete from "@/components/sections/ShowAthlete"

const AthleteAndGoalAndØktLaout: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex-1 mr-8">
        <GoalEditForm />
      </div>
      <div className="flex-1">
        <ShowAthlete/>
      </div>
    </div>
  );
};

export default AthleteAndGoalAndØktLaout;
