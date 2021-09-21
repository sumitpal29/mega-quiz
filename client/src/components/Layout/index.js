import React from 'react'
import { Button } from 'antd';
import styles from './layout.module.scss';

function Layout(props) {
  const { logout, logoutBtnLoading } = props;
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Ultimate Quiz</h1>
        {logout && <Button loading={logoutBtnLoading} onClick={logout} type="danger">logout</Button>}
      </header>
      <main className={styles.main}>
        {props.children}
      </main>
      <footer className={styles.footer}>created by Sumit Pal</footer>
    </div>
  )
}

export default Layout
