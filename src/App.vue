<script setup>
import { computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useSocket } from './composables/useSocket';
import { useNotifications } from './store/notifications';
import { useAuth } from './store/auth';

const auth = useAuth();

const socket = useSocket();
const notifications = useNotifications();

watchEffect(async (cleanUp) => {
  if (!auth.auth?.user?.userUuid && !auth.auth?.user?.userType) return;

  try {
    let sock = await socket.connect();
    socket.send(
      '/app/notification',
      JSON.stringify({
        userUuid: auth.auth?.user?.userUuid,
        userType: auth.auth?.user?.userType,
      })
    );
    socket.subscribe('/topic/notify', (messgae) => {
      let messages = JSON.parse(messgae.body);
      let type = Array.isArray(messages) ? messages?.[0]?.userType : messages.userType
      if(type == auth.auth?.user?.userType) {
        notifications.setNotifications(messgae);
      }
    })

    //if (auth.auth?.user?.userType == 'HRDI') {
    //  socket.subscribe('/topic/notifyHRDI', (messgae) => {
    //    console.log('hrdi');
    //    console.log(JSON.parse(messgae.body));
    //    notifications.setNotifications(messgae);
    //  });
    //}

    //if (auth.auth?.user?.userType == 'Student') {
    //  socket.subscribe('/topic/notifyResidents', (messgae) => {
    //    console.log('resi');
    //    console.log(JSON.parse(messgae.body));
    //    notifications.setNotifications(messgae);
    //  });
    //}
  } catch (err) {
    console.log(err);
  }

  return cleanUp(async () => {
    await socket.unSub();
  });
});
</script>

<template>
  <router-view />
</template>
