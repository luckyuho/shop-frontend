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

export const checkIfUserIsAuthenticated = () => {
  const myCookie = document.cookie || ''
  if (myCookie === '') {
    console.log('Cookie不存在')
    return false
  }

  const token = myCookie.split('; ').find((row) => row.startsWith('hexToken')).split('=')[1]
  console.log('cookie:', token)

  const isAuthenticated = checkJwt(token)

  if (isAuthenticated) {
    return true
  } else {
    return false
  }
}
