import React from 'react';
import styles from './styles/Cards.module.css';
import { Link } from 'react-router-dom';

export function Cards()  {
  return (
    <div className={styles.container}>
    
    <div className={`${styles.row} justify-content-center`}>
    <h2>REGISTER HERE</h2>
      {/* Card 1 */}
      
      <div className="col-md-4 d-flex justify-content-center mb-4">
        <div className={`${styles.card} ${styles.individual} gr-1`}>
          <div className={styles.txt}>
            <h1>
              INDIVIDUAL
            </h1>
          
          </div>
          
          <Link to="/individual_register">Register</Link>
         
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-md-4 d-flex justify-content-center mb-4">
        <div className={`${styles.card} ${styles.institution} gr-2`}>
          <div className={styles.txt}>
            <h1>
              INSTITUTION
            </h1>
           
          </div>
          
            <Link to="/institution_member_register">Register</Link>
          
        </div>
      </div>

      {/* Card 3 */}
      <div className="col-md-4 d-flex justify-content-center mb-4">
        <div className={`${styles.card} ${styles.organization} gr-3`}>
          <div className={styles.txt}>
            <h1>
              ORGANIZATION
            </h1>
            
          </div>
          <Link to="/login">Register</Link>
            
          
        </div>
      </div>
    </div>
  </div>



  );
};
export default Cards;