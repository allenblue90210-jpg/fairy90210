import React from 'react';

import styles from './index.module.scss';
import screenshot from '../image/screenshot_16_9.png';

const Component = () => {
  return (
    <div className={styles.rateBeginningn1}>
      <img
        src={screenshot}
        alt="Rate Beginning"
        className={styles.background}
      />
    </div>
  );
}

export default Component;
