"use client"

import classNames from 'classnames'
import styles from './Navbar.module.css'
import { deleteCookie } from 'cookies-next'
import { useRouter } from "next/router";


export default function Navbar() {

  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('isLogin')

    router.reload()
  }
  return <div className={styles.wrapper}>
    <div className={classNames('container', styles.content)}>
      <div>
        Data Mahasiswa
      </div>
      <div className={styles.wrapper_tya}>
        <div>Tya Widi</div>
        <div className={styles.btn_logout} onClick={() => handleLogout()}>Logout</div>
      </div>
    </div>
  </div>
}