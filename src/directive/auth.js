import VueJwtDecode from 'vue-jwt-decode'

function checkJwt (token) {
  // const secretKey = `${process.env.SECRET}`

  try {
    // const decoded = await jwt.verify(token, secretKey)
    const decoded = VueJwtDecode.decode(token)
    console.log('JWT 驗證成功:', decoded)
    return true
  } catch (err) {
    console.error('JWT 驗證失敗:', err)
    return false
  }
}

export function getCookie (name) {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }
  return ''
}

export const checkIfUserIsAuthenticated = () => {
  const token = getCookie('hexToken')
  if (token === '') {
    console.log('token不存在')
    return false
  }
  console.log('token', token)
  // const token = myCookie.split('=')[1]
  // console.log('cookie:', myCookie)

  const isAuthenticated = checkJwt(token)

  if (isAuthenticated) {
    return true
  } else {
    return false
  }
}
