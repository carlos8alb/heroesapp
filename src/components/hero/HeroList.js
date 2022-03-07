import React, { useMemo } from 'react';

import { HeroCard } from './HeroCard';

import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';

export const HeroList = ( { publisher = 'marvel' } ) => {
  
    const heroes = useMemo( () => getHeroesByPublisher( publisher ), [ publisher ] );
  
    return (
        <>
        <h1>Hero List - { publisher }</h1>
        <div className='row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn'>

                {
                    
                    heroes.map( hero => {
                        return <HeroCard 
                        key={ hero.id }
                        { ...hero }
                        /> 
                    })
                    
                }

        </div>
        </>
  );
};
