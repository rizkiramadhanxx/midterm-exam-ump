import styles from '@/styles/login.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5)
})

type LoginSchema = z.infer<typeof schema>


export default function Login() {

  const router = useRouter()

  const { register, handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = (data: LoginSchema) => {

    if (data.email === 'tyawidi@gmail.com' && data.password === 'password123') {

      setCookie('isLogin', true)
      router.push('/')
    }

  }


  return (
    <div className={styles.wrapper}>
      <form className={styles.content}

        onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrap_form}>
          <label htmlFor="">Email</label>
          <input {...register('email')} type="text" />
          <small>{errors.email?.message}</small>
        </div>
        <div className={styles.wrap_form}>
          <label htmlFor="">Password</label>
          <input {...register('password')} type="text" />
          <small>{errors.password?.message}</small>
        </div>
        <button className={styles.button_login}>Login</button>
      </form>
    </div>
  )
}