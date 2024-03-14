import React from 'react'
import styles from './NoteFoundBlock.module.scss'
const NotFoundBlock = () => {
    console.log(styles)
  return (
      <div className={styles.root}>
          <h1 >
              <span>😔</span>
              <br />
              Ничего не найдено!
          </h1>
          <p className={styles.description}> К сожалению данная страница отсутствует на нашем сайте</p>
      </div>
  )
}
export default NotFoundBlock
