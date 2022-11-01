import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { Header } from '../components/Header'
import { UserMenu } from '../components/UserMenu'

const SettingsPage: NextPage = () => {
  const router = useRouter()
  const { user, logout, accessToken } = useAuth(() => router.push({ pathname: '/login', query: { back: true } }))

  if (!user) return null

  return (
    <div>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="helpwave" navigation={[
        { text: 'Dashboard', href: '/' },
        { text: 'Contact', href: '/contact' },
      ]} actions={[
        <UserMenu key="user-menu" user={user} />
      ]} />

      <div>
        Settings page
      </div>
    </div>
  )
}

export default SettingsPage
