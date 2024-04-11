'use client'
import React from 'react';

export default function InteractiveCard( { children, contentName } : { children: React.ReactNode ,contentName:string}) {

    function onCardMouseAction(event:React.SyntheticEvent) {
        if( event.type == 'mouseover') {
            event.currentTarget.classList.remove( 'shadow-xl')
            event.currentTarget.classList.add( 'shadow-3xl')
        }
        else {
            event.currentTarget.classList.remove( 'shadow-3xl')
            event.currentTarget.classList.add( 'shadow-xl')
        }
    }

    return (
        <div className='w-1/5 h-[300px] rounded-lg shadow-xl bg-white' 
        onMouseOver={ (e) => onCardMouseAction(e)}
        onMouseOut={(e)=> onCardMouseAction(e)} >
            { children }
        </div>
    );
}