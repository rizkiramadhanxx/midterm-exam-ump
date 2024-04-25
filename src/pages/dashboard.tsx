"use client"

import { Navbar } from "@/component/layout";
import useHasMounted from "@/hooks/useHasMounted";
import styles from '@/styles/dashboard.module.css'
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {

  const hasMounted = useHasMounted()
  const [toggle, setToggle] = useState<boolean>(false)

  const handleDelete = async (id: number) => {
    axios.delete('/api/student/' + id).then(() => setToggle(!toggle))
  }

  const router = useRouter()

  const [dataStudent, setDataStudent] = useState<any>()

  const fetchingStudent = async () => {
    const data = await fetch('/api/student')
    const response = await data.json()

    setDataStudent(response)
  }

  useEffect(() => {
    fetchingStudent()
  }, [toggle])


  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={classNames('container', styles.content)}>
          <div className={styles.wrapper_button}>
            <button onClick={() => router.push('/dashboard/add')} className={classNames(styles.button, styles.add_button)}>Tambah</button>
          </div>
          <div className={styles.overflow_table}>
            {hasMounted && dataStudent &&
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tr}>
                    <th className={styles.th}>No</th>
                    <th className={styles.th}>Nama</th>
                    <th className={styles.th}>Jurusan</th>
                    <th className={styles.th}>Agama</th>
                    <th className={styles.th}>No Telpon</th>
                    <th className={styles.th}>Alamat</th>
                    <th className={styles.th}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataStudent.data.map((student: any, key: number) => (
                    <tr key={key}>
                      <th className={styles.th}>{student.id}</th>
                      <td className={styles.td}>{student.name}</td>
                      <td className={styles.td}>{student.major}</td>
                      <td className={styles.td}>{student.religion}</td>
                      <td className={styles.td}>{student.telephone}</td>
                      <td className={styles.td}>{student.address}</td>
                      <td className={styles.td}>
                        <div className={styles.wrapper_action}>
                          <div className={classNames(styles.button, styles.edit_button)} onClick={() => router.push('/dashboard/edit/' + student.id)}>Edit</div>
                          <div className={classNames(styles.button, styles.delete_button)} onClick={() => handleDelete(student.id)}>Hapus</div>
                        </div>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </>
  );
}
