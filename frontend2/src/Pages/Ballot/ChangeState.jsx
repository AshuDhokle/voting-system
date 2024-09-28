import React from "react";
import { useSelector } from "react-redux";
import { selectContract } from "../../features/contract";

const ChangeState = ({ id,currentState }) => {
  const { isOwner,contract } = useSelector(selectContract);
  const changeState = async(state) => {
    if(contract){
        
      try {
        if(state === "Start"){
            const response = await contract.startBallot(id);
        }else if(state === "End"){
            const response = await contract.endBallot(id);
        }
      } catch (error) {
        console.log("error in changing state");
      } 
    }
  }

  return (
    <>
      {
        isOwner && 
        <div>
          { currentState === 'Created' && <button onClick={()=>changeState("Start")} className="m-2 p-1 border-2 border-blue-400 rounded-lg w-32 hover:bg-blue-400 hover:text-white">Start</button>  }
          { currentState === 'Active' && <button onClick={()=>changeState("End")} className="m-2 p-1 border-2 border-red-400 rounded-lg w-32 hover:bg-red-400 hover:text-white">End</button> }
        </div>
      }
    </>
  );
};

export default ChangeState;
