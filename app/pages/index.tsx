import type { NextPage } from 'next'
import Head from 'next/head'
import { tw } from '@twind/core'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { Header } from '../components/Header'
import { UserMenu } from '../components/UserMenu'

const Home: NextPage = () => {
  const router = useRouter()
  const { user, logout, accessToken } = useAuth(() => router.push({ pathname: '/login', query: { back: true } }))

  console.log(user, accessToken)

  if (!user) return null

  // TODO: proper navigation links in header (what should they be?)
  return (
      <div className={tw('w-screen h-screen flex flex-col')}>
        <Head>
          <title>Create Next App</title>
        </Head>

        {/* all of these links are to be determined, these are just some placeholders */}
        <Header title="helpwave" navigation={[
          { text: 'Dashboard', href: '/' },
          { text: 'Contact', href: '/contact' },
        ]} actions={[
          <UserMenu key="user-menu" user={user} />
        ]} />

        <h1 className={tw('text-3xl font-bold underline')}>
          {user === null ? 'Redirecting to log in page..' : `Hello ${user.displayName}`}
        </h1>

        <button onClick={() => logout(() => window.location.reload())}>Logout</button>
      </div>
  )
}

export default Home
