import classNames from 'classnames'
import styles from './Navbar.module.css'

export default function Navbar() {
  return <div className={styles.wrapper}>
    <div className={classNames('container', styles.content)}>
      <div>
        Aplikasi Kontak
      </div>
      <div>
        Tya Widi
      </div>
    </div>
  </div>
}