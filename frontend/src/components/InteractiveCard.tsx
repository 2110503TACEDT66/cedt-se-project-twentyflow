'use client'
import React from 'react';

export default function InteractiveCard( { children, contentName } : { children: React.ReactNode ,contentName:string}) {

    function onCardMouseAction(event:React.SyntheticEvent) {
        if( event.type == 'mouseover') {
            event.currentTarget.classList.remove( 'shadow-xl', 'scale-100')
            event.currentTarget.classList.add( 'shadow-3xl', 'scale-110')
        }
        else {
            event.currentTarget.classList.remove( 'shadow-3xl', 'scale-110')
            event.currentTarget.classList.add( 'shadow-xl', 'scale-100')
        }
    }

    return (
        <div className='w-1/5 h-[300px] rounded-lg shadow-xl bg-white transform transition-transform duration-500 ease-in-out scale-100' 
        onMouseOver={ (e) => onCardMouseAction(e)}
        onMouseOut={(e)=> onCardMouseAction(e)} >
            { children }
        </div>
    );
}