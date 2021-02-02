import React from 'react';
import PropTypes from 'prop-types';
import { sections, arr } from 'constans/sections';
import seeAll from 'assets/images/seeAll.svg';
import styles from './Sections.module.scss';

const Section = (props) => {
  const { name } = props;

  return (
    <>
      <div className={styles.containerSection}>
        <div className={styles.squares}>
          <div className={styles.title}>{sections[name].title}</div>
          <div className={styles.itemSquare}>
            {arr.map(() => <div className={styles.item} />)}
          </div>
        </div>
        <div className={styles.list}>
          {sections[name].columns.map((column) => (
            <div className={styles.paragraph}>

              {
                  column.map((paragraph) => (
                    <>
                      <h1 className={styles.subtitle}>{paragraph.subtitle}</h1>
                      {paragraph.categories.map((category) => (
                        <p className={styles.category}>{category}</p>
                      ))}
                    </>
                  ))
              }
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <img src={seeAll} alt="see all" />
      </div>
    </>
  );
};

Section.propTypes = {
  name: PropTypes.string.isRequired
};

export default Section;
