'use client';
import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { LuXCircle } from "react-icons/lu";
import { ToggleActivePorduct } from '../../_actions/admin';

interface ActiveToggleProps {
    isActive: boolean;
    id: string; 
  }

const ActiveToggle = (isActive : any ) => {
    if (isActive.isActive) {
        return (
            <div>
                <FaCircleCheck className='w-5 h-5' fill='green'/> 
            </div>
        )
    }

    return (
        <div>
            <LuXCircle className='w-5 h-5' color='red'/> 
        </div>
    )
}

export default ActiveToggle


export const ActiveToggleDropDown = ({isActive, id} : ActiveToggleProps ) => {
    return (
      <div onClick={async () => await ToggleActivePorduct(!isActive, id)} >
       {isActive ? "Disactivate" : "Activate"}
      </div>
    );
  };