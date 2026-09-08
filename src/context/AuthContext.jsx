import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rts_auth_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [redirectAfterLogin, setRedirectAfterLogin] = useState('/courses')

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('rts_auth_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('rts_auth_user')
      }
    } catch (e) {
      console.error(e)
    }
  }, [user])

  const login = (role = 'student', email = 'student@explorewithrts.com', name = '') => {
    const defaultName = role === 'admin' 
      ? 'Administrator' 
      : (name || (email ? email.split('@')[0] : 'Student'))
    
    const newUser = {
      role, // 'student' | 'admin'
      email: email || (role === 'admin' ? 'admin@explorewithrts.com' : 'student@explorewithrts.com'),
      name: defaultName,
      loggedInAt: new Date().toISOString()
    }
    setUser(newUser)
    try {
      localStorage.setItem('rts_auth_user', JSON.stringify(newUser))
    } catch (e) {
      console.error(e)
    }
    setIsLoginModalOpen(false)
    return newUser
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('rts_auth_user')
    } catch (e) {
      console.error(e)
    }
  }

  const openLoginModal = (redirectPath = '/courses') => {
    setRedirectAfterLogin(redirectPath)
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        login,
        logout,
        isLoginModalOpen,
        redirectAfterLogin,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
