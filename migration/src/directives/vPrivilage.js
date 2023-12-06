import { useAuth } from '@store/auth'

function checkPrivilage(el, {value}) {
  if(!value) return

  const authStore = useAuth()

  if(authStore.auth.user.privileges.includes('All Privileges')) return 
  
  if(value instanceof Array) {
    let privileges = auth.auth.user.privileges
    
    const found = privileges?.find(privilage => {
      console.log(privilage, value?.includes(privilage))
      return value?.includes(privilage)
    })

    if(!found) {
      el.remove()
    }

    return 
  }

  if(authStore.auth.user.role.toLowerCase() != value) {
    console.log(el, value, authStore.auth.user.role.toLowerCase())
    el.remove()
  }
}

const vPrivilage = {
  mounted: checkPrivilage,
  updated: checkPrivilage
}

export default vPrivilage