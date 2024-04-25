'use client'

import { Navbar } from "@/component/layout";
import useHasMounted from "@/hooks/useHasMounted";
import styles from '@/styles/add.module.css';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";



const schema = z.object({
  name: z.string().min(5).max(50),
  address: z.string().min(10).max(100),
  telephone: z.number(),
  major: z.string(),
  religion: z.string()
})


type AddSchema = z.infer<typeof schema>

export default function Update() {



  const router = useRouter()

  const { id } = router.query


  const { register, handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm<AddSchema>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  useEffect(() => {

    if (!id) {
      return
    }

    axios.get('/api/student/' + router.query.id).then((response) => {

      const { name, telephone, address, major, religion } = response.data.data

      setValue('name', name)
      setValue('telephone', telephone)
      setValue('address', address)
      setValue('major', religion)
      setValue('major', major)
    })


  }, [id])


  const onSubmit = async (data: any) => {
    const datafetch = await axios('/api/student/' + router.query.id, {
      method: "PUT",
      data: data
    })

    if (datafetch.status === 200) {
      router.push('/dashboard')
    }

  }

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={classNames(styles.content, 'container')}>
          <div className={styles.button_top}>
            <div onClick={() => router.back()} className={classNames(styles.button, styles.back)}>Kembali</div>
            <div>Edit Data</div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.wrap_input}>
              <label htmlFor="name">Nama</label>
              <input {...register('name')} type="text" />
              <small>{errors.name?.message}</small>
            </div>
            <div className={styles.wrap_input}>
              <label htmlFor="name">No Telepon</label>
              <input  {...register('telephone', { valueAsNumber: true })} type="number" />
              <small>{errors.telephone?.message}</small>

            </div>
            <div className={styles.wrap_input}>
              <label htmlFor="name">Alamat</label>
              <textarea
                {...register('address')}
                rows={5} />
              <small>{errors.address?.message}</small>
            </div>
            <div className={styles.wrap_input}>
              <label htmlFor="name">Major</label>
              <select
                {...register('major')}

              >
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Teknik Sipil">Teknik Sipil</option>
                <option value="Teknik Kimia">Teknik Kimia</option>
                <option value="Teknik Elektro">Teknik Elektro</option>

              </select>
              <small>{errors.major?.message}</small>


            </div>
            <div className={styles.wrap_input}>
              <label htmlFor="name">Agama</label>
              <select
                {...register('religion')}
              >
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Budha">Budha</option>
              </select>
              <small>{errors.religion?.message}</small>
            </div>
            <div className={styles.wrapper_submit}>
              {isValid}
              <button className={styles.button_submit} type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}