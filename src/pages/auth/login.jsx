import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import styles from './login.module.css'
import Image from 'next/image'

const Login = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: '/',
      prompt: "select_account"
    })
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false }) // サインアウトだけ実行
    router.push('/') // その後手動でリダイレクト
  }

  if (status === "loading") {
    return <div className={styles.loading}>読み込み中...</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Googleでログイン</h1>
      
      {!session ? (
        <button onClick={handleSignIn} className={styles.googleButton}>
          <Image 
            src="/web_light_rd_SI.svg" 
            alt="Google icon" 
            width={200} 
            height={200} 
            style={{ width: '200px', height: '200px' }}
          />
        </button>
      ) : (
        <div>
          <h2>ようこそ、{session.user?.name}!</h2>
          <button onClick={handleSignOut} className={styles.logoutButton}>
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}

export default Login
