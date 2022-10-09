import React from 'react';
import useMocData from '../utils/mocData';

const Main = () => {
    const { error, initialise, progress, status } = useMocData();
    const handleClick = () => {
        initialise();
    };
    return (
     <div className='container mt-5'>
         <h1>Main Page</h1>
         <h3>Инициализация данных в Firebase</h3>
         <ul>
             <li>Status: {status}</li>
             <li>Progress: {progress}%</li>
             {error && <li>error: {error}</li> }
         </ul>
         <button className="btn btn-primary" onClick={handleClick}>Инициализировать</button>
     </div>
    );
};

export default Main;
