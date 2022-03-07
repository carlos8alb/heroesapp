import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/userForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const [ formValues, handleInputChange ] = useForm({
    searchText: q
  });

  const { searchText } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = ( e ) => {
    e.preventDefault();
    navigate(`?q=${ searchText }`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      
      <div className="row">
        <div className="col-md-5">
          <form 
            onSubmit={ handleSearch }
          >

            <input 
              type="text"
              className="form-control"
              placeholder="Super hero name..."
              name='searchText'
              autoComplete='off'
              value={ searchText }
              onChange={ handleInputChange }
            />

            <button 
              type='submit'
              className="btn btn-primary btn-block mt-2 w-100"
            >
                Go
            </button>

          </form>

        </div>
        <div className="col-7">
          <h4>Resultados { `(${ heroesFiltered.length })` } </h4>
          <hr />

          {

            (q === '')
            ? <div className='alert alert-info'>Please insert a super hero name</div>
            : (heroesFiltered.length === 0) 
              && <div className='alert alert-danger'>No results for { q }</div>

          }

          {

            heroesFiltered.map(hero => (
              <HeroCard 
                key={hero.id}
                { ...hero }
              />
            ))

          }

        </div>
      </div>
    </>
  );
};
