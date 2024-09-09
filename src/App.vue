<script setup>
import { computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
//import { useSocket } from './composables/useSocket';
import { useNotifications } from './store/notifications';
import { useAuth } from './store/auth';

//const socket = useSocket()
//const notifications = useNotifications()
//watchEffect(async (cleanUp) => {
//  try {
//    let sock = await socket.connect()
//    socket.send('/app/toHRDI', JSON.stringify(
//      {
//        userId: auth.auth?.user?.userUuid,
//        userType: auth.auth?.user?.userType,
//      }
//    ))

//    socket.subscribe('/topic/notifyHRDI', (messgae) => {
//      console.log("hrdi");
//      console.log(messgae)
//      notifications.setNotifications(messgae)
//    })

//    socket.subscribe('/notify/residents', (messgae) => {
//      console.log("residents");
//      console.log(messgae)
//    })
//  } catch(err) {
//    console.log(err.messgae)
//  }

//  return cleanUp(async () => {
//    await socket.unSub()
//  })
//}); 
</script>

<template>
  <router-view />
</template>
